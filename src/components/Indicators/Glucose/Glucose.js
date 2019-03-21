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
  const { id, date, glucose_level, updateIndicator, glucoseSwitch } = props;

  const glucoseDisp = (
    <Paper 
      className="paper-container"
      elevation={2}>
        <input
          className="glucose-input input-effect"
          type="text"
          placeholder="Glucose"
          value={glucose_level.reading}
          onClick={e => e.target.value=''}
          onChange={e =>
            updateIndicator({glucose_level:{user_id:id, indicator_id: 1, reading: +e.target.value, date}})
          }
        />
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
  const { date, glucose_level, glucoseSwitch } = reduxState.indicatorsReducer
  const { id } = reduxState.reducer
  return {
    date,
    id,
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
