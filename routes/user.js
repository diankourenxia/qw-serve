// 公司，联系人等信息增删改差
const UserModel = require("../mongoose/models/user");
const get = async (ctx, next) => {
  let result = {
    success: false,
    message: "获取失败"
  };
  await new Promise((res, rej) => {
    UserModel.find((err, val) => {
      if (err) rej(err);
      result = {
        success: true,
        data: val || {}
      };
      res();
    });
  }).then(
    data => {
      console.log(result);
      ctx.body = result;
      next();
    },
    err => {
      result.message = err;
      ctx.body = result;
      next();
    }
  );
};
const update = async (ctx, next) => {
  let result = {
    success: false,
    message: "保存失败"
  };
  const {
    _id,
    name,
    describe,
    timeRange,
    qrCode,
    phone,
    address,
    weibo
  } = ctx.request.body;
  await new Promise((res, rej) => {
    UserModel.update(
      { _id: _id },
      {
        name,
        describe,
        timeRange,
        qrCode,
        phone,
        address,
        weibo
      },
      function(err, resp) {
        if (err) {
          result = { success: false, message: "保存失败" };
          rej(err);
        } else {
          result = { success: true, message: "保存成功" };
          res();
        }
      }
    );
  }).then(
    d => {
      ctx.body = result;
      next();
    },
    error => {
      rej(error);
    }
  );
};
module.exports = {
  "user/get": [get],
  "user/update": [update]
};
