import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./StepOne.css";

import { connect } from 'react-redux'

//Components:
import Glucose from '../../Indicators/Glucose/Glucose'
import PainScale from '../../Indicators/PainScale/PainScale'
import BloodPressure from '../../Indicators/BloodPressure/BloodPressure'
import OverallCondition from '../../Indicators/OverallCondition/OverallCondition'

class StepOne extends Component {

  render() {
    return (
      <div>
        <h1>StepOne</h1>
          <OverallCondition/>
        <div className="parent-container">
          <PainScale/>
          <Glucose />
          <BloodPressure/>
        </div>
        <Link to="/wizard/steptwo">Next</Link>
      </div>
    )
  }
}

const DispatchToProps = {
  
}

export default connect(null, DispatchToProps)(StepOne);
