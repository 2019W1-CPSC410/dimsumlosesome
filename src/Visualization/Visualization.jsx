import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries, DiscreteColorLegend, LineSeries } from 'react-vis';
import { linearRegression, linearRegressionLine } from 'simple-statistics';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getBestFitLine = (dataPoints) => {
    const pairValues = dataPoints.map((dataPoint) => [dataPoint.x, dataPoint.y]);
    return linearRegressionLine(linearRegression(pairValues));
  }

  processDataForGraph = (data) => {
    const NUM_OF_MILLISECONDS_IN_A_DAY = 86400000;
    /**
     * Process all PRs data by normalizing the creation date values to display on the graph as well as
     * finding the largest values for each axis.
     */
    let processedPRData = { plannedPRs: [], fastPRs: [], largestDayOffsetFromRepoCreation: 0, highestBugCount: 0 };
    let repoCreationMilliseconds = (new Date(data.dateRepoCreated)).getTime();
    // Process the planned PRs:
    for (let i = 0; i < data.plannedPRs.length; i++) {
      let currentPRDayOffsetFromRepoCreation = ((new Date(data.plannedPRs[i].datePRCreated)).getTime() - repoCreationMilliseconds) / NUM_OF_MILLISECONDS_IN_A_DAY;
      let currentBugCount = data.plannedPRs[i].numberOfBugs;
      if (currentPRDayOffsetFromRepoCreation > processedPRData.largestDayOffsetFromRepoCreation) {
        processedPRData.largestDayOffsetFromRepoCreation = currentPRDayOffsetFromRepoCreation;
      }
      if (currentBugCount > processedPRData.highestBugCount) {
        processedPRData.highestBugCount = currentBugCount;
      }
      processedPRData.plannedPRs[i] = { x: currentPRDayOffsetFromRepoCreation, y: currentBugCount };
    }
    // Process the fast PRs:
    for (let i = 0; i < data.fastPRs.length; i++) {
      let currentPRDayOffsetFromRepoCreation = ((new Date(data.fastPRs[i].datePRCreated)).getTime() - repoCreationMilliseconds) / NUM_OF_MILLISECONDS_IN_A_DAY;
      let currentBugCount = data.fastPRs[i].numberOfBugs;
      if (currentPRDayOffsetFromRepoCreation > processedPRData.largestDayOffsetFromRepoCreation) {
        processedPRData.largestDayOffsetFromRepoCreation = currentPRDayOffsetFromRepoCreation;
      }
      if (currentBugCount > processedPRData.highestBugCount) {
        processedPRData.highestBugCount = currentBugCount;
      }
      processedPRData.fastPRs[i] = { x: currentPRDayOffsetFromRepoCreation, y: currentBugCount };
    }
    return processedPRData;
  }

  render() {
    const { data } = this.props;
    const LONG_PLANNED_PR_COLOR = 'black';
    const QUICKLY_WRITTEN_PR = 'red';
    const processedPRData = this.processDataForGraph(data);
    const plannedLongPRsBestFitLine = this.getBestFitLine(processedPRData.plannedPRs);
    const fastPRsBestFitLine = this.getBestFitLine(processedPRData.fastPRs);
    return (
      <div>
        <XYPlot
          width={500}
          height={500}
          xDomain={[0, processedPRData.largestDayOffsetFromRepoCreation]}
          yDomain={[0, processedPRData.highestBugCount]}
        >
          <XAxis title="Days since repository creation" />
          <YAxis title="Number of bugs caused" position="middle" />
          <HorizontalGridLines />
          <VerticalGridLines />
          <MarkSeries
            data={processedPRData.plannedPRs}
            color={LONG_PLANNED_PR_COLOR}
            opacityType="category"
            opacity="1"
          />
          <LineSeries
            color={LONG_PLANNED_PR_COLOR}
            data={[
              { x: 0, y: plannedLongPRsBestFitLine(0) },
              { x: processedPRData.largestDayOffsetFromRepoCreation, y: plannedLongPRsBestFitLine(1) },
            ]}
          />
          <MarkSeries
            data={processedPRData.fastPRs}
            color={QUICKLY_WRITTEN_PR}
            opacityType="category"
            opacity="1"
          />
          <LineSeries
            color={QUICKLY_WRITTEN_PR}
            data={[
              { x: 0, y: fastPRsBestFitLine(0) },
              { x: processedPRData.largestDayOffsetFromRepoCreation, y: fastPRsBestFitLine(1) },
            ]}
          />
        </XYPlot>
        <DiscreteColorLegend
          items={[
            { title: 'Code written quickly', color: QUICKLY_WRITTEN_PR },
            { title: 'Code written after long planning', color: LONG_PLANNED_PR_COLOR },
          ]}
        />
      </div>
    );
  }
}

export default Visualization;
