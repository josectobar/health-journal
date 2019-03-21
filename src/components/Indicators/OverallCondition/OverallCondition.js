import React, {Component} from "react";

//Redux:
import { connect } from "react-redux";
import {
  updateIndicator
} from "../../../ducks/indicatorsReducer";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'


const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,

  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center'
  },
});


class OverallCondition extends Component{

  state = {
    value:``
  }

  handleInput = (event) => {
    const {date, id} = this.props
    const { value } = event.target
    this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: 5, date}})
  }
  
  handleConvToNum =(event) => {
    const {date, id} = this.props
    const { value } = event.target
    switch (value) {
      case "Excellent":
      return this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: 5, date}})
      case "Good":
      return this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: 4, date}})
      case "Normal":
      return this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: 3, date}})
      case "I've been better":
      return this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: 2, date}})
      case "Don't ask..":
      return this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: 1, date}})
      default:
      return this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: 0, date}})
    }
  }

  handleConvToStr = () => {
    const { reading } = this.props.overall_condition
    switch (reading) {
      case 5:
      return "Excellent"
      case 4:
      return "Good"
      case 3:
      return "Normal"
      case 2:
      return "I've been better"
      case 1:
      return "Don't ask.."
      default:
      return null
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    console.log(this.state.value)
  };

  render(){
    const { classes } = this.props;
    return (
      <>
        <h2>How are you feeling today?</h2>
        <FormControl 
          className={classes.formControl}
          component="fieldset">
          <RadioGroup 
            aria-label="Overall Condition"
            name="OverallCondition"
            value={this.handleConvToStr()}
            onChange={this.handleConvToNum}
            className={classes.group}
          >
            <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
            <FormControlLabel value="Good" control={<Radio />} label="Good" />
            <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
            <FormControlLabel value="I've been better" control={<Radio />} label="I've been better" />
            <FormControlLabel value="Don't ask.." control={<Radio />} label="Don't ask.." />
          </RadioGroup>
        </FormControl>
    </>
  )
}
}

OverallCondition.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (reduxState) => {
  const { overall_condition, date} = reduxState.indicatorsReducer
  const { id } = reduxState.reducer
  return {
    id,
    overall_condition,
    date
  }
}

const mapDispatchToProps = {
  updateIndicator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OverallCondition));