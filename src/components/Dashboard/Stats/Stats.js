import React, { Component } from "react";

//charts:
import MainChart from './MainChart/MainChart'
import GlucoseGraph from './GlucoseGraph/GlucoseGraph'
import BloodPressureGraph from './BloodPressureGraph/BloodPressureGraph'

class Stats extends Component {
  
  render() {
    return (
      <div>
        <h1>Stats</h1>
        <div className="main-chart">
          <MainChart />
        </div>
        <GlucoseGraph />
        <BloodPressureGraph/>
      </div>
    );
  }
}

export default Stats
