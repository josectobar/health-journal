import React, { Component } from "react";

//charts:
import MainChart from './MainChart/MainChart'
import GlucoseGraph from './GlucoseGraph/GlucoseGraph'
import BloodPressureGraph from './BloodPressureGraph/BloodPressureGraph'
import StepOne from '../../Wizard/StepOne/StepOne'
import ButtonUI from '../../Button/ButtonUI'

//Date-pickerjs:
import DatePicker from "react-datepicker";

//redux:
import { updateDate, clearIndState } from '../../../ducks/indicatorsReducer'
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
  const { date } = reduxState.indicatorsReducer
  return {
    date
  }
}

const mapDispatchToProps = {
  updateDate,
  clearIndState
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
