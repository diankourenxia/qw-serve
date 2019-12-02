const mongoose = require("mongoose");
const weddingSchema = new mongoose.Schema({
  pagePic: String,
  title: String,
  price: Number,
  hotel: [String],
  describe: String,
  category: [String],
  picItems: [
    {
      picList: [String]
    }
  ],
  status: String, //normal,delete
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
});
weddingSchema.pre("save", function(next) {
  if (this.isNew) {
    this.status = "normal";
    this.createTime = this.updateTime = Date.now();
  } else {
    this.updateTime = Date.now();
  }
  next();
});
const WeddingModel = mongoose.model("Wedding", weddingSchema);
module.exports = WeddingModel;
