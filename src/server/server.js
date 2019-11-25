var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3010;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// var graphDataPoints = [];

app.get('/', (req, res) => {
  res.send('empty graph');
});

app.post('/analyze', (req, res) => {
  let owner = req.body.owner;
  let repo = req.body.repo;
  console.log(owner);
  console.log(repo);
  res.send('IN POST');
});

app.listen(port, () => console.log(`app listening on port ${port}`));

module.exports = app;
