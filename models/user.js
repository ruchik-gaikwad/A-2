const mongoose = require('mongoose');
      mongoose.Promise = global.promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

let emailLengthChecker = (email) => {
       if (!email){
          return false;
        }else {
          if(email.length < 5 || email.length > 30){
                return false;
            }else {
                return true;
             }
        }
   };
let validEmailChecker = (email) =>{
      if(!email){
          return false;
        }else {
          const regExp = new RegExp(/^(([^<>()\[\]\\.,;;\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          return regExp.test(email)
        }
    };
const emailValidators = [{
          validator: emailLengthChecker,
          message: 'Email must be at least 5 charcter but no more than 30'
        },
        {validator: validEmailChecker,
         message: 'Must be a valid e-mail' }];

let usernameLengthchecker = (username) => {
if(!username) {
      return false;
  }else {
          if (username.length < 3 || username.length> 15) {
            return false;
          }else {
            return true;
          }
        }

};

let validUsername = (username) => {
if (!username){
      return false;
    }else {
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
      }
}

const usernameValidators = [{validator: usernameLengthchecker, message: 'Username must be greator than 3 and less than 15' },
                            {validator: validUsername, message: 'Must be Valid Username(should not contain special character)' }]

let passwordLengthChecker = (password) => {
      if(!password){
      return false;
    }else{
        if(password.length < 8 || password.length > 35){

                  return false;
              }else {
                return true;
              }
    }
}

let validPassword = (password) => {
if(!password){
return false;
}else{
const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
  return regExp.test(password);
}
};

const passwordValidators = [{validator : passwordLengthChecker , message:'password must be longer than 8 and less than 35 chacter' },
                            {validator:validPassword, message: 'Must have at least one uppercase, lowercase, special charcter and number' }]


const userSchema = new Schema({
  email : {type: String, required : true, unique : true, lowercase: true, validate: emailValidators},
  username : {type: String, required : true, unique : true, lowercase: true, validate: usernameValidators  },
  password : {type: String, required : true, unique : true, lowercase: true, validate : passwordValidators}
});

userSchema.pre('save', function (next) {
if (!this.isModified('password'))
return next();

 bcrypt.hash(this.password, null,null, function (err,hash) {
  if(err) return next(err);
  this.password = hash;
  next();
  });
});
userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userSchema);
