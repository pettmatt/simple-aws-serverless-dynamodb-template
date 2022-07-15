const userRoutes = require('./src/routes/userRoutes')
const express = require('express')
const app = express()

app.use(express.json())
app.use('/', userRoutes)

app.get('/', async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: 'Server launched without a problem' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  })
})

module.exports = app