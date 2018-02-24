const Router = require('koa-router');
const router = new Router();

const UserController = require('../controllers/user');

router.get('/', UserController.getAll);
router.get('/create-one', UserController.createTestUser);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.changeUser);


router.get('/:id', UserController.getById);
router.delete('/:id', UserController.deleteById);


// router.get('/views', async function(ctx, next) {
//   let count = ctx.session.count || 0;
//   ctx.session.count = ++count;
//
//   ctx.body = ctx.render('./templates/index.pug', {
//     user: 'John',
//     count
//   });
// });


// параметр ctx.params
// см. различные варианты https://github.com/pillarjs/path-to-regexp
//   - по умолчанию 1 элемент пути, можно много *
//   - по умолчанию обязателен, можно нет ?
//   - уточнение формы параметра через regexp'ы
// router.get('/user/:user/hello',
//   async (ctx, next) => {
//     if (ctx.params.user === 'admin') {
//       await next();
//       return;
//     }
//
//     ctx.throw(403);
//   },
//   async function(ctx) {
//     ctx.body = "Hello, " + ctx.params.user;
//   }
// );



module.exports  = router;