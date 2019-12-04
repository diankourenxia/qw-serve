// 婚礼列表增删改查
const WeddingModel = require("../mongoose/models/wedding");
const fs = require("fs");
const file = "./mock-data/wedding.json";
const result = JSON.parse(fs.readFileSync(file));
console.log(result);
const add = async (ctx, next) => {
  const { pagePic, title, price, hotel, category, picItems } = ctx.request.body;

  const newWedding = new WeddingModel({
    pagePic,
    title,
    price,
    hotel,
    category,
    picItems
  });
  await new Promise((res, rej) => {
    newWedding.save(function(err, resp) {
      if (err) {
        result = { success: false, message: "保存失败" };
        rej(err);
      } else {
        result = { success: true, message: "保存成功" };
        res();
      }
    });
  }).then(
    data => {
      ctx.body = result;
      next();
    },
    error => {
      return Promise.reject(error);
    }
  );
};
const list = async (ctx, next) => {
  let result = {
    success: false,
    message: "获取失败"
  };
  console.log(ctx);
  const {
    status = "normal",
    priceRange = [0, 10000000],
    category = "",
    hotel = ""
  } = ctx.request.body;
  await new Promise((res, rej) => {
    let param = {
      status
    };
    param = {
      type,
      status,
      price: { $gte: priceRange[0] || 0, $lte: priceRange[1] || 10000000 },
      category: { $all: category },
      hotel: { $all: hotel }
    };
    WeddingModel.find((err, val) => {
      if (err) rej(err);
      console.log(val);
      result = {
        success: true,
        data: val || []
      };
      res();
    });
  }).then(
    data => {
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
const get = async (ctx, next) => {
  let result = {
    success: false,
    message: "获取失败"
  };
  const { _id } = ctx.request.query;
  await new Promise((res, rej) => {
    WeddingModel.find({ _id: id }, (err, val) => {
      if (err) rej(err);
      result = {
        success: true,
        data: val || {}
      };
      res();
    });
  }).then(
    data => {
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
    pagePic,
    title,
    price,
    hotel,
    category,
    picItems
  } = ctx.request.body;
  await new Promise((res, rej) => {
    WeddingModel.update(
      { _id: _id },
      { pagePic, title, price, hotel, category, picItems },
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
const deleteById = async (ctx, next) => {
  let result = {
    success: false,
    message: "获取失败"
  };
  const { _id } = ctx.request.query;
  await new Promise((res, rej) => {
    WeddingModel.remove({ _id: id }, (err, val) => {
      if (err) rej(err);
      result = {
        success: true,
        data: val || {}
      };
      res();
    });
  }).then(
    data => {
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
module.exports = {
  "wedding/list": [list],
  "wedding/add": [add],
  "wedding/get": [get],
  "wedding/update": [update],
  "wedding/delete": [deleteById]
};
