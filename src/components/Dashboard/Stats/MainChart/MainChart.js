import React, { Component } from "react";

//ChartJS:
import { Line } from "react-chartjs-2";

//Redux:
import { connect } from "react-redux";

import { dataGen } from '../../../../utils/Dashboard/statsMethods/dataGen'

class MainChart extends Component {
  state = {
    indicatorsId: [4, 5]
  };

  render() {
    const { indicatorsId } = this.state;
    //Rendering chart:
    
    const chartDisplay = dataGen(indicatorsId, this.props.indicators)

    const data = {
      labels: chartDisplay[0].labels,
      datasets: [
        {
          label: chartDisplay[0].datasets[0].label,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(64, 83, 181, 0.51)",
          borderColor: "rgba(64, 83, 181, 0.79)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(64, 83, 181, 0.79)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(64, 83, 181, 0.79)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartDisplay[0].datasets[0].data
        },
        {
          label: chartDisplay[1].datasets[0].label,
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
          data: chartDisplay[1].datasets[0].data
        }
      ]
    };
    return (
      <>
        <h4>Overall condition & Pain level Average</h4>
        <Line 
          data={data} 
        />
      </>
    )
    
  }
}

const mapStateToProps = reduxState => {
  const { indicators } = reduxState.indicatorsReducer;
  return {
    indicators
  };
};

export default connect(mapStateToProps)(MainChart);
