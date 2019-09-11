基于 [koa-quick-start](https://github.com/JianmingXia/koa-quick-start) 模板构建了使用 sequelize 的模板。

## 引入
### NPM 依赖
- sequelize
- mysql2
- sequelize-cli

### .sequelizerc
基础配置：
- config: mysql 相关配置
  - migrationStorage: migration 存储配置
  - migrationStoragePath: migration 路径配置
- 路径配置：
  - migrations-path
  - seeders-path
  - models-path

```
module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'models'),
};
```

## 相关命令使用
- sequelize-cli init: 初始化
- sequelize-cli db:create: 创建数据库
- sequelize-cli model:generate: 生成 Model 及 migration 文件
- sequelize-cli db:migrate: 运行迁移
- sequelize-cli db:migrate:undo: 回退迁移
- sequelize-cli seed:generate: 生成种子文件
- sequelize-cli db:seed: 初始化数据
- sequelize-cli db:seed:undo: 回退初始化数据