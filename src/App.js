import React from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from './Visualization/Visualization';
import Data from "./Visualization/MockData.json";

function App() {
  return (
    <div>
      <Visualization data={Data} />
    </div>

  );
}

export default App;
