const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid'); //ต้องติดตั้ง uuid
const { promisify } = require('util') 
const writeFileAsync = promisify(fs.writeFile)
const config = require('../config/index');



const Shop = require('../models/shop');
const Menu = require('../models/menu');

// แบบเลือกทั้งหมด
// exports.index = async (req, res, next) => {

//      const shop = await Shop.find().sort({_id: -1})

//     // res.send('respond with a resss');
//     res.status(200).json({
//       data:shop
//     })
//   }


//แบบไม่เอา location
exports.index = async (req, res, next) => {

    const shop = await Shop.find().select('name photo').sort({_id: -1})

    const shopWithPhotoDomain = await shop.map((s , index)=> { 
      return {
        id: s._id,
        name: s.name,
        // photo: 'http://localhost:3000/images/'+s.photo,
        photo: config.DOMAIN +'/images/'+s.photo,
      }
    })

   
   res.status(200).json({
     data: shopWithPhotoDomain,
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

      shop['photo'] = 'http://localhost/image/' +shop.photo;
      console.log(shop);

      
  
      res.status(200).json({
        data: shop
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
    const { name,location,photo } = req.body;
  
    // let user = new User(req.body);
  
    let shop = new Shop({
      name: name,
      location: location,
      photo: await saveImageToDisk(photo)
    });
  
    await shop.save();
  
    res.status(200).json({
      message: "เพิ่มข้อมูลร้านอาหารเรียบร้อย",
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
        photo:'nopic.png',
        photo: await saveImageToDisk(photo),
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



  //------get menu--------

exports.getmenuAll = async (req, res, next) => {
  
  //  const menu = await Menu.find();
  //  const menu = await Menu.find().limit(3);  // จำกัด 3 รายการ
  // const menu = await Menu.find().select('+menuname -price');
  // const menu = await Menu.find().where({menuname:/Ovall/});
  // https://mongoosejs.com/docs/queries.html  <--อ่านได้ที่
  //  const menu = await Menu.find({ price: {$gt: 300}});

  //const menu = await Menu.find().where('price').gt(100).lt(300) //  ราคา มากกว่า 100 ไม่เกิน 300
  
  // ทดลองสร้าง คอลัมจำลองขึ้นมา virtual type https://mongoosejs.com/docs/tutorials/virtuals.html
  
  //  res.status(200).json({
  //     data: menu
  //  })

  // เริ่มจอยตาราง (populate)

  //  const menu = await Menu.find().populate('shop');  // shop คือ ฟิลที่เป็น forent key ที่เชื่อมไปตาราง Shops
  const menu = await Menu.find().populate('shop').sort({_id: -1}); //จัดเรียงเมนูล่าสุด
  res.status(200).json({
    data: menu
  })


 }  


//get shop whit menu by shop_id
 exports.getShopWithMenu = async (req, res, next) => {
  
    const {id} = req.params;
    const shop = await Shop.findById(id).populate('menusItem')
   //จัดเรียงเมนูล่าสุด
  res.status(200).json({
    data: shop
  })


 } 



//function save ภาพลงเครื่อง


 async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve('./') ;
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4.v4()}.svg`;
  } else {
      filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath+filename, image.data, 'base64');
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  let matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}
