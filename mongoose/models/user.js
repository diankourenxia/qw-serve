const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  describe: String,
  timeRange: String,
  qrCode: String,
  phone: String,
  address: String,
  weibo: String,
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  }
});
UserSchema.pre("save", function(next) {
  if (this.isNew) {
    this.status = "normal";
    this.createTime = this.updateTime = Date.now();
  } else {
    this.updateTime = Date.now();
  }
  next();
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
