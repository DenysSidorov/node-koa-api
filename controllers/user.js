/*
REST-сервис для юзеров на Koa.JS + Mongoose

User имеет уникальный email, а также даты создания и модификации и имя displayName.

**** GET /users/:id - получить юзера по id, например: /users/57ffe7300b863737ddfe9a39
**** GET /users - получить массив юзеров
**** DELETE /users/:id - удалить пользователя

POST /users - создать пользователя
  Метод POST позволяет указать только email и displayName (нельзя при создании юзера указать его _id)

PATCH /users/:id - модифицировать пользователя
  Метод PATCH позволяет поменять только email и displayName (нельзя при создании юзера указать его _id)


Если юзера с данным :id нет:
   метод возвращает 404

Если ошибка валидации (напр. не указан email) или уникальности:
  метод возвращает 400 и объект с ошибками вида { errors: { field: error } }
  пример:
    {
      errors: {
        email: 'Такой email уже есть'
      }
    }

Желательно, с тестами.
*/

const User = require('../models/user');
const mongoose = require('../connection/index');
var ObjectId = mongoose.Types.ObjectId;

module.exports.createTestUser = async () => {
  const mary = new User({
    email: 'mary@mail.com'
  });
  User.remove({}, function (err) {
    mary.save(function (err, result) {
      console.log(result);
      User.findOne({
        email: 'mary@mail.com'
      }, function (err, user) {
        console.log(user);
        // ... do more with mary
        // no unref!
        mongoose.disconnect();
      });
    });
  });
}

module.exports.getAll = async function (ctx, next) {

  let users = await User.find({}, {});
  ctx.body = users;

}

module.exports.deleteById = async (ctx, next) => {
  let id = ctx.params.id;

  if (!id) {
    ctx.throw(404)
    return;
  }

  if (!ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  let user = await User.findByIdAndRemove({_id: id});
  ctx.body = user._id;
}

module.exports.getById = async function (ctx, next) {
  let id = ctx.params.id;

  if (!id) {
    ctx.throw(404)
    return;
  }

  if (!ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  let user = await User.findById({_id: id});
  if (user) {
    ctx.body = user;
  } else {
    ctx.throw(404);
  }
}
