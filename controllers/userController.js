const User = require('../models/users');



// exports.index = (req, res, next) => {
//     // res.send('respond with a resss');
//     res.status(200).json({
//       message: 'Hello Users',
//     })
//   }

// exports.login = (req,res,next) => {
//     res.status(200).json({
//      message: 'Hello Login',
//     })
//  } 
 
 exports.index = async (req, res, next) => {
  
  const user = await User.findOne();

  res.status(200).json({
    data: user,
  })
}

// exports.insert = async (req, res, next) => {
  
  

//   res.status(200).json({
//     data: 'post Method',
//   })
// }