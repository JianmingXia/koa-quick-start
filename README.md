这是一个快速构建 Koa 项目的模板，基于过往的工作经历整理，如若需要 Koa-Session、ORM 等需要自己引入。

## 分支说明
- master: 主分支
- ryoma: 开发分支
- es: [es 应用的分支](https://github.com/JianmingXia/koa-quick-start/tree/es)
- mysql: [引入 sequelize 及 sequelize-cli 的分支](https://github.com/JianmingXia/koa-quick-start/tree/mysql)

## NPM 命令
### 启动服务

```
npm start
```

### 代码检查

```
npm run lint
```

### 运行测试

```
npm run test
```

### 查看测试覆盖率

```
npm run cov
```

## 模板说明
### plugin
插件存储的目录，目前只有一个 log.js，用于打印项目日志。

### config
配置文件集合，可根据 NODE_ENV 加载不同的配置，默认加载 config.default.js 的配置，可被覆盖。

### common
- error_code.js: 错误码配置文件
- error_msg.js: 错误信息配置文件
- log_type.js: 日志类型配置文件
- status_code.js: 状态码配置文件
- sys_error.js: 自定义系统错误，增加了 code 及 status 字段

### schema
用于存储参数规则

### middleware
中间件目录，包括以下中间件：
- check_param.js: 校验参数是否合法（基于 Joi 实现）
- request_time.js: 记录请求响应时间，会调用插件-Log

### router
配置 URL 路由规则，目前 URL 路由支持 5 个参数：
- method: 方法
- path: URL 路径
- checkParam: 参数校验（可选），会使用 schema 中提前写入的规则
- middleware: 在 controller 前做的其它操作，比如权限校验、预置上下文等
- controller: 配置路由规则后跳转的 controller

```
{
  method: 'get',
  path: '/users/:userId',
  controller: TestCtrl.getUser,
  checkParam: TestSchema.getUser,
  middleware: [],
}
```

### controller
controller 负责的是：解析用户的输入，处理后返回相应的结果。通过 Router 将用户的请求基于 method 和 URL 分发到对应的 Controller。

### service
引入 service 是为了让 controller 层更加轻量，这样 controller 中的逻辑会更加简洁，代码的复用性也能够更强。

### model
这个我也很难用语言来描述，在实际的开发中，如果只有 controller 及 service，会让代码比较臃肿，而且分层不够清晰。所以加了 model 层，用于访问数据库、访问缓存、访问第三方等，个人理解像一个领域模型或是一个防腐层。

### test
测试用例——不经过测试的代码发布后怎么能安心

File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |      100 |      100 |      100 |      100 |                   |
 controller     |      100 |      100 |      100 |      100 |                   |
  permission.js |      100 |      100 |      100 |      100 |                   |
  test.js       |      100 |      100 |      100 |      100 |                   |
 model          |      100 |      100 |      100 |      100 |                   |
  user.js       |      100 |      100 |      100 |      100 |                   |
 router         |      100 |      100 |      100 |      100 |                   |
  index.js      |      100 |      100 |      100 |      100 |                   |
  test.js       |      100 |      100 |      100 |      100 |                   |
 schema         |      100 |      100 |      100 |      100 |                   |
  test.js       |      100 |      100 |      100 |      100 |                   |
 service        |      100 |      100 |      100 |      100 |                   |
  user.js       |      100 |      100 |      100 |      100 |                   |

### 其它说明
- app.js: 入口启动文件
- .eslintignore: eslint 规则忽略文件
- .eslintrc: eslint 规则
- .huskyrc: husky 配置
- commitlint.config.js: 结合 husky 使用
- .nycrc: nyc 配置
- .prettierrc: prettier 配置
- .gitignore: git 忽略文件
- .npmignore: npm 忽略文件

## 部分依赖说明

- @hapi/joi：参数校验工具
- husky：Git hooks 工具