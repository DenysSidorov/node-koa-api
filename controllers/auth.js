const User = require('../models/user');
const mongoose = require('../connection/index');
var ObjectId = mongoose.Types.ObjectId;
const passport = require('koa-passport');


module.exports.logIn = async (ctx, next) => {

  // опции @https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js
  // можно передать и функцию
  // имя local паспорт берет из локальной стратеции из мидлвер
  await passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    //failureMessage: true // запишет сообщение об ошибке в session.messages[]
    failureFlash: true // req.flash, better

    // assignProperty: 'something' присвоить юзера в свойство req.something
    //   - нужно для привязывания акков соц. сетей
    // если не стоит, то залогинит его вызовом req.login(user),
    //   - это поместит user.id в session.passport.user (если не стоит опция session:false)
    //   - также присвоит его в req.user
  })(ctx, next);

  ctx.body = 'Beginning! logIn'
}

module.exports.logOut= async (ctx, next) => {
  ctx.logout();
  ctx.session = null; // destroy session (!!!)
  ctx.redirect('/');
  ctx.body = 'Beginning! logOut'
}