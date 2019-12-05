// 分类信息增删改差
const CategoryModel = require("../mongoose/models/category");
const fs = require("fs");
const file = "./mock-data/category.json";
const initialVal = JSON.parse(fs.readFileSync(file));
const get = async(ctx, next) => {
    newCategory = new CategoryModel(initialVal);
    let result = {
        success: false,
        message: "获取失败"
    };
    await new Promise((res, rej) => {
        CategoryModel.find({}, (err, val) => {
            if (err) rej(err);
            if (val.length === 0 || !!val === false) {
                newCategory.save(function(err, resp) {
                    CategoryModel.find({}, (err, val) => {
                        result = {
                            success: true,
                            data: val || {}
                        };
                        res();
                    });
                });
            } else {
                result = {
                    success: true,
                    data: val || {}
                };
                res();
            }
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
const update = async(ctx, next) => {
    let result = {
        success: false,
        message: "保存失败"
    };
    const { _id, price, style, hotel } = ctx.request.body;
    console.log(ctx.request.body);
    await new Promise((res, rej) => {
        CategoryModel.update({ _id: _id }, {
                price,
                style,
                hotel
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