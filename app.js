const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// import middleware
const errorHandle = require('./middleware/errorHandle');

//require config
const config = require('./config/index');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopRouter = require('./routes/shop');
const memberRouter = require('./routes/member');


const app = express();
mongoose.connect(config.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});





app.use(logger('dev'));
app.use(express.json({
    limit : '50mb'      //กำหนดขนาดของ req.body ให้มีขนาดใหญ่ขึ้นป้องกันเวลาที่ส่งรูปภาพขนาดใหญ่เข้ามาที่ req.body 
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/shop',shopRouter);
app.use('/member', memberRouter);



app.use(errorHandle);     //ข้อกำหนดจะต้องใส่ errorHandle ไว้ล่างสุดก่อน exports
module.exports = app;
