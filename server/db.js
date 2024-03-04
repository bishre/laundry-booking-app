require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.ATLAS_URI

mongoose.connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error to Mongodb', err.message))