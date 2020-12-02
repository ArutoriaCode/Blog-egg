# blog-egg

个人博客后端，基于egg.js框架开发

前端仓库：https://github.com/Chenwangdexiwang/Blog

## 部署参考
https://eggjs.org/zh-cn/core/deployment.html

运行或部署前的注意事项：
1. 请修改`config/secure.js`中的安全配置
2. 请修改`database/config.json`中的配置，以便在运行时创建相关表
3. 上传接口使用腾讯云COS的存储服务，如果你使用的第三方服务请自己实现相关接口
4. 如使用腾讯云COS请记得修改`config/secure.js`文件内的`tencentCos`配置

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org