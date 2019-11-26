const express = require('express');

const app = express();
const port = 3010;
const cors = require('cors');

const { Analyzer } = require('../libs/Analyzer');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('empty graph');
});

app.get('/analyze', async (req, res) => {
  const { owner, repo, value } = req.query;
  const analyzer = new Analyzer(owner, repo, value);
  const response = await analyzer.getDataPoints();
  res.send(response);
});


app.listen(port, () => console.log(`app listening on port ${port}`));

module.exports = app;
