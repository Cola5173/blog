# Nginx日志切割

## 一、Nginx日志切割方案

### 1、背景

Nginx 中的 `access.log` 和 `error.log` 默认都是以 **追加** 方式持续写入的，不会覆盖已有的日志。

随着业务量的增加，日志文件可能会持续增长到非常大的体积，导致以下问题：

- 占用大量磁盘空间
- 日志查询、分析困难
- 性能下降，尤其是日志文件过大时 I/O 负载增加

为了避免日志文件无限增长，需要实现 **日志定期切割** 和 **自动清理过期日志**。

### 2、目标

每天生成独立的日志文件，命名格式为：

- `access-yyyy-MM-dd.log`
- `error-yyyy-MM-dd.log`

日志只保留最近 **7 天**，自动删除过期日志文件。并且，方案应尽可能简单、可靠，并对 Nginx 性能影响最小。

### 3、调研方案

针对上述目标，调研了以下三种主要的日志切割实现方式：

- **Nginx配置文件中的map**
- **logrotate**
- **Shell 脚本**

#### 3.1.Nginx 配置文件中的 map

通过 Nginx 原生的 `map` 指令动态设置日志路径，根据日期将日志输出到不同的文件。

配置示例：

```conf
http {
    map $time_iso8601 $log_date {
        default "";
        "~^(?<date>\d{4}-\d{2}-\d{2})" $date;
    }

    access_log /var/log/nginx/access_$log_date.log;
    error_log /var/log/nginx/error_$log_date.log;
}
```

优点

- 直接通过 Nginx 配置实现，无需额外脚本或工具。

缺点

- Nginx 在启动时确定日志路径，**每次请求不会重新解析**日志路径，`map` 并不能动态分配新的日志文件
- 每天日志切割时需重载或重启 Nginx，增加操作复杂度
- 对 Nginx 性能有影响，特别是在高并发场景下解析 `map`

#### 3.2.使用 logrotate

`logrotate` 是 Linux 系统自带的标准日志管理工具，配置简单，功能强大，可以定期切割和清理日志文件。

配置示例：

**创建 logrotate 配置文件** `/etc/logrotate.d/nginx`：

```
bash复制代码/var/log/nginx/*.log {
    daily
    dateext
    rotate 7
    missingok
    notifempty
    sharedscripts
    postrotate
        [ -s /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

- **`daily`**：每天切割一次日志
- **`dateext`**：在切割的日志文件名后添加日期
- **`rotate 7`**：保留最近 7 天的日志
- **`postrotate`**：发送 `USR1` 信号，通知 Nginx 重新打开日志文件

优点：

- 稳定可靠，标准化工具，适配大部分 Linux 系统。
- 支持自动删除过期日志文件。
- 可与 Nginx 无缝集成，通过信号通知 Nginx 重新打开日志。

缺点：

- 依赖 `logrotate` 工具，如果系统缺失，需要额外安装。
- 需要系统级的定时任务支持（如 `cron`）。

#### 3.3.使用 Shell 脚本

通过编写 Shell 脚本实现日志切割，并通过定时任务或循环调用执行。

示例：

```shell
#!/bin/bash

# 日志目录与文件
LOG_DIR="/var/log/nginx"
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
NGINX_PID="/var/run/nginx.pid"

# 切割 access.log 和 error.log
mv $LOG_DIR/access.log $LOG_DIR/access_$YESTERDAY.log
mv $LOG_DIR/error.log $LOG_DIR/error_$YESTERDAY.log

# 通知 Nginx 重新打开日志文件
kill -USR1 $(cat $NGINX_PID)

