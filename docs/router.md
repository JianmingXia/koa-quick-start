配置 URL 路由规则，目前支持 5 个参数：
- method（必填）: 方法
- path（必填）: URL 路径
- controller（必填）: 配置路由规则后跳转的 controller
- checkParam（可选）: 参数校验，可使用 schema 中写入的规则
- middleware（可选）: 在 controller 前做的其它操作，比如权限校验、预置上下文等

## 示例

```
{
  method: 'get',
  path: '/users/:userId',
  controller: TestCtrl.getUser,
  checkParam: TestSchema.getUser,
  middleware: [],
}
```

## 调用顺序
1. checkParam
1. middleware
1. controller