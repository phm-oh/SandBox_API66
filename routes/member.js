const express = require('express');
const router = express.Router();
const member = require('../controllers/memberController');
const { body } = require('express-validator');
const passportJWt = require('../middleware/passport');
const isAdmin = require('../middleware/checkAdmin');



// router.get('/', member.index);
router.get('/', [
    passportJWt.islogin, // login ก่อน
    isAdmin.isAdmin      // แล้วตรวจสิทธิ์ว่าเป็น admin ไหม
] ,member.index);

router.post('/register', [
    body('name').not().isEmpty().withMessage('plz fil name'),
    body('email').not().isEmpty().withMessage('plz fill email').isEmail().withMessage('invalid format'),
    body('password').not().isEmpty().withMessage('plz fil password').isLength({min:4}).withMessage('less 4 charector'),
],  member.register);


router.get('/me',passportJWt.islogin,member.getprofile);



router.post('/login', member.login);


module.exports = router;