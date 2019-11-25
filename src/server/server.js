const express = require('express');

const app = express();
const port = 3010;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('empty graph');
});

app.post('/analyze', (req, res) => {
  const { owner } = req.body;
  const { repo } = req.body;
  // console.log(owner);
  // console.log(repo);
  //TODO: call analysis
  res.json(
    {
      dateRepoCreated: '2019-11-02T13:15:45.000-08:00',
      plannedPRs: [
        {
          datePRCreated: '2019-11-22T08:23:45.000-08:00',
          numberOfBugs: 24,
        },
        {
          datePRCreated: '2019-11-21T13:34:45.000-08:00',
          numberOfBugs: 2,
        },
        {
          datePRCreated: '2019-12-22T08:23:45.000-08:00',
          numberOfBugs: 54,
        },
        {
          datePRCreated: '2019-11-15T13:34:45.000-08:00',
          numberOfBugs: 22,
        },
        {
          datePRCreated: '2019-11-18T08:23:45.000-08:00',
          numberOfBugs: 43,
        },
        {
          datePRCreated: '2019-11-22T13:34:45.000-08:00',
          numberOfBugs: 21,
        },
        {
          datePRCreated: '2019-12-15T13:34:45.000-08:00',
          numberOfBugs: 1,
        },
        {
          datePRCreated: '2020-01-18T08:23:45.000-08:00',
          numberOfBugs: 5,
        },
        {
          datePRCreated: '2019-12-03T13:34:45.000-08:00',
          numberOfBugs: 12,
        },
      ],
      fastPRs: [
        {
          datePRCreated: '2019-11-24T13:15:45.000-08:00',
          numberOfBugs: 3,
        },
        {
          datePRCreated: '2019-11-19T16:15:45.000-08:00',
          numberOfBugs: 11,
        },
        {
          datePRCreated: '2019-11-22T13:15:45.000-08:00',
          numberOfBugs: 8,
        },
        {
          datePRCreated: '2019-11-29T16:15:45.000-08:00',
          numberOfBugs: 11,
        },
        {
          datePRCreated: '2019-11-28T13:15:45.000-08:00',
          numberOfBugs: 3,
        },
        {
          datePRCreated: '2019-11-19T15:15:45.000-08:00',
          numberOfBugs: 11,
        },
      ],
    },
  );
});


app.listen(port, () => console.log(`app listening on port ${port}`));

module.exports = app;
