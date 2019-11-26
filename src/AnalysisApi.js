// import CodeQualityAnalysisTool from './CodeQuality/CodeQualityAnalysisTool';
// const tool = new CodeQualityAnalysisTool();
// tool.getBugsFromFile('https://raw.githubusercontent.com/2019W1-CPSC319/optimize-prime/master/client/src/components/authentication/LoginPage.jsx');

const { Analyzer } = require('./libs/Analyzer');

const owner = "uber";
const repo = "react-map-gl";

const analyzer = new Analyzer(owner, repo);
analyzer.getDataPoints().then(data => {
  console.log('Repo Information: ', data);
}).catch((err) => {
  console.log(err);
});;
