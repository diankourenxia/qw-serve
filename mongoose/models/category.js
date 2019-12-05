const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  price: {
    label: String,
    list: [String]
  },
  style: {
    label: String,
    list: [String]
  },
  hotel: {
    label: String,
    list: [String]
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
});
CategorySchema.pre("save", function(next) {
  if (this.isNew) {
    this.status = "normal";
    this.createTime = this.updateTime = Date.now();
  } else {
    this.updateTime = Date.now();
  }
  next();
});
const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
