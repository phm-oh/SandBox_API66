const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
// http://127.0.0.1:3000/users/*/
router.get('/',userController.index );

// http://127.0.0.1:3000/login/*/
router.get('/login', userController.login);

// http://127.0.0.1:3000/users/*/
router.post('/', userController.insert);

// get by id http://127.0.0.1:3000/users/id/
router.get('/:id', userController.userbyid);


// delete user by id http://127.0.0.1:3000/users/id/
router.delete('/:id', userController.deleteuserbyid);



module.exports = router;
