const User = require('../models/user');
const mongoose = require('../connection/index');
var ObjectId = mongoose.Types.ObjectId;


module.exports.logIn = async (ctx, next) => {

  ctx.body = 'Beginning! logIn'
}

module.exports.logOut= async (ctx, next) => {
  ctx.logout();
  ctx.session = null; // destroy session (!!!)
  ctx.redirect('/');
  ctx.body = 'Beginning! logOut'
}