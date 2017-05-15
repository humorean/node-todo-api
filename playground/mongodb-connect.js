const MongoClient = require('mongodb').MongoClient;
//.connect: if TodoApp database doesn't exist, it will create a new one w/ that name
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server'); //use return to break this connect function
  }

  console.log('Connected to MongoDB server');
  db.collection('Todos').insertOne({
    text:'Something to do',
    completed:'false'
  },(error,result)=>{
    if(err){
      return console.log('Unable to insert todo',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2) + ' successfully added');
  })

  db.close();
});

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to TodoApp Database');
  }
  console.log('Successfully connected to TodoApp Database');
  db.collection('Users').insertOne({
    name:'Ming',
    age:'31',
    location:94601
  },(error,result)=>{
    if(err){
      return console.log('Unable to insert user' ,err);
    }
    console.log(JSON.stringify(result.ops,undefined,2) + 'Successfully added');
  })
})
