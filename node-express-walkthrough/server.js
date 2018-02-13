import { read } from 'fs';

const express = require('express');
const bodyParser = require('body-parser';)

const app = express();
const PORT = 3030;
const USER_ERROR = 422;

let users = [];
let id = 0;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const name = req.body.user;
  if (!name) {
    res.status(USER_ERROR);
    res.send("Must provide a user name");
  } else if (typeof user !== 'string') {
    res.status(USER_ERROR);
    res.send("name must be a string");
  } else {
    id++
    users.push([id, name]);
    res.status(200);
    res.send(id + "");
  }
});

app.get('/users', (req, res) => {
  const userNames = users.map(user => user[1]);
  res.status(200);
  res.json(userNames)
});

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (typeof id !== 'number') {
    res.status(USER_ERROR);
    res.send("An id is required as a number");
    return;
  }
  const requestedUser = users.filter(user => {
    return user[0] === id;
  })[0];
  if (requestedUser.length < 1) {
    res.status(USER_ERROR);
    res.send("matching id must be provided");
    return;
  }
  res.status(200);
  res.send(requestedUser[1]);
});

app.get('/search', (req, res) => {
  const  name = req.query.name;
  const matchingUsers = users.filter(user => {
    return user[1] === name;
  });
  res.status(SUCCESS);
  res.json(matchingUsers);
});

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => {
    return user[0] !== id;
  });
  res.status(SUCCESS);
  res.json(users);
})


app.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
})