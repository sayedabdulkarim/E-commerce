const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  }
})

const model = mongoose.model('Product', schema)

module.exports = model