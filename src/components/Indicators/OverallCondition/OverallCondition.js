import React from "react";

//Redux:
import { connect } from "react-redux";
import {
  updateIndicator
} from "../../../ducks/indicatorsReducer";

function OverallCondition(props) {

  const overallConditionDisp = (
      <div>
        <div
            onClick={() => props.updateIndicator({ overall_condition: 5 })}
          >
            <h5>Excelent</h5>
          </div>
          <div
            onClick={() => props.updateIndicator({ overall_condition: 4 })}
          >
            <h5>Good</h5>
          </div>
          <div
            onClick={() => props.updateIndicator({ overall_condition: 3 })}
          >
            <h5>Normal</h5>
          </div>
          <div
            onClick={() => props.updateIndicator({ overall_condition: 2 })}
          >
            <h5>I've been better</h5>
          </div>
          <div
            onClick={() => props.updateIndicator({ overall_condition: 1 })}
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

const mapDispatchToProps = {
  updateIndicator
};

export default connect(
  null,
  mapDispatchToProps
)(OverallCondition);