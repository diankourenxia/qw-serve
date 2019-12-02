// 分类信息增删改差
const CategoryModel = require("../mongoose/models/category");
const get = async (ctx, next) => {
  newCategory = new CategoryModel({
    categoryList: [
      {
        label: "价格",
        list: [
          "0/5000",
          "5000/10000",
          "10000/20000",
          "20000/50000",
          "50000/300000"
        ]
      },
      {
        label: "风格主题",
        list: ["唯美/清新", "户外/草坪", "中式/宫廷", "森系/复古", "概念/独特"]
      },
      {
        label: "婚礼酒店",
        list: ["诺丁山", "某酒店", "七天", "雷迪森", "杏花村"]
      }
    ]
  });
  let result = {
    success: false,
    message: "获取失败"
  };
  await new Promise((res, rej) => {
    // newCategory.save(function(err, resp) {
    //   console.log(resp);
    //   console.log(err);
    // });
    CategoryModel.find((err, val) => {
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
    CategoryModel.update(
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
  "category/get": [get],
  "category/update": [update]
};
