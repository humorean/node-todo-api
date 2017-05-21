var express = require('express');
var bodyParser = require('body-parser'); //take json and convert into object

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app=express();
app.use(bodyParser.json());

var port = 3000;

//POST
app.post('/todos',(req,res)=>{
  // console.log(req.body);
  var todo = new Todo({
    text:req.body.text //the bodyParser is used here.
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err)
  });
});

//GET
app.get('/todos',(req,res)=>{
  // console.log(res)
})

app.get('/',(req,res)=>{
  res.send("hello")
})

app.listen(port, ()=>{
  console.log(`Starting server at port ${port}` );
})

module.exports = {app}
