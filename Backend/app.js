const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const authorRoute = require('./Routes/authorRoute');
const bookRoute = require('./Routes/bookRoute');

mongoose.connect('mongodb+srv://admin:abcd1234@cluster0-3u1lq.mongodb.net/test?retryWrites=true', {useNewUrlParser: true, useCreateIndex: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


app.use('/authors', authorRoute);
app.use('/books', bookRoute);
//Reserved for routes



app.use((req,res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((error,req,res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;