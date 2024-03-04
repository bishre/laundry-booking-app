// server.js
const express = require('express')

// eslint-disable-next-line @stylistic/js/semi
require('dotenv').config()
const cors = require('cors')

// eslint-disable-next-line no-unused-vars
const db = require('./db')
const app = express()

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const reservationRoutes = require('./routes/reservationRoutes')

// Routes
app.use('/api/users', userRoutes)
app.use('/api/reservations', reservationRoutes)

module.exports = app