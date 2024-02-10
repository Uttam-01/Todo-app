const express = require('express');
const mongoose = require('mongoose');

const {createTodo , updateTodo} = require('./types');
const {todos} = require('./db');
const cors = require("cors");


const app = express();

// Connect to MongoDB


// Add middleware
app.use(express.json());
app.use(cors());

// Set up routes
app.post('/todos', async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if(!parsedPayload.success){
    res.status(411).json({
      msg: "You sent the wrong inputs",
    })
    return;
  }

  await todos.create({
    title: createPayload.title,
    description: createPayload.description,
    iscompleted: false
  });


  res.json({
    message: "todo created sucessfully"
  })

});

app.get('/todos', async (req,res)=> {
  const response = await todos.find({});
  res.json(
    response,
  )
  
});

app.put('/completed',async (req,res)=> {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if(!parsedPayload.success){
    res.status(411).json({
      message: "wrong id sent"
    });
    return;
  }

  await todos.update({
    _id: req.body.id
  }, {
    iscompleted: true  
  })

  res.json({
      msg: "Todo marked as completed"
  }); 
  


  
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
