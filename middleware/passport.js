
const config = require('../config/index');
const Member = require('../models/members');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

    try {

        const member = await Member.findById(jwt_payload.id);
        console.log(member)
        if(!member){
            return done(new Error('ไม่พบผู้ใช้ในระบบ') , null);
        }
        return done(null,member);   // fx done มี 3 param 1 คือตัว error 2 คือข้อมูลที่จะส่งกลับ
        
    } catch (error) {
        done(error);
    }


}));

module.exports.islogin = (req, res, next) => passport.authenticate('jwt', { session: false });

// Middleware passportJWt.islogin
module.exports.islogin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
        req.member = user; // ตั้งค่า req.member ให้ค่าผู้ใช้
        next();
    })(req, res, next);
};
