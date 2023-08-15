const mongoose = require('mongoose');
import { ObjectId } from '../node_modules/bson/src/objectid';
import { Schema } from '../node_modules/mongoose/types/index.d';
// const { Schema } = mongoose.Schema;

// const schema = new mongoose.Schema({
//   email: String, // String is shorthand for {type: String}
//   username: String,
//   password: String, 
// });

const Schema =  mongoose.Schema;
const schema =  Schema({
    menuname: { type:String , require:true , trim:true}, 
    menuphoto: { type:String , default:'nopic.png'},
    price:{ type: Number},
    shop:{ type: Schema.Types.ObjectId , ref: 'shops'} // สร้างคีย์รอง ไปเชื่อมกับโมเดลหลัก ? Model shops
    }, 
    // ไม่ต้องทำ createdAt updatedAt -> mongoose ทำให้อัตโนมัติถ้าใส่ option timestamps: true
    // createdAt:{ type: Date, default: Date.now},
    // updatedAt:{ type: Date}
  },{timestamps: true});


const menu = mongoose.model('menus',schema); // 'shops' => ให้ตั้งเหมือนชืื่อ document ใน db จะชัวสุด

module.exports = menu;