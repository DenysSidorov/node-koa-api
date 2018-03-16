var mongoose = require('../connection/index');
var ObjectId = mongoose.Schema.ObjectId;
const config = require('config');
// const crypto = require('crypto');
var bcrypt = require('bcrypt');


// this schema can be reused in another schema
var userSchema = new mongoose.Schema({
  // id: {type: ObjectId},
  email: {
    type: String,
    required: 'Укажите email', // true for default message
    unique: true,
    validate: [{
      validator: function checkEmail(value) {
        return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
      },
      msg: 'Укажите, пожалуйста, корректный email.'
    }],
    lowercase: true, // to compare with another email
    trim: true
  },
  displayName: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'Undefined'], // enum validator
    default: 'M'
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  }
}, {
  timestamps: true
});

userSchema.virtual('password')
  .set(function (password) {
    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }
    }

    this._plainPassword = password;

    if (password) {
      let saltRounds = 10;  // количество символов в новой соли
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(password, salt);

          this.salt = salt;
          this.passwordHash = hash; // Теперь пароль зашифован!



    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function () {
    return this._plainPassword;
  });


userSchema.methods.checkPassword = function (password) {
  if (!password) return false; // empty password means no login by password
  if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

  var result = bcrypt.compareSync(password, this.passwordHash);

  return result
};

module.exports = mongoose.model('User', userSchema);
