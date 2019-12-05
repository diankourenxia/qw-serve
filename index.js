// index.js
const Koa = require("koa");
const app = new Koa();
const router = require("./routes/index");
const cors = require("koa2-cors");
const { connect, initSchemas } = require("./mongoose/init");
const bodyParser = require("koa-bodyparser");
(async () => {
  await connect();
  await initSchemas();
})();
const handler = async (ctx, next) => {
  if (
    ctx.response.body &&
    ctx.response.body.hasOwnProperty("success") &&
    ctx.response.body.success === true
  ) {
    ctx.response.body.code = "200";
  }
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};
app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(
    cors({
      origin: function(ctx) {
        return "*";
      },
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: 5,
      credentials: true,
      allowMethods: ["GET", "POST", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
  )
  .use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(handler);

app.listen(3001);
