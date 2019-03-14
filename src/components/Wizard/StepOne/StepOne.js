import React, { Component } from "react";
import { Link } from "react-router-dom";

//SASS:
import "./Stepone.scss"

//redux:
import { connect } from 'react-redux'

//MaterialUI:
import Paper from "@material-ui/core/Paper";

//Components:
import Glucose from '../../Indicators/Glucose/Glucose'
import PainScale from '../../Indicators/PainScale/PainScale'
import BloodPressure from '../../Indicators/BloodPressure/BloodPressure'
import OverallCondition from '../../Indicators/OverallCondition/OverallCondition'

class StepOne extends Component {

  render() {
    return (
      <>
      <h1>StepOne</h1>
      <div className="step-one-main">
        <Paper className="overall-condition-container" elevation={1}>
          <OverallCondition/>
        </Paper>
        <div className="indicators-container">
          <PainScale/>
          <Glucose />
          <BloodPressure/>
        </div>
      </div>
        <Link to="/wizard/steptwo">Next</Link>
        </>
    )
  }
}

const DispatchToProps = {
  
}

export default connect(null, DispatchToProps)(StepOne);
