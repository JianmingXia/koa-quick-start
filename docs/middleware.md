中间件目录，现有以下中间件：
- request_time.js: 记录请求响应时间，会调用插件-Log
- check_param.js: 校验参数是否合法（基于 Joi 实现）
- response_format.js: 返回内容格式化