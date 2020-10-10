# 前后端一体化应用

By icejs and Midway Serverless.

线上访问地址：http://30791687-1052730113742573.test.functioncompute.com/

## 快速开始

```bash
$ npm i --registry=https://registry.npm.taobao.org
$ npm start
```

## 应用发布

```bash
$ npm i -g @midwayjs/faas-cli --registry=https://registry.npm.taobao.org
$ f deploy --npm cnpm # 发布函数（包含前端静态资源）
```

`f deploy` 需要填入一些信息：

- 阿里云账号的 Access Key：[访问](https://ram.console.aliyun.com/manage/ak)
- 提前开通阿里云的函数计算服务，有免费额度可以试用
- 更多：https://www.yuque.com/midwayjs/faas/deploy_aliyun_faq
