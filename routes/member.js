const express = require('express');
const router = express.Router();
const member = require('../controllers/memberController');
const { body } = require('express-validator');


router.get('/', member.index);

router.post('/register', [
    body('name').not().isEmpty().withMessage('plz fil name'),
    body('email').not().isEmpty().withMessage('plz fill email').isEmail().withMessage('invalid format'),
    body('password').not().isEmpty().withMessage('plz fil password').isLength({min:4}).withMessage('less 4 charector'),
],  member.register);



router.post('/login', member.login);

module.exports = router;