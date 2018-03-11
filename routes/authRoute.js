const Router = require('koa-router');
const router = new Router();

const authController = require('../controllers/auth');

router.post('/login', authController.logIn);


module.exports  = router;