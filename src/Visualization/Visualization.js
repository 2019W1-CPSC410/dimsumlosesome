import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries } from 'react-vis';

class Visualization extends React.Component {
   constructor(props) {
      super(props);
      this.state = { repoCreation: props.data.dateRepoCreated, plannedPRs: props.data.plannedPRs, fastPRs: props.data.fastPRs };
   };

   processDataForGraph(data) {
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
      let processedPRData = this.processDataForGraph(this.props.data);
      return (
         <XYPlot width={400} height={400}
            xDomain={[0, processedPRData.largestDayOffsetFromRepoCreation]} yDomain={[0, processedPRData.highestBugCount]}>
            <XAxis />
            <YAxis />
            <HorizontalGridLines />
            <VerticalGridLines />
            <MarkSeries data={processedPRData.plannedPRs}
               stroke="black"
               opacityType="category"
               opacity="1" />
            <MarkSeries data={processedPRData.fastPRs}
               stroke="red"
               opacityType="category"
               opacity="1" />
         </XYPlot>
      );
   }
}

export default Visualization;