import React, { Component } from "react";
import { Link } from "react-router-dom";

//SASS:
import "./Stepone.scss"

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
      <div className="main-container">
      { this.props.location.pathname === '/wizard/stepone' &&
        <h1>Let's get started..</h1>
      }
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
      { this.props.location.pathname === '/wizard/stepone' &&
        <Link id="next" to="/wizard/steptwo">Next</Link>
      }
        </div>
    )
  }
}

export default StepOne;
