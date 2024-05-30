require('dotenv').config()

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
