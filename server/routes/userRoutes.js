// userRoutes.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.get('/', (req, res) => {
  res.send('<p>users</p>')
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    // Check if username is already taken
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    // Create a new user
    const newUser = new User({ username: username, password: passwordHash })
    await newUser.save()

    res.status(201).json({ username: newUser.username, message: 'User created successfully' })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Find user by username
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Compare password hashes
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, 'jwt_secret', { expiresIn: '1h' })

    res.status(200).json({ token, username: user.username, id: user._id })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

router.get('/getAll', async (request, response) => {
  const users = await User
    .find({}).populate('reservations', { content: 1, important: 1 })
  response.json(users)
})

module.exports = router
