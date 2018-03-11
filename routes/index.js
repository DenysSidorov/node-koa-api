const Router = require('koa-router');
const mainRouter = new Router();

const userTestRouter = require('./userTestRoute');
const userRouter = require('./userRoute');
const authRouter = require('./authRoute');

const apiName= `api`;

mainRouter.use(`/${apiName}/test`, userTestRouter.routes());
mainRouter.use(`/${apiName}/users`, userRouter.routes());
mainRouter.use(`/${apiName}/auth`, authRouter.routes());

module.exports = mainRouter;