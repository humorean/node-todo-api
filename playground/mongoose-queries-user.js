const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = "591de740546d4c8a92d0aebd";

if(!ObjectID.isValid(id)){
  console.log(`ID not valid`);
}

User.find({
  _id:id
}).then((users)=>{
  console.log('Users: ', users);
});

User.findOne({
  _id:id
}).then((user)=>{
  console.log('User: ', user);
})

User.findById(id).then((user)=>{
  if(!user){
      return console.log(`User not found`);
  }
  console.log('User by ID: ', user);
}).catch((err)=>{
  console.log(err);
})
