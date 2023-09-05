const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const { rateLimit } = require('express-rate-limit')
const helmet =  require("helmet");
var cors = require('cors')


// import middleware
const errorHandle = require('./middleware/errorHandle');

//require config
const config = require('./config/index');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopRouter = require('./routes/shop');
const memberRouter = require('./routes/member');



const app = express();

app.use(cors())


app.set('trust proxy', 1)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
	legacyHeaders: false, // X-RateLimit-* headers
	// store: ... , // Use an external store for more precise rate limiting
})

// Apply the rate limiting middleware to all requests
app.use(limiter)



// Use Helmet!
app.use(helmet());

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

// init passort
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/shop',shopRouter);
app.use('/member', memberRouter);



app.use(errorHandle);     //ข้อกำหนดจะต้องใส่ errorHandle ไว้ล่างสุดก่อน exports
module.exports = app;
