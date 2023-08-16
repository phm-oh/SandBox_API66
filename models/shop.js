const mongoose = require('mongoose');
// const { Schema } = mongoose.Schema;

// const schema = new mongoose.Schema({
//   email: String, // String is shorthand for {type: String}
//   username: String,
//   password: String, 
// });

const option = {
  toJSON:{ virtuals: true},
  timestamps: true 
}


const schema = new mongoose.Schema({
    name: { type:String , require:true , trim:true}, 
    photo: { type:String , default:'nopic.png'},
    location: { 
      lat: { type:Number , default:0.00000},
      lgn: { type:Number , default:0.00000}
    }, 
    // ไม่ต้องทำ createdAt updatedAt -> mongoose ทำให้อัตโนมัติถ้าใส่ option timestamps: true
    // createdAt:{ type: Date, default: Date.now},
    // updatedAt:{ type: Date}
  },option);


  schema.virtual('menusItem',{
     ref:'menus',     // สร้าง ฟิลปลอมชื่อ menuItem อ้างอิงไปที่โมเดล menus pk
     localField: '_id',  //ระบุคีย์หลักของโมเดลนี้ (shops)
     foreignField: 'shop', //ระบุคีย์รองของตารางที่เชื่อมไปยัง menus model fk
  })


const shop = mongoose.model('shops',schema); // 'shops' => ให้ตั้งเหมือนชืื่อ document ใน db จะชัวสุด

module.exports = shop;