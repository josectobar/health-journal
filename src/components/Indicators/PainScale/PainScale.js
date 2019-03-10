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

function PainScale(props) {
  const { pain_scale, painSwitch } = props;

  const painScaleDisp = (
      <Paper elevation={2}>
        <div>
          <input
            type="text"
            placeholder="Pain Level"
            value={pain_scale}
            onChange={e =>
              props.updateIndicator({ pain_scale: e.target.value })
            }
          />
        </div>
      </Paper>
  );

  return (
    <div className="single-box">
         <h3>Pain Level</h3>
      <Switch
        checked={painSwitch}
        onChange={() => props.updateSwitch("painSwitch")}
        aria-label="Collapse"
      />
      <Grow
        in={painSwitch}
        style={{ transformOrigin: "0 0 0" }}
        {...(painSwitch ? { timeout: 1000 } : {})}
      >
        {painScaleDisp}
      </Grow>
    </div>
  );
}

const mapStateToProps = reduxState => {
  const { pain_scale, painSwitch } = reduxState.indicatorsReducer;
  return {
    pain_scale,
    painSwitch
  };
};

const mapDispatchToProps = {
  updateIndicator,
  updateSwitch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PainScale);