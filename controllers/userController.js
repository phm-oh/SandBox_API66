exports.index = (req, res, next) => {
    // res.send('respond with a resss');
    res.status(200).json({
      message: 'Hello Users',
    })
  }

exports.login = (req,res,next) => {
    res.status(200).json({
     message: 'Hello Login',
    })
 }  