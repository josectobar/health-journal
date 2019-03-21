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
    flexDirection: 'row'
  },
});


class OverallCondition extends Component{

  state = {
    value:``
  }

  handleInput = (value) => {
    const {date, id} = this.props
    this.props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: value, date}})
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    console.log(this.state.value)
  };

  // overallConditionDisp = (
  //     <div>
  //       <div
  //           onClick={() => handleInput(5)}
  //         >
  //           <h5>Excelent</h5>
  //         </div>
  //         <div
  //           onClick={() => handleInput(4)}
  //         >
  //           <h5>Good</h5>
  //         </div>
  //         <div
  //           onClick={() => handleInput(3)}
  //         >
  //           <h5>Normal</h5>
  //         </div>
  //         <div
  //           onClick={() => handleInput(2)}
  //         >
  //           <h5>I've been better</h5>
  //         </div>
  //         <div
  //           onClick={() => handleInput(1)}
  //         >
  //           <h5>Don't ask...</h5>
  //         </div>
  //     </div>
  // );
  
  render(){
    const { classes } = this.props;
    return (
      <div className="single-box">
        <h2>How are you feeling today?</h2>
        {/* {overallConditionDisp} */}
        <FormControl component="fieldset">
          <RadioGroup 
            aria-label="where?"
            name="OverallCondition"
            value={this.state.value}
            onChange={this.handleChange}
            className={classes.group}
          >
            <FormControlLabel value="Excelent" control={<Radio />} label="Excelent" />
            <FormControlLabel value="Good" control={<Radio />} label="Good" />
            <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
            <FormControlLabel value="I've been better" control={<Radio />} label="I've been better" />
            <FormControlLabel value="Don't ask.." control={<Radio />} label="Don't ask.." />
          </RadioGroup>
        </FormControl>
    </div>
  );
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