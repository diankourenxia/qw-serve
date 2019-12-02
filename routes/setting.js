// 背景图片，logo等配置

const info = async (ctx, next) => {
  console.log(123);
  console.log(ctx);
  ctx.body = 1;
};
const update = async (ctx, next) => {
  console.log(ctx);
};
module.exports = {
  "setting/info": [info],
  "setting/update": [update]
};
