const member = require("../models/members");
const Member = require("../models/members");


// exports.index = (req, res, next) => {
//     // res.send('respond with a resss');
//     res.status(200).json({
//       message: 'Hello Users',
//     })
//   }

exports.letmein = async(req, res, next) => {

    const member = await Member.find();

  res.status(200).json({
    data: member,
  });
};


exports.register = async (req, res, next) => {
   
     try {
        const {name,email,password} = req.body;

        //checkemail ซ้ำ
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