var mongoose = require('../connection/index');
var ObjectId = mongoose.Schema.ObjectId;
const config = require('config');
// const crypto = require('crypto');
import bcrypt from 'bcrypt';


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
  passwordHash:  {
    type: String,
    required: true
  },
  salt:          {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.virtual('password')
  .set(async function(password) {
    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }
    }

    this._plainPassword = password;

    if (password) {
      let saltRounds = 10;  // количество символов в новой соли
      bcrypt.genSalt(saltRounds, function(err, salt) { // генерируем соль
        if (err) throw new Error(err);
        let generatedSalt = salt; // Если все хорошо - создаем hash на основе пароля и соли
        bcrypt.hash(password, generatedSalt, function(err, hash) {
          if (err) throw new Error(err);
          this.salt = generatedSalt;
          this.passwordHash = hash; // Теперь пароль зашифован!

        });
      });
      // this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
      // this.passwordHash = crypto.pbkdf2Sync(
      //   password,
      //   this.salt,
      //   config.crypto.hash.iterations,
      //   config.crypto.hash.length,
      //   'sha1'
      // ).toString('base64');
    } else {
      // remove password (unable to login w/ password any more, but can use providers)
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function() {
    return this._plainPassword;
  });


module.exports = mongoose.model('User', userSchema);
