# MybatisPlus

:::details 参考资料：

- [最新MybatisPlus全套视频教程](https://www.bilibili.com/video/BV1Xu411A7tL)
- [MybatisPlus笔记](https://b11et3un53m.feishu.cn/wiki/PsyawI04ei2FQykqfcPcmd7Dnsc)

:::

[MyBatis-Plus](https://baomidou.com/) 是一个 MyBatis的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

MybatisPlus 的愿景是成为 MyBatis 最好的搭档，就像 魂斗罗 中的 1P、2P，基友搭配，效率翻倍：

<img src="https://baomidou.com/images/content/relationship-with-mybatis.png" alt="mybatisPlus" style="display: block;margin: 0 auto;zoom: 100%">

当然，MybatisPlus 不仅仅可以简化单表操作，而且还对 Mybatis 的功能有很多的增强。可以让我们的开发更加的简单，高效。

通过今天的学习，要达成下面的目标：

- 能利用MybatisPlus实现基本的CRUD
- 会使用条件构建造器构建查询和更新语句
- 会使用MybatisPlus中的常用注解
- 会使用MybatisPlus处理枚举、JSON类型字段
- 会使用MybatisPlus实现分页

## 1.快速入门

---

通过一个简单的 Demo 来阐述 MyBatis-Plus 的强大功能

### 1.1.sql脚本

导入两张表，SQL 文件脚本：

````sql
-- 导出 mp 的数据库结构
CREATE DATABASE IF NOT EXISTS `mp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mp`;

-- 导出  表 mp.address 结构
CREATE TABLE IF NOT EXISTS `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL COMMENT '用户ID',
  `province` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '省',
  `city` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '市',
  `town` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '县/区',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机',
  `street` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '详细地址',
  `contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '联系人',
  `is_default` bit(1) DEFAULT b'0' COMMENT '是否是默认 1默认 0否',
  `notes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `deleted` bit(1) DEFAULT b'0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=COMPACT;

-- 正在导出表  mp.address 的数据：~11 rows (大约)
INSERT INTO `address` (`id`, `user_id`, `province`, `city`, `town`, `mobile`, `street`, `contact`, `is_default`, `notes`, `deleted`) VALUES
	(59, 2, '北京', '北京', '朝阳区', '13900112222', '金燕龙办公楼', 'Rose', b'1', NULL, b'0'),
	(60, 1, '北京', '北京', '朝阳区', '13700221122', '修正大厦', 'Jack', b'0', NULL, b'0'),
	(61, 1, '上海', '上海', '浦东新区', '13301212233', '航头镇航头路', 'Jack', b'1', NULL, b'0'),
	(63, 2, '广东', '佛山', '永春', '13301212233', '永春武馆', 'Rose', b'0', NULL, b'0'),
	(64, 3, '浙江', '杭州', '拱墅区', '13567809102', '浙江大学', 'Hope', b'1', NULL, b'0'),
	(65, 3, '浙江', '杭州', '拱墅区', '13967589201', '左岸花园', 'Hope', b'0', NULL, b'0'),
	(66, 4, '湖北', '武汉', '汉口', '13967519202', '天天花园', 'Thomas', b'1', NULL, b'0'),
	(67, 3, '浙江', '杭州', '拱墅区', '13967589201', '左岸花园', 'Hopey', b'0', NULL, b'0'),
	(68, 4, '湖北', '武汉', '汉口', '13967519202', '天天花园', 'Thomas', b'1', NULL, b'0'),
	(69, 3, '浙江', '杭州', '拱墅区', '13967589201', '左岸花园', 'Hopey', b'0', NULL, b'0'),
	(70, 4, '湖北', '武汉', '汉口', '13967519202', '天天花园', 'Thomas', b'1', NULL, b'0');

-- 导出  表 mp.user 结构
CREATE TABLE `user` (
	`id` BIGINT(19) NOT NULL AUTO_INCREMENT COMMENT '用户id',
	`username` VARCHAR(50) NOT NULL COMMENT '用户名' COLLATE 'utf8_general_ci',
	`password` VARCHAR(128) NOT NULL COMMENT '密码' COLLATE 'utf8_general_ci',
	`phone` VARCHAR(20) NULL DEFAULT NULL COMMENT '注册手机号' COLLATE 'utf8_general_ci',
	`info` JSON NOT NULL COMMENT '详细信息',
	`status` INT(10) NULL DEFAULT '1' COMMENT '使用状态（1正常 2冻结）',
	`balance` INT(10) NULL DEFAULT NULL COMMENT '账户余额',
	`create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `username` (`username`) USING BTREE
)
COMMENT='用户表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
ROW_FORMAT=COMPACT
AUTO_INCREMENT=5
;

-- 正在导出表  mp.user 的数据：~4 rows (大约)
INSERT INTO `user` (`id`, `username`, `password`, `phone`, `info`, `status`, `balance`, `create_time`, `update_time`) VALUES
	(1, 'Jack', '123', '13900112224', '{"age": 20, "intro": "佛系青年", "gender": "male"}', 1, 1600, '2023-05-19 20:50:21', '2023-06-19 20:50:21'),
	(2, 'Rose', '123', '13900112223', '{"age": 19, "intro": "青涩少女", "gender": "female"}', 1, 600, '2023-05-19 21:00:23', '2023-06-19 21:00:23'),
	(3, 'Hope', '123', '13900112222', '{"age": 25, "intro": "上进青年", "gender": "male"}', 1, 100000, '2023-06-19 22:37:44', '2023-06-19 22:37:44'),
	(4, 'Thomas', '123', '17701265258', '{"age": 29, "intro": "伏地魔", "gender": "male"}', 1, 800, '2023-06-19 23:44:45', '2023-06-19 23:44:45');

````

### 1.2.环境准备

引入依赖：

````xml
<dependencies>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.3.1</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
````

在 `application.yml` 中修改 jdbc 参数：

````yml
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/mp?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
logging:
  level:
    com.itheima: debug
  pattern:
    dateformat: HH:mm:ss
````

### 1.3.定义Mapper

首先需要创建一个实体类，用于对应表：

````java
@Data
@TableName("user")
public class User {
    @TableId("id")
    private Long id;

    @TableField("username")
    private String username;

    @TableField("password")
    private String password;

    @TableField("phone")
    private String phone;

    @TableField("info")
    private String info;

    @TableField("status")
    private Integer status;

    @TableField("balance")
    private Integer balance;

    @TableField("create_time")
    private Date createTime;

    @TableField("update_time")
    private Date updateTime;
}
````

为了简化单表 CRUD，MybatisPlus 提供了一个基础的 `BaseMapper` 接口，其中已经实现了单表的 CRUD：

````java
public interface UserMapper extends BaseMapper<User> {
}
````

在启动类使用 `` 注解，识别包下的所有mapper：

````java
@SpringBootApplication
@MapperScan("com.cola1213.mybatisplus")
public class AppMybatisPlus {
    public static void main(String[] args) {
        SpringApplication.run(AppMybatisPlus.class);
    }
}
````

### 1.4.测试

新建一个测试类，编写单元测试，测试基本的功能：

````java
@SpringBootTest
@Slf4j
public class UserTest {
    @Autowired
    private UserMapper userMapper;

    @Test
    void test01() {
        userMapper.selectList(null).forEach(System.out::println);
    }
}
````

## 2、常见注解

UserMapper 在继承 BaseMapper 的时候指定了一个泛型：

````java
public interface UserMapper extends BaseMapper<User> {
}
````

泛型中的 User 就是与数据库对应的 PO.

MybatisPlus就是根据PO实体的信息来推断出表的信息，从而生成SQL的。默认情况下：

- 把 PO 实体的类名驼峰转下划线作为表名
- 把 PO 实体的所有变量名驼峰转下划线作为表的字段名，并根据变量类型推断字段类型
- 把名为 id 的字段作为主键
  
但很多情况下，默认的实现与实际场景不符，因此 MybatisPlus 提供了一些注解便于声明表信息。

### 2.1.@TableName

`@TableName` 用于描述对应的表名，除了指定表名以外，还可以指定很多其它属性：

| 属性                 | 类型       | 必须指定 | 默认值   | 描述                                                            |
|--------------------|----------|------|-------|---------------------------------------------------------------|
| `value`            | String   | 否    | ""    | 表名                                                            |
| `schema`           | String   | 否    | ""    | schema                                                        |
| `keepGlobalPrefix` | boolean  | 否    | false | 是否保持使用全局的 tablePrefix 的值（当全局 tablePrefix 生效时）                 |
| `resultMap`        | String   | 否    | ""    | xml 中 resultMap 的 id（用于满足特定类型的实体类对象绑定）                        |
| `autoResultMap`    | boolean  | 否    | false | 是否自动构建 resultMap 并使用（如果设置 resultMap 则不会进行 resultMap 的自动构建与注入） |
| `excludeProperty`  | String[] | 否    | {}    | 需要排除的属性名 @since 3.3.1                                         |

