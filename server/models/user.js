var mongoose = require('mongoose');

var User = mongoose.model('User',{
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  }
})

// var newUser = new User({
//   email:'humorean@gmail.com'
// });
// 
// newUser.save().then((res)=>{
//   console.log(res);
// },(err)=>{
//   console.log('Unable to save user',err);
// })

module.exports = {User}
