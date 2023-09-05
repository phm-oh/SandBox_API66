// const member = require("../models/members");
const Member = require("../models/members");
const { validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
const config = require('../config/index');
require('dotenv').config();




// exports.index = (req, res, next) => {
//     // res.send('respond with a resss');
//     res.status(200).json({
//       message: 'Hello Users',
//     })
//   }

exports.index = async(req, res, next) => {

    const member = await Member.find();

  res.status(200).json({
    data: member,
  });
};


exports.register = async (req, res, next) => {
   
     try {
        const {name,email,password} = req.body;

        //validation  เช็คก่อนจะส่งไป db
        const errors = validationResult(req);
        if (!errors.isEmpty()){
          // return res.status(422).json({errors: errors.array()});
          const error = new Error('ข้อมูลไม่ถูกต้อง');
          error.statusCode = 422;
          error.validation = errors.array();
          throw error;

        }


        //checkemail ซ้ำ เช็คหลังจากส่งไป db
        //ไปสร้าง midleware error ก่อน
        const existEmail = await Member.findOne({email:email});
        if(existEmail){
           const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานนี้แล้ว');
           error.statusCode = 400;
           throw error;
        }
    
        
        const member = new Member()
            member.email = email,       
            member.name = name,
            member.password = await member.newPassword(password)
          ;
         await member.save();
    
        res.status(200).json({
          message: "register success ",
        });
        
     } catch (error) {
        next(error);
     }



  };





 exports.login = async (req,res,next) =>{
      
  try {
    const {email,password} = req.body;

    //  console.log(password)


    //checkemail ซ้ำ เช็คหลังจากส่งไป db
    //ไปสร้าง midleware error ก่อน
    const member = await Member.findOne({email:email});
    if(!member){
       const error = new Error('ไม่พบผู้ใช้งานนี้');
       error.statusCode = 400;
       throw error;
    }
    // console.log(member.email)
    // console.log(member.password)
    // console.log(password)
   
     //ตรวจสอบว่า password ตรงกันไหม

     const isValidPassword = await member.checkPassword(password);
     console.log(isValidPassword);
   
    
    if(!isValidPassword){
       const error = new Error('รหัสผ่านไม่ถูกต้อง');
       error.statusCode = 401;
       throw error;
      
    }

    //สร้าง token
    const token = await jwt.sign({
      id: member.id,
      role: member.role
    }, config.JWT_SECRET,{expiresIn:'5 day'});   //ไป gen password ที่ https://www.grc.com/passwords.htm

    //decode วันหมดอายุ
    const expire_in = jwt.decode(token)

    return res.status(200).json({
      // message: "Login success ",
      access_token: token,
      expire_in: expire_in.exp,
      token_type: 'Bearer'

    });
    
 } catch (error) {
    next(error);
 }
    


 }


 exports.getprofile = (req, res, next) => {
  console.log(req)
const {_id,name,email,role} = req.member;
console.log(req.member)

    return res.status(200).json({
      member: {
        id:_id,
        name:name,
        email:email,
        role:role
      }
   });
};