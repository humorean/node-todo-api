const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const{ObjectID} = require('mongodb');

const todos = [{
  _id:new ObjectID(),
  text:'first test todo'
},{
  _id:new ObjectID(),
  text:'second test todo'
}]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=>done()); //wipe all todos
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        //make request to db to make sure the record is updated
        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err)=> done(err));
      })
  });

  it('should not create todo with invalid body data',(done)=>{
    //length todos is zero
    request(app)
      .post('/todos')
      .send("")
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((err)=>done(err));
      })
  })
})

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done)
  })
})

describe('GET /todos/:id', ()=>{
  it('should return todo doc',(done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  })

  it('should return 404 if todo not found',(done)=>{
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 for non-object ids',(done)=>{
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done)
  })
})

describe('Delete /todos/:id',()=>{
  it('should remove a todo',(done)=>{
    var hexId=todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        //Make sure the deleted record does not exist anymore
        Todo.findById(hexId).then((todo)=>{
          expect(todo).toNotExist();
          done();
        }).catch((e)=>done(e));
      })
  });

  it('should return 404 if todo not found',(done)=>{
    var hexId = new ObjectID;
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid',(done)=>{
    var someID = "12345";
    request(app)
      .delete(`/todos/${someID}`)
      .expect(404)
      .end(done);
  })
})
