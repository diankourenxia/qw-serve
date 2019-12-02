const Router = require("koa-router");
const router = new Router({
  prefix: "/api" // 统一前缀，接口全部为 /api/xxx 格式
});

const categoryController = require("./category");
const settingController = require("./setting");
const userController = require("./user");
const weddingController = require("./wedding");
const uploadController = require("./upload");
const allController = Object.assign(
  categoryController,
  settingController,
  userController,
  weddingController,
  uploadController
);
Object.keys(allController).forEach(key => {
  console.log(key);
  router.all("/" + key, ...allController[key]); // router.all是允许所有的访问方式，如果需要限定则改为指定方式即可
});
module.exports = router;
