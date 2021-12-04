const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
})

// virtual populate books since we don't want to store this array of books in db
// schema.virtual('books', {
//   ref: 'Book',
//   foreignField: 'author',
//   localField: '_id',
// })

module.exports = mongoose.model('Author', schema)
