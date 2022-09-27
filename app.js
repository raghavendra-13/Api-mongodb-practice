const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/RestAPI_aaa', () => console.log('connected to db')
);


app.use(express.json())




app.get('/', (req, res) => {
    res.send("Hello we are here");
})
let users = [{
    name: 'th',
    id: 1
},
{
    name: 'jh',
    id: 2
}]


app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.filter(u=>u.id===id)[0];
    if (user) {
        res.send(user)
    } else {
        res.status(404).send({error: "User does not exist"})
    }
    
})

app.post('/adduser', (req, res) => {
    console.log("req.body", req.body);
    const id = users.length + 1;

    const payload = {
        ...req.body,
        id:id
    }
    users.push(payload)
res.send(payload);
  
})
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    
    const index= users.findIndex(u=>u.id===id);
    if (index < 0) {
        res.status(404).send({error:"user does not exist"})
    }
    const name = req.body.name;
    users[index].name = name;


    res.send(users[index])
})


app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const index= users.findIndex(u=>u.id===id);
    if (index < 0) {
        res.status(404).send({error:"user does not exist"})
    }
    users=users.filter(u=>u.id!==id);
    res.status(200).send("User deleted");
})



