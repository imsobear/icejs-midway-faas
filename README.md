# 前后端一体化应用

By icejs and Midway Serverless.

线上访问地址：http://30791687-1052730113742573.test.functioncompute.com/

## 快速开始

```bash
$ tnpm i
$ npm start
```

## 函数发布

```bash
$ cnpm i -g @midwayjs/faas-cli
$ npm run build       # 构建前端资源
$ f deploy --npm cnpm # 发布函数（包含前端静态资源）
```

`f deploy` 需要填入一些信息：

- 阿里云账号的 Access Key：[访问](https://ram.console.aliyun.com/manage/ak)
- 提前开通阿里云的函数计算服务，有免费额度可以试用
- 更多：https://www.yuque.com/midwayjs/faas/deploy_aliyun_faq
