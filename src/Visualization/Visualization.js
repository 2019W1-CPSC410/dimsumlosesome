import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries, LineSeries } from 'react-vis';

class Visualization extends React.Component {
   constructor(props) {
      super(props);
      this.state = { repositoryData: props.data.Repository, pullRequestsData: props.data.PullRequests };
   };

   findLatestTimestampNormalized() {
      const { pullRequestsData, repositoryData } = this.state;
      let repoCreationTimestampt = new Date(repositoryData.created_at).getTime();
      let latestTimestamp = repoCreationTimestampt;
      for (var i = 0; i < pullRequestsData.length; i++) {
         let currentTimestamp = new Date(pullRequestsData[i].created_at).getTime();
         if (currentTimestamp > latestTimestamp) {
            latestTimestamp = currentTimestamp;
         }
      }
      return latestTimestamp - repoCreationTimestampt;
   }

   render() {
      this.findLatestTimestampNormalized();
      // TODO RUBEN CONTINUE HERE - CONTINUE IMPLEMENTING DATA VISUALIZATION OF MOCK DATA
      return (
         <XYPlot width={400} height={400}
            xDomain={[0, 20]} yDomain={[0, 20]}><XAxis /><YAxis />
            <HorizontalGridLines />
            <VerticalGridLines />
            <MarkSeries data={new Array(200).fill(0).reduce((prev, curr) => [...prev, {
               x: Math.random() * 20,
               y: Math.random() * 20
            }], [])} stroke="white"
               opacityType="category"
               opacity="0.2" />
         </XYPlot>
      );
   }
}

export default Visualization;