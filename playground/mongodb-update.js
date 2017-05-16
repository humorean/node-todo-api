const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
      return console.log('Unable to connect to mongodb TodoApp');
  }

  console.log('Successfully connected to TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id:new ObjectID("59193989908bd450e20d3e1b")
  // },{
  //   set:{completed:true}
  //
  // },{
  //   returnOriginal:false
  // }).then((res)=>{
  //   console.log(res);
  // }, (err)=>{
  //   console.log(err);
  // })

  db.collection('Users').findOneAndUpdate(
    {name:'Jenny'},
    {
      $set:{name:'Ming'},
      $inc:{age:1}
    },
    {returnOriginal:false}
  ).then((res)=>{
    console.log(JSON.stringify(res,undefined,2));
  })
})
