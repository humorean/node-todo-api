const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
      return console.log(`Error connecting to TodoApp: ${err}`);
  }

  console.log('Successfully connected to TodoApp');

  //deleteMany => delete all doc that meets the criteria
  // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((res)=>{
  //   console.log(res);
  // },(err)=>{
  //   console.log('Unable to delete');
  // });

  //deleteOne => delete first doc that meets the criteria
  // db.collection('Todos').deleteOne({text:'Do it right'}).then((res)=>{
  //   console.log(res);
  // });

  //findOneAndDelete => delete first doc that meets the criteria and prints out the deleted record
  // db.collection('Todos').findOneAndDelete({text:'Do it right'}).then((res)=>{
  //   console.log('Deleted document:');
  //   console.log(res);
  // }, (err)=>{
  //   console.log('Error connecting to the Todos Document');
  // });

  //Challenge 1 : Delete all users name:Ming in Users collection
  db.collection('Users').deleteMany({name:'Ming'}).then((res)=>{
    console.log(res);
  },(err)=>{
    console.log(err);
  });

  //Challenge 2: Delete one by ID
  db.collection('Users').findOneAndDelete({_id:new ObjectID("59193b7a52a15350ea892d2e")}).then((res)=>{
    console.log(`Deleted the record with Object ID: ${res}`);
  },(err)=>{
    console.log(err);
  });

})
