var mongoose = require('../connection/index');
var ObjectId = mongoose.Schema.ObjectId;



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
    enum: ['M', 'F'], // enum validator
    default: 'M'
  }
}, {
  timestamps: true
});


// here put your code ...

module.exports = mongoose.model('User', userSchema);
