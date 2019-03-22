import React, { Component } from "react";

//charts:
import MainChart from './MainChart/MainChart'
import GlucoseGraph from './GlucoseGraph/GlucoseGraph'
import BloodPressureGraph from './BloodPressureGraph/BloodPressureGraph'
import StepOne from '../../Wizard/StepOne/StepOne'
import ButtonUI from '../../Button/ButtonUI'

import axios from 'axios'

//Date-pickerjs:
import DatePicker from "react-datepicker";

//redux:
import { updateDate, clearIndState, updateIndicators } from '../../../ducks/indicatorsReducer'
import { connect } from 'react-redux'

class Stats extends Component {
  state ={
    indicatorsToggle: false
  }

  handleToggle = () => {
    this.props.clearIndState()
    this.setState({
      indicatorsToggle: !this.state.indicatorsToggle
    })
  }

  handleSubmit = async () => {
    const { 
      updateIndicators,
      clearIndState,
      blood_pressure_diastolic, 
      blood_pressure_systolic,
      pain_scale, 
      overall_condition, 
      glucose_level
     } = this.props
     let indicatorsArray = [
      {...blood_pressure_systolic},
      {...blood_pressure_diastolic},
      {...pain_scale},
      {...overall_condition},
      {...glucose_level}
    ]
    let dbIndicators = await axios.post('/api/indicators', indicatorsArray)
    dbIndicators = dbIndicators.data.map(indicator => {
      indicator.date = new Date(indicator.date)
      return indicator
    })
    updateIndicators(dbIndicators)
    clearIndState()
    this.handleToggle()
  }

  render() {
    const { date, updateDate } = this.props
    return (
      <div className="stats-container">
        <h1>Indicators</h1>
            {!this.state.indicatorsToggle &&
            <ButtonUI 
              action={this.handleToggle}
              label={'Add indicators'}/>
            }

            {this.state.indicatorsToggle &&
              <>
              <DatePicker
              className="input-effect"
              id="datepicker"
              selected={date}
              onChange={updateDate}
              />
                <StepOne 
                  location={this.props.location}/>
                <div className="button-containers">
                  <ButtonUI 
                  action={this.handleSubmit}
                    color={'secondary'}
                    label={'Submit'}/>
                  <ButtonUI 
                    action={this.handleToggle} 
                    label={'Cancel'} 
                    style={{backgroundColor: 'red'}}/>
                </div>
                </>
            }
          <div className="lower-container">
            <div className="mainchart chart-container">
              <MainChart/>
            </div>
            <div className="chart-container lower-chart">
            <GlucoseGraph 
              className="test" />
            </div>
            <div className="chart-container lower-chart">
            <BloodPressureGraph 
              className="test"/>
            </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { 
    date,
    blood_pressure_diastolic, 
    blood_pressure_systolic,
    pain_scale, 
    overall_condition, 
    glucose_level
   } = reduxState.indicatorsReducer
  return {
    date,
    blood_pressure_diastolic, 
    blood_pressure_systolic,
    pain_scale, 
    overall_condition, 
    glucose_level
  }
}

const mapDispatchToProps = {
  updateDate,
  clearIndState,
  updateIndicators
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
