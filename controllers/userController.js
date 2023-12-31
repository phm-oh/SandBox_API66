const User = require("../models/users");

// exports.index = (req, res, next) => {
//     // res.send('respond with a resss');
//     res.status(200).json({
//       message: 'Hello Users',
//     })
//   }

exports.login = (req, res, next) => {
  res.status(200).json({
    message: "Hello Login",
  });
};

exports.index = async (req, res, next) => {
  // const user = await User.find();
  const user = await User.find().sort({ _id: -1 }); // มากไปน้อย

  res.status(200).json({
    data: user,
  });
};

exports.insert = async (req, res, next) => {
  const { email, username, password } = req.body;

  // let user = new User(req.body);

  let user = new User({
    email: email,
    username: username,
    password: password,
  });

  await user.save();

  res.status(200).json({
    message: "เพิ่มข้อมูลเรียบร้อย",
  });
};

exports.userbyid = async (req, res, next) => {
  // const {id} = req.params;
  // const user = await User.findOne({
  //   _id: id
  // });
  // const user = await User.findById(id);
  // res.status(200).json({
  //   data:  user,
  // })

  try {
    const { id } = req.params;
    const user = await User.findById(id);

    //ในกรณีที่หา id ไม่เจอ
    if (!user) {
      
      throw new Error('ไม่พบผู้ใช้งาน');
    }

    res.status(200).json({
      data: user,
    });

  } catch (error) {
    res.status(400).json({
        error:{
          message: 'เกิดข้อผิดพลาด' + error.message , 
        }
    });

    
  }
};



exports.deleteuserbyid = async (req, res, next) => {


  try {
    const { id } = req.params;
    const user = await User.deleteOne({_id:id});

    //ในกรณีที่หา id ไม่เจอ
    if (user.deletedCount === 0) {
      
      throw new Error('ไม่สามารถลบข้อมูล');
    } else{
      res.status(200).json({
        data: {
          message:`ลบข้อมูลผู้ใช้ ${id} สำเร็จ` ,
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



exports.updateuserbyid = async (req, res, next) => {


  try {
    const { id } = req.params;
    const { email, username, password } = req.body;
    //แบบืั้ 1
    //กรณีนี้ต้องส่ง อินสแตนไปให้ครบ ไม่งั้นข้อมูลที่ไม่ส่งไปจะหายจาก db
    // const user = await User.findById(id);
    // user.email = email;
    // user.username = username;
    // user.password = password;
    // await user.save();


    //แบบที่ 2
    const user = await User.findByIdAndUpdate(id,{
      email:email,
      username:username,
      password:password
    })
    console.log(user);

      res.status(200).json({
        data: {
          message:`แก้ไขข้อมูลผู้ใช้ ${id} สำเร็จ` ,
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