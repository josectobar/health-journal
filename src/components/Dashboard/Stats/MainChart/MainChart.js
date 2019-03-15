import React from "react";

//ChartJS:
import { Line } from "react-chartjs-2";

import { methods } from "../../../../utils/Dashboard/statsMethods/statsMethods";

//Redux:
import { connect } from "react-redux";

//getMonths is missing here
const { filterIndicator, changeDate, getData } = methods;

function MainChart(props) {
    // const labels = changeDate(props.indicators)
    let overallInd = filterIndicator(changeDate(props.indicators), 5);
    const data = {
        labels: overallInd,
        datasets: [
        {
            label: "Overall Condition",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: getData(overallInd)
        }
        ]
    }
    return (
        <Line data={data} />
    )
}

const mapStateToProps = reduxState => {
  const { indicators } = reduxState.indicatorsReducer;
  return {
    indicators
  };
};

export default connect(mapStateToProps)(MainChart);
