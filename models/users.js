const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

schema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

schema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

const model = mongoose.model('User', schema)

module.exports = model