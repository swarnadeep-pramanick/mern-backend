const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')


const placesRoutes = require('./routes/places-routes')
const userRoutes = require('./routes/user-routes')

const app = express()

app.use(body_parser.json())

app.use('/api/places',placesRoutes)
app.use('/api/user',userRoutes)

mongoose
    .connect('mongodb+srv://SDP07:DWM7rnRUPk0CqhNL@cluster0.szlt8pq.mongodb.net/places?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
    })

