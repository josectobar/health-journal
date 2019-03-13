import React from "react";

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

function BloodPressure(props) {
  const {
    blood_pressure_systolic,
    blood_pressure_diastolic,
    bloodPresureSwitch,
    id,
    date
  } = props;

  const BloodPressureDisp = (
    <Paper elevation={2}>
      <div
        style={{
          display: "flex",
          padding: "15px",
          justifyContent: "space-around"
        }}
      >
        <input
          type="text"
          value={blood_pressure_systolic.reading}
          onChange={e =>
            props.updateIndicator({blood_pressure_systolic:{user_id:id, indicator_id: 2, reading: +e.target.value, date}})
          }
        />
        <h4>/</h4>
        <input
          type="text"
          value={blood_pressure_diastolic.reading}
          onChange={e =>
            props.updateIndicator({blood_pressure_diastolic:{user_id:id, indicator_id: 3, reading: +e.target.value, date}})
          }
        />
      </div>
    </Paper>
  );

  return (
    
    <div className="single-box">
      <h3>Blood Pressure</h3>
      <Switch
        checked={bloodPresureSwitch}
        onChange={() => props.updateSwitch("bloodPresureSwitch")}
        aria-label="Collapse"
      />
      <Grow
        in={bloodPresureSwitch}
        style={{ transformOrigin: "0 0 0" }}
        {...(bloodPresureSwitch ? { timeout: 1000 } : {})}
      >
        {BloodPressureDisp}
      </Grow>
    </div>
  );
}

const mapStateToProps = reduxState => {
  const {
    blood_pressure_systolic,
    blood_pressure_diastolic,
    bloodPresureSwitch,
    date
  } = reduxState.indicatorsReducer;
  const { id } = reduxState.reducer
  return {
    date,
    id,
    blood_pressure_systolic,
    blood_pressure_diastolic,
    bloodPresureSwitch
  }
}

const mapDispatchToProps = {
  updateIndicator,
  updateSwitch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BloodPressure);
