const multer = require("koa-multer"); //加载koa-multer模块
//文件上传
//配置
const storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, "/root/public/img");
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
//加载配置
const uploadConf = multer({ storage: storage });
const upload = async (ctx, next) => {
  console.log(ctx.req.file);
  console.log(ctx.req);
  ctx.body = {
    success: true,
    location: `http://img.nghugh.cn/${ctx.req.file.filename}` //返回文件名
  };
};

module.exports = {
  "upload/file": [uploadConf.single("file"), upload]
};
