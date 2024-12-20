# RedisSlowLog

:::details 参考资料：

- [两行shell脚本实现slowlog持久化转储](https://cloud.tencent.com/developer/article/1433059)

:::

## 一、Redis的slowlog持久化存储

### 1、背景

慢查询日志记录了 Redis 中执行时间较长的命令，尤其是执行时间超过指定阈值的命令。

由于 redis 的慢查询日志存储在内存中，不会写入磁盘文件。

Redis 默认只保留一定数量的慢查询日志，如果日志量很大，它会**覆盖最早的日志**。并且，一旦 **Redis 服务重启**，所有未持久化的*
*慢查询日志会丢失**。

### 2、目的

为了解决历史慢日志跟踪问题，**将 redis slowlog 定期写入磁盘文件**。

通过编写 Shell 脚本将 Redis 的慢查询日志持久化到磁盘，以供后续排查下问题。

持久化落盘的数据格式为：

```properties
id:303223-0;timestamp:2024-12-20 11:14:04;queryTime:14169;command:EVAL  for i = 1, 10000 do redis.call('LPUSH', 'mylist', 'value:' .. i) end  0;clientIp:"10.40.160.231:53697";clientName:"";

解释：
- id：pid-redis渐进式id
- timestamp：慢日志发生的时间
- queryTime：慢日志耗时，微秒
- command：慢日志的命令
- clinetIp：客户端ip
- clientName：通过client setname 命令设置客户端名称
```

### 3、流程

#### 3.1、慢日志配置

在 redis 的配置文件中，配置慢日志相关参数：

```properties
################################## SLOW LOG ###################################

# 设置记录慢查询的阈值（单位是微秒），只有 query 执行时间大于slowlog-log-slower-than 的才会被定义成慢查询，被 slowlog 进行记录
slowlog-log-slower-than 1000

# 慢查询最大的条数，当 slowlog 超过设定的最大值后，会将最早的slowlog删除
slowlog-max-len 128
```

#### 3.2、shell脚本

通过 Shell 脚本持久化慢查询日志，`redisSlowlog.sh` ：

```shell
#!/bin/bash

# 配置 redis-cli 路径和日志文件路径（只有这里需要单独配置，后面无需改）
REDIS_CLI="/data/redis/redisServer-6.2.7/bin/redis-cli -a Redis123456"
SLOWLOG_FILE="/data/redis/redisServer-6.2.7/logs/query_slow.log"
TEMP_SLOWLOG_FILE="/data/redis/redisServer-6.2.7/logs/query_slow_temp.log"
PORT=6379
MAX_SLOWLOG_COUNT=128

# 如果SLOWLOG_FILE不存在，则创建空文件
if [ ! -f "$SLOWLOG_FILE" ]; then
	touch "$SLOWLOG_FILE"
fi

# 如果TEMP_SLOWLOG_FILE不存在，则创建空文件
if [ ! -f "$TEMP_SLOWLOG_FILE" ]; then
	touch "$TEMP_SLOWLOG_FILE"
fi

process_slowlog() {
    # 使用 lsof 获取 PID 并确保是 redis-ser 进程
    pid=$(/usr/sbin/lsof -i:"$PORT" | grep 'redis-ser' | awk '{print $2}' | head -n 1)
    echo "pid的值为： $pid"

    # 确保 PID 非空
    if [ -z "$pid" ]; then
    echo "No process found for port 6379."
    exit 1
    fi

	# 获取慢查询日志并逐行处理，直接重定向到文件
	$REDIS_CLI -p "$PORT" --no-raw slowlog get "$MAX_SLOWLOG_COUNT" |
    gawk -v pid="$pid" '
    BEGIN {
        # 初始化变量
        id = ""; timestamp = ""; queryTime = ""; command = ""; clientIp = ""; clientName = "";
        processing_query = 0;
    }

    # 当行包含 1) (integer) 时，表示开始处理一个新查询
    $0 ~ /1\) \(integer\)/ {
        if (processing_query == 1) {
            # 如果正在处理查询，表示上一组数据处理完，输出并清空变量
            print_output();
        }
        id = pid "-" $4;
        processing_query = 1;
    }

    # 当行包含 2) (integer) 时，提取时间戳
    $0 ~ /2\) \(integer\)/ {
        timestamp = strftime("%Y-%m-%d %H:%M:%S", $3);
    }

    # 当行包含 3) (integer) 时，提取查询时间
    $0 ~ /3\) \(integer\)/ {
        queryTime = $3;
    }

    # 当行包含 4) +1) 时，提取命令
    $0 ~ /4\) +1\)/ || collecting_command == 1 {
        if ($0 ~ /4\) +1\)/) {
            # 去掉引号并提取命令部分
            gsub(/"/, "", $3);
            command = $3;
            collecting_command = 1;
        } 
        # 如果遇到 5)，表示命令已经处理完毕，停止收集命令
        else if ($0 ~ /^[ ]{3}5\)\s/) {
            collecting_command = 0;
        } 
        else if (collecting_command == 1) {
            # 提取命令的过程中，去掉引号并把命令合并
            gsub(/^[ ]{6}[0-9]+\)/, "", $0); # 去掉数字和括号
            gsub(/"/, "", $0);                # 去掉引号
            command = command " " $0;         # 拼接命令
        }
    }

    # 当行包含 "   5) " 时，提取客户端IP
    $0 ~ /^[ ]{3}5\)\s/ {
        clientIp = $2;
    }

    # 当行包含 "   6) " 时，提取客户端名称并输出结果
    $0 ~ /^[ ]{3}6\)\s/ {
        clientName = $2;
    }

    # 输出格式化后的数据
    function print_output() {
        print "id:" id ";timestamp:" timestamp ";queryTime:" queryTime ";command:" command ";clientIp:" clientIp ";clientName:" clientName ";";
        # 清空变量，准备下一个查询
        id = ""; timestamp = ""; queryTime = ""; command = ""; clientIp = ""; clientName = "";
        processing_query = 0;
    }

    END {
        # 在文件末尾输出最后一条查询的结果
        if (processing_query == 1) {
            print_output();
        }
    }

    ' >> "$TEMP_SLOWLOG_FILE" 

	# 提示临时日志已保存
	echo "临时慢查询日志已保存到 $TEMP_SLOWLOG_FILE"

    # 读取 SLOWLOG_FILE 中已有的 ID，将其放入一个关联数组中
    declare -A existing_ids

    # 先读取 SLOWLOG_FILE 中的所有 id
    if [ -f "$SLOWLOG_FILE" ]; then
        while IFS= read -r line; do
            # 从 SLOWLOG_FILE 中提取每行的 id（假设日志格式中 id 在 "id:" 后）
            id=$(echo "$line" | grep -oP 'id:\K[0-9]+-[0-9]+')  # 只提取 id 后的数字和 `-` 部分
            existing_ids["$id"]=1
        done < "$SLOWLOG_FILE"
    fi

    # 遍历 TEMP_SLOWLOG_FILE 文件，去重后写入到 SLOWLOG_FILE
    while IFS= read -r line; do
        # 从 TEMP_SLOWLOG_FILE 中提取每行的 id
        id=$(echo "$line" | grep -oP 'id:\K[0-9]+-[0-9]+')  # 只提取 id 后的数字和 `-` 部分

        # 如果 ID 不在 existing_ids 数组中，则追加到 SLOWLOG_FILE 中
        if [[ -z "${existing_ids[$id]}" ]]; then
            # 写入 SLOWLOG_FILE
            echo "$line" >> "$SLOWLOG_FILE"
            # 将该 ID 加入 existing_ids 数组，避免重复
            existing_ids["$id"]=1
        fi
    done < "$TEMP_SLOWLOG_FILE"

    # 提示去重操作完成
    echo "去重后的慢查询日志已保存到 $SLOWLOG_FILE"
}


# 执行慢查询日志处理函数
process_slowlog


```

#### 3.3、定时任务

已经写好了将慢日志持久化的脚本，现在需要开启定时任务去执行脚本。

以**每分钟执行一次**位于 `/data/redis/redisServer-6.2.7/redis_slowlog.sh` 的脚本，按照以下步骤设置定时任务：

首先，使用 `crontab -e` 命令打开当前用户的 `cron` 配置文件：

```bash
crontab -e
```

在打开的编辑器中，添加以下定时任务行：

```bash
* * * * * /bin/bash /data/redis/redisServer-6.2.7/redis_slowlog.sh start >> /data/redis/redisServer-6.2.7/logs/slowlog_output.log 2>&1
```

解释：

- `* * * * *`：表示每分钟执行一次
- `/data/redis/redisServer-6.2.7/redis_slowlog.sh start`：执行的脚本路径及参数。
- `>> /data/redis/redisServer-6.2.7/logs/slowlog_output.log 2>&1`：将脚本的标准输出和错误输出都重定向到日志文件
  `/data/redis/redisServer-6.2.7/logs/slowlog_output.log` 中

通过运行以下命令来确认定时任务已经成功添加：

```bash
crontab -l
```

这将列出当前用户的所有定时任务，确保你添加的任务在其中。

为了确保定时任务正常执行，查看输出日志 `/data/redis/redisServer-6.2.7/logs/slowlog_output.log`，检查脚本是否按计划运行。

```bash
tail -f /data/redis/redisServer-6.2.7/logs/slowlog_output.log
```

如果一切正常，日志文件会随着每次脚本执行而更新。

### 4、结果

功能实现：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/2024/6_01.png" alt="结果">

## 二、slowlog

### 1、环境准备

需要启动 redis ：

````shell
cd /data/redis/redisServer-6.2.7

./bin/redis-server ./redis.conf
````

捏造一些数据，用于进行慢查询， datagrip 连接后：

````
EVAL "for i = 1, 10000 do redis.call('LPUSH', 'mylist', 'value:' .. i) end" 0
EVAL "for i = 1, 10000 do redis.call('ZADD', 'myzset', i, 'member:' .. i) end" 0
EVAL "for i = 1, 10000 do redis.call('HSET', 'myhash', 'field:' .. i, 'value:' .. i) end" 0


LRANGE mylist 0 9999
ZRANGEBYSCORE myzset 5000 10000
HGETALL myhash
````

### 2、slowlog格式

通过命令连接到redis内部

```properties
/data/redis/redisServer-6.2.7/bin/redis-cli -a Redis123456
```

查看慢日志：

```properties
slowlog get 128
```

数据示例为，一共查到 6 条数据：

```properties
127.0.0.1:6379> slowlog get
1) 1) (integer) 5
   2) (integer) 1734509861
   3) (integer) 4976
   4) 1) "HGETALL"
      2) "myhash"
   5) "10.40.160.231:62374"
   6) ""
2) 1) (integer) 4
   2) (integer) 1734509838
   3) (integer) 28582
   4) 1) "EVAL"
      2) "for i = 1, 10000 do redis.call('HSET', 'myhash', 'field:' .. i, 'value:' .. i) end"
      3) "0"
   5) "10.40.160.231:62374"
   6) ""
3) 1) (integer) 3
   2) (integer) 1734509833
   3) (integer) 31222
   4) 1) "EVAL"
      2) "for i = 1, 10000 do redis.call('ZADD', 'myzset', i, 'member:' .. i) end"
      3) "0"
   5) "10.40.160.231:62374"
   6) ""
4) 1) (integer) 2
   2) (integer) 1734509723
   3) (integer) 1316
   4) 1) "COMMAND"
   5) "127.0.0.1:38094"
   6) ""
5) 1) (integer) 1
   2) (integer) 1734509705
   3) (integer) 1977
   4) 1) "LRANGE"
      2) "mylist"
      3) "0"
      4) "9999"
   5) "10.40.160.231:62374"
   6) ""
6) 1) (integer) 0
   2) (integer) 1734509678
   3) (integer) 16910
   4) 1) "EVAL"
      2) "for i = 1, 10000 do redis.call('LPUSH', 'mylist', 'value:' .. i) end"
      3) "0"
   5) "10.40.160.231:62374"
   6) ""
```

[slowlog get `[argument]`](https://redis.io/docs/latest/commands/slowlog-get/) 命令，Redis的慢查询日志记录了以下信息：

- id：每个慢日志条目的唯一渐进式标识符
- unix时间戳：记录慢查询发生的时间
- 执行耗时：记录慢查询的执行耗时，以微秒为单位
- 命令：记录执行的慢查询命令参数的数组
- 客户端IP地址和端口
- 通过client setname 命令设置客户端名称

## 三、思路测试

### 1、test1

需要将以下格式的数据打印出到文件中：

```properties
 1) 1) (integer) 24
    2) (integer) 1734570201
    3) (integer) 4258
    4) 1) "HGETALL"
       2) "myhash"
    5) "10.40.160.231:51378"
    6) ""
```

shell脚本：

````shell
#!/bin/bash

# 配置 redis-cli 路径和日志文件路径
REDIS_CLI="/data/redis/redisServer-6.2.7/bin/redis-cli -a Redis123456"
SLOWLOG_FILE="/data/redis/redisServer-6.2.7/logs/query_slow1.log"
PORT=6379

# 如果SLOWLOG_FILE不存在，则创建空文件
if [ ! -f "$SLOWLOG_FILE" ]; then
	touch "$SLOWLOG_FILE"
fi

process_slowlog() {
	# 获取慢查询日志并逐行处理，直接重定向到文件
	$REDIS_CLI -p "$PORT" --no-raw slowlog get 128 >>"$SLOWLOG_FILE" # 重定向到临时文件

	# 提示日志已保存
	echo "慢查询日志已保存到 $SLOWLOG_FILE"

}

# 执行慢查询日志处理函数
process_slowlog
````

### 2、test2

需要将得到的数据输出为：

```properties
id:303223-0;timestamp:2024-12-20 11:14:04;queryTime:14169;command:EVAL  for i = 1, 10000 do redis.call('LPUSH', 'mylist', 'value:' .. i) end  0;clientIp:"10.40.160.231:53697";clientName:"";```
```

shell 脚本为：

````shell
#!/bin/bash

# 配置 redis-cli 路径和日志文件路径
REDIS_CLI="/data/redis/redisServer-6.2.7/bin/redis-cli -a Redis123456"
SLOWLOG_FILE="/data/redis/redisServer-6.2.7/logs/query_slow2.log"
PORT=6379

# 如果SLOWLOG_FILE不存在，则创建空文件
if [ ! -f "$SLOWLOG_FILE" ]; then
	touch "$SLOWLOG_FILE"
fi

process_slowlog() {
    # 使用 lsof 获取 PID 并确保是 redis-ser 进程
    pid=$(lsof -i:"$PORT" | grep 'redis-ser' | awk '{print $2}' | head -n 1)
    echo "pid的值为： $pid"

    # 确保 PID 非空
    if [ -z "$pid" ]; then
    echo "No process found for port 6379."
    exit 1
    fi

	# 获取慢查询日志并逐行处理，直接重定向到文件
	$REDIS_CLI -p "$PORT" --no-raw slowlog get 128 |
    gawk -v pid="$pid" '
    BEGIN {
        # 初始化变量
        id = ""; timestamp = ""; queryTime = ""; command = ""; clientIp = ""; clientName = "";
        processing_query = 0;
    }

    # 当行包含 1) (integer) 时，表示开始处理一个新查询
    $0 ~ /1\) \(integer\)/ {
        if (processing_query == 1) {
            # 如果正在处理查询，表示上一组数据处理完，输出并清空变量
            print_output();
        }
        id = pid "-" $4;
        processing_query = 1;
    }

    # 当行包含 2) (integer) 时，提取时间戳
    $0 ~ /2\) \(integer\)/ {
        timestamp = strftime("%Y-%m-%d %H:%M:%S", $3);
    }

    # 当行包含 3) (integer) 时，提取查询时间
    $0 ~ /3\) \(integer\)/ {
        queryTime = $3;
    }

    # 当行包含 4) +1) 时，提取命令
    $0 ~ /4\) +1\)/ || collecting_command == 1 {
        if ($0 ~ /4\) +1\)/) {
            # 去掉引号并提取命令部分
            gsub(/"/, "", $3);
            command = $3;
            collecting_command = 1;
        } 
        # 如果遇到 5)，表示命令已经处理完毕，停止收集命令
        else if ($0 ~ /^[ ]{3}5\)\s/) {
            collecting_command = 0;
        } 
        else if (collecting_command == 1) {
            # 提取命令的过程中，去掉引号并把命令合并
            gsub(/^[ ]{6}[0-9]+\)/, "", $0); # 去掉数字和括号
            gsub(/"/, "", $0);                # 去掉引号
            command = command " " $0;         # 拼接命令
        }
    }

    # 当行包含 "   5) " 时，提取客户端IP
    $0 ~ /^[ ]{3}5\)\s/ {
        clientIp = $2;
    }

    # 当行包含 "   6) " 时，提取客户端名称并输出结果
    $0 ~ /^[ ]{3}6\)\s/ {
        clientName = $2;
    }

    # 输出格式化后的数据
    function print_output() {
        print "id:" id ";timestamp:" timestamp ";queryTime:" queryTime ";command:" command ";clientIp:" clientIp ";clientName:" clientName ";";
        # 清空变量，准备下一个查询
        id = ""; timestamp = ""; queryTime = ""; command = ""; clientIp = ""; clientName = "";
        processing_query = 0;
    }

    END {
        # 在文件末尾输出最后一条查询的结果
        if (processing_query == 1) {
            print_output();
        }
    }

    ' >> "$SLOWLOG_FILE" 

	# 提示日志已保存
	echo "慢查询日志已保存到 $SLOWLOG_FILE"

}

# 执行慢查询日志处理函数
process_slowlog
````

### 3、test3

需要去重，比如使用 `slowlog get` 命令，可能获取到的数据和已经写入到文件中的数据有部分重叠，需要通过id进行去重，缺少了去重后追加写入的逻辑。

最终脚本查看之前的代码即可。


## 4、test4

感觉 test3 的方式太过于麻烦，查阅 redis 的官方文档，发现了可以清除内存中的慢日志，通过指令：

```properties
SLOWLOG RESET
```

是否可以通过查询后，直接删除内存中的慢日志，就不用每次都去重了？

调研结果：

- 会出现数据丢失，无法保证操作的原子性
- 在进行日志格式化过程中，如果内存中产生了新的慢日志，在格式化结束完毕后立刻执行 `slowlog reset` 命令会丢失数据