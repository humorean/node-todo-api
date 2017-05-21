var mongoose =require('mongoose');

var Todo = mongoose.model('Todo',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:false //trims the leading and trailing spaces
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:String,
    default:null
  }
})

module.exports={Todo}
