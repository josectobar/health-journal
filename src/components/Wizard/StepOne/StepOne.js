import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./StepOne.css";

//materialUI:
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";

//Redux:
import { connect } from "react-redux";
import {
  updateIndicator,
  updateSwitch
} from "../../../ducks/indicatorsReducer";

//MaterialUI

class StepOne extends Component {
  state = {
    indicators: []
  };

  toggleView = e => {
    this.setState({
      [e]: !this.state[e]
    });
  };

  dateGen() {
    let date = new Date();
    return (date = date.toLocaleDateString());
  }

  render() {
    //materialUI
    const {
      glucose_level,
      blood_pressure_systolic,
      blood_pressure_diastolic,
      pain_scale,
      overall_condition,
      painSwitch,
      glucoseSwitch,
      bloodPresureSwitch
    } = this.props.indicatorsReducer;

    const painScaleDisp = <Paper elevation={2} />;
    const glucoseDisp = (
      <Paper elevation={2}>
        <div>
          <input
            type="text"
            placeholder="Enter glucose level"
            value={glucose_level}
            onChange={e =>
              this.props.updateIndicator({ glucose_level: e.target.value })
            }
          />
        </div>
      </Paper>
    );
    const BloodPressureDisp = (
      <Paper elevation={2}>
        <div
          style={{
            display: "flex",
            padding: "15px",
            justifyContent: "space-around"
          }}
        >
          <input type="text" onChange={e => this.props.updateIndicator({blood_pressure_systolic: blood_pressure_systolic})}/>
          <h4>/</h4>
          <input type="text" onChange={e => this.props.updateIndicator({blood_pressure_diastolic: blood_pressure_diastolic})}/>
        </div>
      </Paper>
    );
    return (
      <div>
        <h1>StepOne</h1>
        <h2>How are you feeling today?</h2>
        <div className="parent-container">
          <div
            onClick={() => this.props.updateIndicator({ overall_condition: 5 })}
          >
            <h5>Excelent</h5>
          </div>
          <div
            onClick={() => this.props.updateIndicator({ overall_condition: 4 })}
          >
            <h5>Good</h5>
          </div>
          <div
            onClick={() => this.props.updateIndicator({ overall_condition: 3 })}
          >
            <h5>Normal</h5>
          </div>
          <div
            onClick={() => this.props.updateIndicator({ overall_condition: 2 })}
          >
            <h5>I've been better</h5>
          </div>
          <div
            onClick={() => this.props.updateIndicator({ overall_condition: 1 })}
          >
            <h5>Don't ask...</h5>
          </div>
        </div>
        {/*-------------------------------Switches --------------------------------*/}
        <div className="parent-container">
          <div className="single-toggle">
            <h3>Pain condition</h3>
            <Switch
              checked={painSwitch}
              onChange={() => this.props.updateSwitch("painSwitch")}
              aria-label="Collapse"
            />
          </div>
          <div className="single-toggle">
            <h3>Glucose</h3>
            <Switch
              checked={glucoseSwitch}
              onChange={() => this.props.updateSwitch("glucoseSwitch")}
              aria-label="Collapse"
            />
          </div>
          <div className="single-toggle">
            <h3>Blood Pressure</h3>
            <Switch
              checked={bloodPresureSwitch}
              onChange={() => this.props.updateSwitch("bloodPresureSwitch")}
              aria-label="Collapse"
            />
          </div>
        </div>
        {/*------------------------------Indicators Render-----------------------------*/}
        <div className="parent-container">
          <div className="single-box">
            <Grow
              in={painSwitch}
              style={{ transformOrigin: "0 0 0" }}
              {...(painSwitch ? { timeout: 1000 } : {})}
            >
              {painScaleDisp}
            </Grow>
          </div>
          <div className="single-box">
            <Grow
              in={glucoseSwitch}
              style={{ transformOrigin: "0 0 0" }}
              {...(glucoseSwitch ? { timeout: 1000 } : {})}
            >
              {glucoseDisp}
            </Grow>
          </div>
          <div className="single-box">
            <Grow in={bloodPresureSwitch}>{BloodPressureDisp}</Grow>
          </div>
        </div>
        <Link to="/wizard/steptwo">Next</Link>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { indicatorsReducer } = reduxState;
  const { id } = reduxState;
  return {
    indicatorsReducer,
    id
  };
};

const mapDispatchToProps = {
  updateIndicator,
  updateSwitch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepOne);