# 清理 7 天前的日志
find $LOG_DIR -name "access_*.log" -mtime +7 -delete
find $LOG_DIR -name "error_*.log" -mtime +7 -delete
```

添加到 `crontab` 定时任务

```shell
0 0 * * * /usr/local/bin/nginx_log_rotate.sh
```

优点：

- 灵活可定制，可根据需求扩展功能。
- 适用于没有 `logrotate` 或 `cron` 的系统。

缺点：

- 需要手动编写和维护脚本。
- 依赖于定时任务服务（如 `cron`）；部分国产系统可能需要额外配置。

### 4、总结

建议优先使用 **logrotate** 方案，如果系统不支持，使用 Shell 脚本作为替代方案。

| 实现方式               | 是否推荐 | 总结                                             |
|--------------------|------|------------------------------------------------|
| **Nginx 配置文件 map** | 不推荐  | 无法准确实现切割，需重启或重载 Nginx，影响 Nginx 的性能             |
| **logrotate**      | 推荐   | logrotate（系统自带/可安装），配置文件简单易懂，维护成本低，高效，针对日志切割优化 |
| **Shell 脚本**       | 可选   | 需手动编写脚本，维护较复杂，处理大文件时性能稍逊                       |


## 二、Nginx日志切割实践

### 1、背景

确定以 Linux 自带的 `logrotate` 方式实现 nginx 的 `access.log` 和 `error.log` 日志切割，要求实现每天生成独立的日志文件，命名格式为：

- `access-yyyy-MM-dd.log`
- `error-yyyy-MM-dd.log`

日志只保留最近 **7 天**，自动删除过期日志文件

### 2、环境准备

以下操作均为在 `172.29.247.156` 环境下，nginx 目录结构为：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/20204/5_nginxLogCut/image-20241217102439516.png" alt="nginx 目录结构">

### 3、实践流程

#### 3.1.配置Nginx的日志文件路径

在Nginx的配置文件（ `/data/nginx/nginxServer-1.15.9/conf/nginx.conf`）中，配置 `access_log` 和 `error_log`：

```nginx
http {
    log_format main '{"http_referer":"$http_referer","remote_addr":"$remote_addr","remote_user":"$remote_user","request_uri":"$request_uri","request_length":"$request_length","request_time":"$request_time","request_method":"$request_method","upstream_addr":"$upstream_addr","upstream_response_time":"$upstream_response_time","http_user_agent":"$http_user_agent","http_x_forwarded_for":"$http_x_forwarded_for","status":"$status","time_local":"$time_iso8601","body_bytes_sent":"$body_bytes_sent","bytes_sent":"$bytes_sent","connection":"$connection","host":"$host","uri":"$uri"}';

    access_log /data/nginx/nginxServer-1.15.9/logs/access.log main;  # 访问日志
    error_log /data/nginx/nginxServer-1.15.9/logs/error.log warn;    # 错误日志

    # 其他配置...
}
```

启动 nginx：

```shell
# 启动
/data/nginx/nginxServer-1.15.9/sbin/nginx
```

```
http://172.29.247.156/
```

#### 3.2.配置 `logrotate`

在 `/etc/logrotate.d/` 目录下为Nginx创建一个日志轮转配置文件

```bash
# 打开或者创建一个新的 `nginx` 配置文件：
touch /etc/logrotate.d/nginx
vim /etc/logrotate.d/nginx
```

然后配置如下：

```bash
/data/nginx/nginxServer-1.15.9/logs/access.log {
    # 每天轮转一次
    daily                   
    # 如果日志文件不存在，不报错
    missingok               
    # 保留最近7天的日志
    rotate 7                
    # 压缩旧日志
    compress                
    # 延迟压缩，直到下次轮转
    delaycompress          
    # 如果日志文件为空则不轮转
    notifempty                
    # 使用日期扩展，自动添加日期后缀
    dateext                
    # 定义日期格式为 yyyy-MM-dd
    dateformat -%Y-%m-%d    
    # 保证每次轮转时只执行一次脚本
    sharedscripts          
    postrotate
        # 在日志切割后进行重命名
        mv /data/nginx/nginxServer-1.15.9/logs/access.log-$(date +\%Y-\%m-\%d) /data/nginx/nginxServer-1.15.9/logs/access-$(date +\%Y-\%m-\%d).log
        if [ -f /data/nginx/nginxServer-1.15.9/logs/nginx.pid ]; then
            kill -USR1 `cat /data/nginx/nginxServer-1.15.9/logs/nginx.pid`
        fi
    endscript
}

/data/nginx/nginxServer-1.15.9/logs/error.log {
    # 每天轮转一次
    daily                   
    # 如果日志文件不存在，不报错
    missingok               
    # 保留最近7天的日志
    rotate 7                
    # 压缩旧日志
    compress                
    # 延迟压缩，直到下次轮转
    delaycompress          
    # 如果日志文件为空则不轮转
    notifempty              
    # 使用日期扩展，自动添加日期后缀
    dateext                
    # 定义日期格式为 yyyy-MM-dd
    dateformat -%Y-%m-%d    
    # 保证每次轮转时只执行一次脚本
    sharedscripts          
    postrotate
        # 在日志切割后进行重命名
        mv /data/nginx/nginxServer-1.15.9/logs/error.log-$(date +\%Y-\%m-\%d) /data/nginx/nginxServer-1.15.9/logs/error-$(date +\%Y-\%m-\%d).log
        if [ -f /data/nginx/nginxServer-1.15.9/logs/nginx.pid ]; then
            kill -USR1 `cat /data/nginx/nginxServer-1.15.9/logs/nginx.pid`
        fi
    endscript
}
```

#### 3.3.测试

手动测试 `logrotate` 是否按预期工作，测试前的环境：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/20204/5_nginxLogCut/image-20241217110445393.png" alt="测试前的环境">

使用以下命令来模拟日志轮转：

```bash
sudo logrotate -f /etc/logrotate.d/nginx
```

这将强制执行一次日志轮转，检查 `/data/nginx/nginxServer-1.15.9/logs` 目录，查看是否已生成以日期为后缀的日志文件：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/20204/5_nginxLogCut/image-20241217110516847.png" alt="结果">

### 4、定期执行

`logrotate` 默认通过 `cron` 进行定期执行，不需要手动启动它。

它会自动通过 `/etc/cron.daily/` 中的配置每天自动运行，确保日志按照配置的周期进行轮转。
