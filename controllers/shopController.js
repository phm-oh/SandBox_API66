const Shop = require('../models/shop');


exports.index = async (req, res, next) => {

     const shop = await Shop.find().sort({_id: -1})

    // res.send('respond with a resss');
    res.status(200).json({
      data:shop
    })
  }


exports.shopbyid = async (req, res, next) => {
 
  
    try {
      const { id } = req.params;
      const shop= await Shop.findById(id);
  
      //ในกรณีที่หา id ไม่เจอ
      if (!shop) {
        
        throw new Error('ไม่พบร้านค้า');
      }
  
      res.status(200).json({
        data: shop,
      });
  
    } catch (error) {
      res.status(400).json({
          error:{
            message: 'เกิดข้อผิดพลาด' + error.message , 
          }
      });
  
      
    }
  };





exports.insertshop = async (req, res, next) => {
    const { name, photo, location } = req.body;
  
    // let user = new User(req.body);
  
    let shop = new Shop({
      name: name,
      photo: photo,
      location: location,
    });
  
    await shop.save();
  
    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อย",
    });
  };  



  exports.deleteShopByid = async (req, res, next) => {


    try {
      const { id } = req.params;
      const shop = await Shop.deleteOne({_id:id});
  
      //ในกรณีที่หา id ไม่เจอ
      if (shop.deletedCount === 0) {
        
        throw new Error('ไม่สามารถลบข้อมูล');
      } else{
        res.status(200).json({
          data: {
            message:`ลบข้อมูลร้านค้า ${id} สำเร็จ` ,
          },
        });
      }
  
    } catch (error) {
      res.status(400).json({
          error:{
            message: 'เกิดข้อผิดพลาด' + error.message , 
          }
      });
  
      
    }
  };  




  exports.updateShopByid = async (req, res, next) => {


    try {
      const { id } = req.params;
      const { name, photo, location } = req.body;

      const shop = await Shop.findByIdAndUpdate(id,{
        name:name,
        photo:photo,
        location:location
      })
      console.log(shop);
  
        res.status(200).json({
          data: {
            message:`แก้ไขข้อมูลร้านค้า ${id} สำเร็จ` ,
          },
        });
      
      // catch เขียนเหมือนกันทั้ง 2 แบบ
    } catch (error) {
      res.status(400).json({
          error:{
            message: 'เกิดข้อผิดพลาด' + error.message , 
          }
      });
  
      
    }
  };