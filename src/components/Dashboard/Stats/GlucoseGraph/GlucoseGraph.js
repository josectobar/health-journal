import React, { Component } from 'react';
//ChartJS
import {Bar} from 'react-chartjs-2';

//Redux:
import { connect } from "react-redux";

import { dataGen } from '../../../../utils/Dashboard/statsMethods/dataGen'

class GlucoseGraph extends Component{
    state = {
    indicatorId: [1]
    }
    render(){
        const { indicatorId } = this.state;
        //Rendering chart:
        const chartDisplay = dataGen(indicatorId, this.props.indicators)
        const data = {
            labels: chartDisplay[0].labels,
            datasets: [
              {
                label: chartDisplay[0].datasets[0].label,
                backgroundColor: 'rgba(255, 99, 133, 0.349)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1.8,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: chartDisplay[0].datasets[0].data
              }
            ]
        }

        return (
          <div>
            <h4>Glucose level Average</h4>
            <Bar
              data={data}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { indicators } = reduxState.indicatorsReducer;
    return {
      indicators
    };
  };
  
  export default connect(mapStateToProps)(GlucoseGraph);
  