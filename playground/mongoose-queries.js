const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = "15928765f58d67e43433316f0";

//validate the format of id string
if(!ObjectID.isValid(id)){
  console.log(`ID not valid`);
}

Todo.find({
  _id:id
}).then((todos)=>{
    console.log('Todos', todos);
}); //Find all ID that has matching the given ID string

Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log('Todo', todo);
})  //Finds only one ID, or you can also find by other properties

Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log(`ID not found`);
  }
  console.log('Todo with findById', todo);
}).catch((err)=>{
  console.log(err);
})
 //Finds only one ID, with argument = id
