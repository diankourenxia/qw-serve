// 婚礼列表增删改查
const WeddingModel = require("../mongoose/models/wedding");
const fs = require("fs");
const file = "./mock-data/wedding.json";
const initialVal = JSON.parse(fs.readFileSync(file));
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
  const {
    priceRange = [0, 10000000],
    category = "",
    hotel = ""
  } = ctx.request.body;
  await new Promise((res, rej) => {
    let param = {
      price: { $gte: priceRange[0] || 0, $lte: priceRange[1] || 10000000 }
    };
    if (category) {
      param.category = { $all: category };
    }
    if (hotel) {
      param.hotel = hotel;
    }
    console.log(param);
    WeddingModel.find(param, (err, val) => {
      if (err) rej(err);
      console.log(val);
      if (val.length === 0 || !!val === false) {
        const newWedding = new WeddingModel(initialVal.weddingList[0]);
        newWedding.save(function(err, resp) {
          if (err) {
            result = { success: false, message: "保存失败" };
            rej(err);
          } else {
            result = { success: true, message: "保存成功" };
            res();
          }
        });
      }
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
      console.log(err);
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
  const { id } = ctx.request.body;
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
    describe,
    title,
    price,
    hotel,
    category,
    picItems
  } = ctx.request.body;
  await new Promise((res, rej) => {
    WeddingModel.update(
      { _id: _id },
      { pagePic, title, price, hotel, describe, category, picItems },
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
  console.log(ctx);
  const { _id } = ctx.request.body;
  console.log(_id);
  await new Promise((res, rej) => {
    WeddingModel.deleteOne({ _id: _id }, (err, val) => {
      if (err) rej(err);
      console.log(res);
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
