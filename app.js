const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')


const placesRoutes = require('./routes/places-routes')
const userRoutes = require('./routes/user-routes')

const app = express()

app.use(body_parser.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width,Content-Type, Accept, Authorization"
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next()
})

app.use('/api/places',placesRoutes)
app.use('/api/user',userRoutes)

app.use((error,req,res,next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "Unknown error"})
})

mongoose
    .connect('mongodb+srv://SDP07:DWM7rnRUPk0CqhNL@cluster0.szlt8pq.mongodb.net/places?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
    })

