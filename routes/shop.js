const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');


router.get('/',shopController.index );

router.get('/menu',shopController.getmenuAll ); //เอามาอยู่ด้านบน ก่อน route ที่มี params


router.get('/:id',shopController.getShopWithMenu);
//// router.get('/:id',shopController.shopbyid);
router.post('/',shopController.insertshop );
router.delete('/:id',shopController.deleteShopByid );
router.put('/:id',shopController.updateShopByid );






module.exports = router;