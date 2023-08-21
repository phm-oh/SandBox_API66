const express = require('express');
const router = express.Router();
const member = require('../controllers/memberController')


router.get('/', member.letmein);

router.post('/register', member.register);

module.exports = router;