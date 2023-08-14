const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopRouter = require('./routes/shop');



const app = express();
mongoose.connect('mongodb+srv://oh:Oasis6566@learnapi01.skiyrau.mongodb.net/SandboxAPI66?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop',shopRouter);

module.exports = app;
