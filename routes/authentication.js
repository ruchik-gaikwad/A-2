const User = require('../models/user')


module.exports = (router) => {

router.post('/register', (req, res) => {

if (!req.body.email) {
res.json({success : false, message: 'You Must Provide an email'})
}else {
   if(!req.body.username){
     res.json({success : false, message: 'You Must Provide an username'})

     }else {
          if(!req.body.password) {
            res.json({success : false, message: 'You Must Provide an password'})

          }else {

              let user = new User({
                  email: req.body.email.toLowerCase(),
                  username: req.body.username.toLowerCase(),
                  password: req.body.password
              });
              user.save((err) => {
                  if (err) {
                   if (err.code === 11000) {
                    res.json({success : false, message: 'Username or Email Already exists'});

                   }else {
                     res.json({success : false, message: 'User Cannot be Saved, Error:', err});
                        }


                  }else {
                    res.json({success: true, message: 'User Saved'})
                  }
              })


         }
      }
     }
    });
            return router;
  }
