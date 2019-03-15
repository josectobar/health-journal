import React from "react";

//ChartJS:
import { Line } from "react-chartjs-2";

//Redux:
import { connect } from "react-redux";

function MainChart(props) {

  let dataGraph = []
  props.data.map(el => {
      dataGraph.push(
        {
          label: el.datasets[0].label,
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
          data: el.datasets[0].data
      })

  })
  const data = {
    labels: props.data[0].labels
    ,
    datasets: dataGraph
  }
    return (
        <Line data={data}/>
    )
}

const mapStateToProps = reduxState => {
  const { indicators } = reduxState.indicatorsReducer;
  return {
    indicators
  };
};

export default connect(mapStateToProps)(MainChart);
