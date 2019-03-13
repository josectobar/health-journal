import React from "react";

//Redux:
import { connect } from "react-redux";
import {
  updateIndicator
} from "../../../ducks/indicatorsReducer";

function OverallCondition(props) {

  const handleInput = (value) => {
    const {date, id} = props
    console.log(props);
    
    props.updateIndicator({overall_condition:{user_id:id, indicator_id: 5, reading: value, date}})
  }

  const overallConditionDisp = (
      <div>
        <div
            onClick={() => handleInput(5)}
          >
            <h5>Excelent</h5>
          </div>
          <div
            onClick={() => handleInput(4)}
          >
            <h5>Good</h5>
          </div>
          <div
            onClick={() => handleInput(3)}
          >
            <h5>Normal</h5>
          </div>
          <div
            onClick={() => handleInput(2)}
          >
            <h5>I've been better</h5>
          </div>
          <div
            onClick={() => handleInput(1)}
          >
            <h5>Don't ask...</h5>
          </div>
      </div>
  );

  return (
    <div className="single-box">
        <h2>How are you feeling today?</h2>
        {overallConditionDisp}
    </div>
  );
}

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
)(OverallCondition);