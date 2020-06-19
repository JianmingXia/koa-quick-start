基于过往的工作经历，整理的一个基于 Koa 快速构建项目的模板

## 分支说明
- master: 主分支
- es: [es 应用的分支](https://github.com/JianmingXia/koa-quick-start/tree/es)
- mysql: [引入 sequelize 及 sequelize-cli 的分支](https://github.com/JianmingXia/koa-quick-start/tree/mysql)

## NPM 命令
### 启动服务

```
npm start
```

### 开发模式

```
npm run watch
```

### 代码检查

```
npm run lint
```

### 运行测试

```
npm run test
```

### 单元测试覆盖率

```
npm run cov
```

## 模板说明
### 核心部分
#### router
配置 URL 路由规则，见[文档](docs/router.md)

#### middleware
预设的中间件，见[文档](docs/middleware.md)

#### controller
见[文档](docs/controller.md)

#### service
见[文档](docs/service.md)

#### model
见[文档](docs/model.md)

### 核心支持
#### config
配置文件目录，可根据 NODE_ENV 加载配置（提前是对应环境的配置已准备好），默认加载 config_default.js 的配置，默认配置可被覆盖。

#### plugin
存储插件目录，目前只有一个 log.js，用于打印项目日志。

#### common
基础配置目录：
- error_code.js: 错误码配置文件
- error_msg.js: 错误信息配置文件
- log_type.js: 日志类型配置文件
- status_code.js: 状态码配置文件
- sys_error.js: 自定义系统错误，增加了 code 及 status 字段

#### schema
参数校验规则

### 单元测试
#### test
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
- .eslintignore: 忽略 eslint 规则的配置文件
- .eslintrc: eslint 规则配置文件
- .prettierrc: prettier 配置
- .huskyrc: husky 配置
- commitlint.config.js: 结合 husky 使用
- .nycrc: nyc 配置
- .gitignore: git 忽略配置文件
- .npmignore: npm 忽略配置文件

## 部分依赖说明

- @hapi/joi：参数校验工具
- husky：Git hooks 工具
- nodemon：开发环境避免频繁重启