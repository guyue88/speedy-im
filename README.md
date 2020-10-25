# speedy-im

[![star](https://img.shields.io/github/stars/AspenLuoQiang/speedy-im?style=social)](https://github.com/AspenLuoQiang/speedy-im)  [![QQ群](https://img.shields.io/badge/QQ%E7%BE%A4-207879913-yellowgreen.svg)](https://jq.qq.com/?_wv=1027&k=9f25XGCW)

[介绍](#介绍) | [DEMO](#DEMO) | [开发](#开发) | [开发计划](#开发计划) | [系统架构](#系统架构) | [联系作者](#联系作者)


## 介绍

基于`uni-app` + `@hyoga/uni-socket.io` + `express` + `mysql`开发高性能的即时通讯系统。已支持点对点通讯，计划支持群组通讯、上下线等事件消息等众多功能。

正在持续开发中，目前仅部分UI开发完成。

## DEMO

[IM.apk](https://im.wangcai.me/__UNI__0CE1D62_1025160703.apk) ，已有基础UI以及登陆、点到点聊天等功能。

## 开发

客户端测试账号密码：  
  账号：13600000003
  密码：admin  

```shell
# 克隆项目
$ git clone git@github.com:AspenLuoQiang/speedy-im.git
$ cd speedy-im

# 启动数据库
$ cd docker
$ docker-compose up -d mysql
# 导入数据库，见下方导入数据库

# 启动服务端
$ cd server
$ yarn && yarn dev

# 以上为已开发模式启动服务端，不想改动服务端代码，只是单纯想开启服务器可以如下操作
$ cd docker
$ docker-compose up

# 安装客户端依赖，安装完成后使用HBuilder X运行到浏览器即可，请确保此时服务端已正确运行，否则会导致接口无法调用
$ cd client
$ yarn
```

## 导入数据库

* 本项目使用docker部署开发，待docker数据库启动后连接数据库，默认数据库配置见下方[MySQL默认配置](#MySQL默认配置)。
* 导入初始数据库，位置为`docker/mysql/speedy-im.sql`。

### MySQL默认配置

地址：127.0.0.1  
端口：3307  
用户名：root  
密码：123456  

## 开发计划

* [x] [UI开发](#UI开发)
* [x] [后端框架](#后端框架)
* [x] [私聊](#私聊)
* [ ] [群聊](#群聊)

## 系统架构

### 后端框架

采用`express` + `socket.io` + `mysql`开发，使用`docker`部署。

#### 错误码

返回结果采用以下结构，错误码参考HTTP状态码设计，更多状态码逐步添加中。
```
{
  errno: 200,
  errmsg: '',
  data: {},
}
```
错误码|含义|备注
---|:--:|---:
0|业务操作失败|业务上操作失败导致的错误，但未定义具体code值
200|正常|HTTP 状态码
401|未登陆|HTTP 状态码
500|内部错误|HTTP 状态码

### 客户端

客户端使用`uni-app`开发，可以同时开发安卓端与IOS端，简单快捷。

#### UI开发

![UI图](https://i.loli.net/2020/05/28/29YadEVhGSqojZU.png)

* [x] [好友列表](#好友列表)
* [x] [对话页](#对话页)
* [x] [通讯录](#通讯录)
* [x] [登录](#登录)
* [x] [注册](#注册)
* [x] [我的信息](#我的信息)
* [ ] [好友信息](#好友信息)

## 联系作者

- [qq群](https://jq.qq.com/?_wv=1027&k=9f25XGCW)
- 公众号，欢迎关注，不定时更新

![前端小白菜](https://i.loli.net/2020/05/28/CNcjhm17d9zfvkQ.jpg)

