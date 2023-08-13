const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
// http://127.0.0.1:3000/users/*/
router.get('/',userController.index );

router.get('/login', userController.login);

module.exports = router;
