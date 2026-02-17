const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');


//midlleware
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: false}));
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1', require('./routes/main.routes'));


module.exports = app;