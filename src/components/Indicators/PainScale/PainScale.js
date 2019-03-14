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
      value: 0,
    }

    handleChange = (event, value) => {
      this.setState({ value });
    }  
    
    render(){
      const { id, date, pain_scale, painSwitch, updateIndicator, updateSwitch } = this.props
      const painScaleDisp = (
          <Paper 
            className="paper-container"
            elevation={2}>
            <div>
              <input
                className="slider-input input-effect"
                value={pain_scale.reading}
                type="number" 
                disabled="true"/>
              <Slider
                className="slider"
                // classes={{ container: classes.slider }}
                value={pain_scale.reading}
                min={0}
                max={10}
                step={1}
                onChange={(event, value) => updateIndicator({pain_scale:{user_id:id, indicator_id: 4, reading: value, date}})}
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
  const { date, pain_scale, painSwitch } = reduxState.indicatorsReducer;
  const { id } = reduxState.reducer
  return {
    id,
    date,
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