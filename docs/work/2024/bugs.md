# 问题修复

## es

### 1. 将数据库切换为es，发现报错，需要去排查。

::: details 报错信息
org.elasticsearch.client.ResponseException: method [GET], host [http://xxx.xx.xx.xx:9200], URI [/_cluster/health/], status line [HTTP/1.1 401 Unauthorized]
{"error":{"root_cause":[{"type":"security_exception","reason":"missing authentication credentials for REST request [/_cluster/health/]","header":{"WWW-Authenticate":"Basic realm=\"security\" charset=\"UTF-8\""}}],"type":"security_exception","reason":"missing authentication credentials for REST request [/_cluster/health/]","header":{"WWW-Authenticate":"Basic realm=\"security\" charset=\"UTF-8\""}},"status":401}
........
:::

阅读报错信息，是发送了集群健康检测请求，但是很奇怪的就是，明明把数据库资源切换了，没有用es，为什么还会发送这个请求呢？

应该是项目中引入了部份依赖，使用到了es，进行排查，发现是项目中引入了：

```xml
<!--springboot 健康检查-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
    <exclusions>
        <exclusion>
            <artifactId>jackson-databind</artifactId>
            <groupId>com.fasterxml.jackson.core</groupId>
        </exclusion>
    </exclusions>
</dependency>
```

会定期发送健康检测，需要手动关闭：

```yml
management:
  health:
    elasticsearch:
      enabled: false
```