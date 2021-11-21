const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Author = require('../models/author')
const Book = require('../models/book')
const config = require('./config')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// READ DATA FOR FILE
const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`))
const authors = JSON.parse(fs.readFileSync(`${__dirname}/authors.json`))

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await Book.create(books)
    // console.log('Data successfully loaded for Books!')

    await Author.create(authors)
    console.log('Data successfully loaded for Authors!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Book.deleteMany()
    console.log('Data successfully deleted for Books!')

    await Author.deleteMany()
    console.log('Data successfully deleted for Authors!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
