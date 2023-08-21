const mongoose = require('mongoose');
// ติดตั้ง bcrptjs  = npm i bcryptjs
const  bcrypt = require('bcryptjs');


const schema = new mongoose.Schema({
    email: { type:String , require:true , trim:true ,unique:true ,index:true},  // email ซ้ำไม่ได้  เร่งความเร็วด้วย index
    name: { type:String , require:true , trim:true},
    password: { type:String , require:true , trim:true , minlenght: 4},
    role:{type:String , default: 'member'} ,
  });


schema.methods.newPassword = async (passwod)=>{           //newPassword คือชื่อ function เราตั้งเอง
   const salt = await bcrypt.genSalt(5);
   const newpass = bcrypt.hash(passwod , salt);
   return newpass;
}  

schema.method.compare = async(newpassword)=>{
  
}


const member = mongoose.model('members',schema); // 'users' => ให้ตั้งเหมือนชืื่อ document ใน db จะชัวสุด

module.exports = member;