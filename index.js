// index.js
const express = require('express')
const db = require('./db/db')
const userroute = require('./routes/user-routes')

// Initialize the app


const app = express()

// db connection
db;

// Configure middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

// Configure CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    )
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})


// Configure routes

app.use('/user',userroute );




// Import the routes


const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app