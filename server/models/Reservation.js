// models/Reservation.js
const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  slot: { type: String, required: true },
  machine: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

reservationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Reservation', reservationSchema)
