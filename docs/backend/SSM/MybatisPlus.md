# MybatisPlus

:::details 学习参考资料：

- [最新MybatisPlus全套视频教程](https://www.bilibili.com/video/BV1Xu411A7tL)

:::

[MyBatis-Plus](https://baomidou.com/) 是一个 MyBatis的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

MybatisPlus 的愿景是成为 MyBatis 最好的搭档，就像 魂斗罗 中的 1P、2P，基友搭配，效率翻倍：

<img src="https://baomidou.com/images/content/relationship-with-mybatis.png" alt="mybatisPlus" style="display: block;margin: 0 auto;zoom: 100%">

## 1.快速开始

通过一个简单的 Demo 来阐述 MyBatis-Plus 的强大功能

### 1.1.数据库

其对应的数据库 Schema 脚本如下：

````sql
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
    id BIGINT NOT NULL COMMENT '主键ID',
    name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    age INT NULL DEFAULT NULL COMMENT '年龄',
    email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (id)
);
````

其对应的数据库 Data 脚本如下：

````sql
DELETE FROM `user`;

INSERT INTO `user` (id, name, age, email) VALUES
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');
````

使用 h2 数据库快速开始：

### 1.2.依赖和配置

在 SpringBoot 工程中引入依赖：

````xml
<dependencies>
    <!--========================================spring相关=====================================-->
    <!-- 引入web支持 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!--测试-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>


    <!--========================================中间件=====================================-->
    <!--h2数据库-->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
    </dependency>
    <!--mybatisPlus-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
        <version>3.5.9</version>
    </dependency>
</dependencies>
````

SpringBoot 项目的主启动类：

````java
@SpringBootApplication
@MapperScan("com.fkx.mybatisplus.mapper")
public class AppMybatisPlus {
    public static void main(String[] args) {
        SpringApplication.run(AppMybatisPlus.class);
    }
}
````

配置文件 `application.yml` ：

````yml
# DataSource Config
spring:
  datasource:
    driver-class-name: org.h2.Driver
    username: root
    password: test
  sql:
    init:
      schema-locations: classpath:db/schema.sql
      data-locations: classpath:db/data.sql
````

### 1.3.框架搭建

和数据库表对应的实体类 `user` ：

````java
@Data
@TableName("`user`")
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
````

编写 Mapper 接口类：

````java
public interface UserMapper extends BaseMapper<User> {
}
````

### 1.4.开始使用

随便写一个，介绍 MybatisPlus 的强大：

````java
@SpringBootTest
@Slf4j
public class UserTest {
    @Autowired
    private UserMapper userMapper;

    @Test
    void test01() {
        userMapper.selectList(null).forEach(System.out::println);
        /**
         * User(id=1, name=Jone, age=18, email=test1@baomidou.com)
         * User(id=2, name=Jack, age=20, email=test2@baomidou.com)
         * User(id=3, name=Tom, age=28, email=test3@baomidou.com)
         * User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
         * User(id=5, name=Billie, age=24, email=test5@baomidou.com)
         */
    }
}
````

非常简洁，非常强大，不需要编写很多代码，还有更高级的功能可以去使用。

