import React, { Component } from 'react';

//ChartJS:
import { Line } from 'react-chartjs-2'

//Lodash:
import _ from 'lodash'

//Redux:
import { connect } from 'react-redux'

const  setIndicators = (indicators) => {
    let indicatorsWithMonth = _.map(this.props.indicators, (indicator) => {
        let { date } = indicator
        date = new Date(date)
        date = date.toLocaleString('en-us', {month:'long'})
        indicator.date = date
        return indicator
    })

}


class Stats extends Component {

    

    render() {
        // indicatorsWithMonth = _.chain(indicatorsWithMonth)
        //                         .groupBy('date')
        //                         .map((indicator) => {
        //                             let {indicator_id, date, reading } = indicator
        //                             return {
        //                                 indicator_id,
        //                                 date,
        //                                 reading: _.chain(reading)
        //                                           .map('reading')
        //                                           .reduce((acc, val)=>  acc + val )
        //                                           .value()/reading
                                                
        //                             }})
        //                         .value()
                                
        // console.log(indicatorsWithMonth)
        // const overall_condition = _.filter(indicatorsWithMonth, (indicator) => indicator.indicator_id === 5)

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
        ]
    };
        return (
            <div>
                <h1>Stats</h1>
                <Line data={data} />
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    const { indicators } = reduxState.indicatorsReducer
    return {
        indicators
    }
}

export default connect(mapStateToProps)(Stats);