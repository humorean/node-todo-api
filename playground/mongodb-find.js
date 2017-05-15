const MongoClient = require('mongodb').MongoClient;
//.connect: if TodoApp database doesn't exist, it will create a new one w/ that name
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server'); //use return to break this connect function
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').find().toArray().then((doc)=>{
  //   console.log('Todos Collection:');
  //   console.log(JSON.stringify(doc,undefined,2));
  // },(err)=>{
  //   console.log('Error finding from Todos collection');
  // });

  db.collection('Users').find({name:'Ming'}).toArray().then((res)=>{
    console.log('Users with name = Ming');
    console.log(JSON.stringify(res,undefined,3));
  },(error)=>{
    console.log('Unable to find record', error);
  });

  db.collection('Users').find({name:'Ming'}).count().then((count)=>{
    console.log(`Count of Ming: ${count}`);
  }, (error)=>{
    console.log(error);
  })
});
