const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


const productRoute = require('./api/routes/products')
const orderRoute = require('./api/routes/orders')


//mongoDB connection 
mongoose.connect('mongodb+srv://admin:' +
    process.env.MONGO_PWD + '@cluster0.zf8kd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


//logging
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE");
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productRoute);
app.use('/orders', orderRoute);

// error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
});
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;