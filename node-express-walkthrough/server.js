const express = require('express');
const bodyParser = require('body-parser';)

const app = express();

const PORT = 3030
app.use(bodyParser.json());

const name = [];
const animals = [];
let userId = 0;

app.use('/', (req, res, next) => {
  console.log('Request type:', req.method);
  res.send('<h1>You are the winner</h1>');
  next();
});

app.get('/names/:name', (req,res) => {
  res.send(names[req.params.name] || "User does not exist");
});

app.post('/names', (req, res) => {
  names[req.body.name] = userId;
  userId++;
  res.send(userId);
});

// app.get('/', (req,res) => {
//   console.log('this was a get request');
// });

// app.post('/', (req, res) => {
//   console.log('This was a post request')
// });

app.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
})