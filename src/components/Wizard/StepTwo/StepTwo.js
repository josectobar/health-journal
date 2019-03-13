import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Compose from '../../Entry/Compose'

import axios from 'axios'

import { connect } from 'react-redux'
import { clearState, updateIndicators } from '../../../ducks/indicatorsReducer'

class StepTwo extends Component {

    handleSubmit= async () => {
        const { updateIndicators, blood_pressure_diastolic, blood_pressure_systolic, pain_scale, overall_condition, glucose_level } = this.props
        let indicatorsArray = [
            {...blood_pressure_systolic},
            {...blood_pressure_diastolic},
            {...pain_scale},
            {...overall_condition},
            {...glucose_level}
        ]
        indicatorsArray = indicatorsArray.filter(obj => obj.reading)
        let dbIndicators = await axios.post('/api/indicators', indicatorsArray)
        updateIndicators(dbIndicators.data)
    }
    render() {
        return (
            <div>
                <h1>StepTwo</h1>
                <div className="wizard-compose">
                    <Compose/>
                </div>
                <Link to="/wizard/stepone">Back</Link>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    const { glucose_level, blood_pressure_systolic, blood_pressure_diastolic, pain_scale, overall_condition} = reduxState.indicatorsReducer

    return {
        blood_pressure_systolic,
        blood_pressure_diastolic,
        pain_scale,
        overall_condition,
        glucose_level
    }
}

const dispatchToProps = {
    clearState,
    updateIndicators
}

export default connect(mapStateToProps, dispatchToProps)(StepTwo)