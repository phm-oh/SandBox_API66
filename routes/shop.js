const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/',shopController.index );
router.get('/:id',shopController.shopbyid);
router.post('/',shopController.insertshop );
router.delete('/:id',shopController.deleteShopByid );
router.put('/:id',shopController.updateShopByid );

//--------get menu
router.get('/menu',shopController.getmenu );



module.exports = router;