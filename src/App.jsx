import React from 'react';
import LinkComponent from './components/LinkComponent';
import Data from "./Visualization/MockData";
import Visualization from "./Visualization/Visualization";

const App = () => {
  return (
    <div>
      <LinkComponent />
        <Visualization data={Data} />
    </div>
  );
}

export default App;
