const express = require('express');

const app = express();
const port = 3000;

var graphDataPoints = [];

app.get('/', (req, res) => {
  res.send('DISPLAY BLANK GRAPH INTIALLY');
});

app.get('/analyze', (req, res) => {
  res.send('POPULATED GRAPH AT SUBMIT');
});

app.listen(port, () => console.log(`app listening on port ${port}`));

//TODO
// app.post()