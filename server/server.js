var express = require('express');
var bodyParser = require('body-parser'); //take json and convert into object
var {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app=express();
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

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

//GET /todos/
app.get('/todos/',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },(err)=>{
    res.status(400).send(err)
  })
});

//GET /todos/_id
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  //first validate id
  if(!ObjectID.isValid(id)){
    return res.status(404).send('404 Error.  Make sure your url is correct');
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send('Record not found')
    }
    res.send({todo})
  }).catch((err)=>{
    res.send(err)
  })
})

//REMOVE /todos/:id
app.delete('/todos/:id',(req,res)=>{
  //get the id
  var id = req.params.id;
  //validate id
  if(!ObjectID.isValid(id)){
    return res.status(404).send('404 Error. Make sure your url is correct')
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send(`There is no record for this ID`);
    }

    res.send({todo});
  }).catch((err)=>{
    res.status(400).send(err);
  })
})

app.get('/',(req,res)=>{
  res.send("hello")
})

app.listen(port, ()=>{
  console.log(`Starting server at port ${port}` );
})

module.exports = {app} //export for testing purpose
