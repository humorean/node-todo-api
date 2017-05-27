const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//return the total number of results
// Todo.remove({}).then((result)=>{
//   console.log(result);
// })

//return the result of the record
// Todo.findOneAndRemove({
//   text:"Something to dos"
// }).then((result)=>{
//   if(!result){
//     return console.log(`Given criteria not found in record`);
//   }
//   console.log(result);
// }).catch((err)=>{
//   console.log(err);
// })

Todo.findByIdAndRemove('5929afb37426bca07a05e37b').then((result)=>{
  if(!result){
    return console.log(`Given criteria not found in record`);
  }
  console.log(result);
}).catch((err)=>{
  console.log(err);
})
