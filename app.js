const express = require('express')
const body_parser = require('body-parser')


const placesRoutes = require('./routes/places-routes')

const app = express()

app.use(body_parser.json())

app.use('/api/places',placesRoutes)

app.listen(5000)