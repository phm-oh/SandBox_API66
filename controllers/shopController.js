exports.index = (req, res, next) => {
    // res.send('respond with a resss');
    res.status(200).json({
      data:{
        name: 'OMG Cafe',
        address: {
            province: 'udonthani',
            image: 'https://images.unsplash.com/photo-1682778418768-16081e4470a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
        }
      }
    })
  }