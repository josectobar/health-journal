import React, { Component } from "react";

//materialUI:
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

//Redux:
import { connect } from "react-redux";
import {
  updateIndicator,
  updateSwitch
} from "../../../ducks/indicatorsReducer";

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};

class PainScale extends Component {

    state = {
      value: 3,
    }

    
    render(){
      const { pain_scale, painSwitch, updateIndicator, updateSwitch } = this.props
      const painScaleDisp = (
          <Paper elevation={2}>
            <div>
              <input
                type="text"
                placeholder="Pain Level"
                value={pain_scale}
                onChange={e =>
                  updateIndicator({ pain_scale: e.target.value })
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
          onChange={() => updateSwitch("painSwitch")}
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