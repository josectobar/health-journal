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

function Glucose(props) {
  const { glucose_level, glucoseSwitch } = props;

  const glucoseDisp = (
    <Paper elevation={2}>
      <div>
        <input
          type="text"
          placeholder="Enter glucose level"
          value={glucose_level}
          onChange={e =>
            props.updateIndicator({ glucose_level: +e.target.value })
          }
        />
      </div>
    </Paper>
  );

  return (
    <div className="single-box">
      <h3>Glucose</h3>
      <Switch
        checked={glucoseSwitch}
        onChange={() => props.updateSwitch("glucoseSwitch")}
        aria-label="Collapse"
      />
      <Grow
        in={glucoseSwitch}
        style={{ transformOrigin: "0 0 0" }}
        {...(glucoseSwitch ? { timeout: 1000 } : {})}
      >
        {glucoseDisp}
      </Grow>
    </div>
  );
}

const mapStateToProps = reduxState => {
  const { glucose_level, glucoseSwitch } = reduxState.indicatorsReducer;
  return {
    glucose_level,
    glucoseSwitch
  };
};

const mapDispatchToProps = {
  updateIndicator,
  updateSwitch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Glucose);
