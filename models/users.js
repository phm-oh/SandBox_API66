const mongoose = require('mongoose');
// const { Schema } = mongoose.Schema;

// const schema = new mongoose.Schema({
//   email: String, // String is shorthand for {type: String}
//   username: String,
//   password: String, 
// });


const schema = new mongoose.Schema({
    email: { type:String , require:true , trim:true}, 
    username: { type:String , require:true , trim:true},
    password: { type:String , require:true , trim:true}, 
  });


const user = mongoose.model('users',schema); // 'users' => ให้ตั้งเหมือนชืื่อ document ใน db จะชัวสุด

module.exports = user;