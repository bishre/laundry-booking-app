// reservationRoutes.js
const express = require('express')
const router = express.Router()
const Reservation = require('../models/Reservation')
const verifyToken = require('../middleware/authMiddleware')

router.post('/', verifyToken, async (req, res) => {
  const { date, slot, machine } = req.body
  const { userId } = req.user

  try {
    const newReservation = new Reservation({ user: userId, date, slot, machine })
    await newReservation.save()
    res.status(201).json({ message: 'Reservation created successfully' })
  } catch (error) {
    console.error('Error creating reservation:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

router.get('/getAll', async (req, res) => {
  try {
    const allReservations = await Reservation.find({})
    res.json(allReservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

router.get('/', verifyToken, async (req, res) => {
  const { userId } = req.user

  try {
    const reservations = await Reservation.find({ user: userId })
    res.json(reservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

router.delete('/:id', async (request, response) => {
  await Reservation.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = router
