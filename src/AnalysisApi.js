// import CodeQualityAnalysisTool from './CodeQuality/CodeQualityAnalysisTool';
// const tool = new CodeQualityAnalysisTool();
// tool.getBugsFromFile('https://raw.githubusercontent.com/2019W1-CPSC319/optimize-prime/master/client/src/components/authentication/LoginPage.jsx');

import DataSetBuilder from './DataPipeline/DataSetBuilder'

const owner = "uber";
const repo = "react-map-gl";

let dataSetBuilder = new DataSetBuilder(owner, repo);
dataSetBuilder.addNumberOfBugs();

