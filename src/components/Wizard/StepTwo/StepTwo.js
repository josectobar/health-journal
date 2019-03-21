import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Compose from '../../Entry/Compose'

import axios from 'axios'

import { connect } from 'react-redux'
import { clearIndState, updateIndicators } from '../../../ducks/indicatorsReducer'
import { clearEntry, updateEntries } from '../../../ducks/reducer'

class StepTwo extends Component {

    handleSubmit= async () => {
        const { 
            updateIndicators, 
            updateEntries,
            clearEntry,
            clearIndState,
            blood_pressure_diastolic, 
            blood_pressure_systolic,
            pain_scale, 
            overall_condition, 
            glucose_level,
            entry,
            date 
        } = this.props
        let indicatorsArray = [
            {...blood_pressure_systolic},
            {...blood_pressure_diastolic},
            {...pain_scale},
            {...overall_condition},
            {...glucose_level}
        ]
        if (entry.content==='') {
            return alert('please enter an entry before submitting..')
        }
        entry.date = date
        let dbEntries = await axios.post('/api/entry', entry)
        indicatorsArray = indicatorsArray.filter(obj => obj.reading)
        let dbIndicators = await axios.post('/api/indicators', indicatorsArray)
        updateEntries(dbEntries.data)
        updateIndicators(dbIndicators.data)
        clearEntry()
        clearIndState()
        this.props.history.push('/day/dashboard')
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
    const { 
        glucose_level, 
        blood_pressure_systolic, 
        blood_pressure_diastolic, 
        pain_scale, 
        overall_condition, 
        date
    } = reduxState.indicatorsReducer
    const { entry } = reduxState.reducer
    return {
        blood_pressure_systolic,
        blood_pressure_diastolic,
        pain_scale,
        overall_condition,
        glucose_level,
        entry,
        date
    }
}

const dispatchToProps = {
    clearIndState,
    updateIndicators,
    clearEntry,
    updateEntries
}

export default connect(mapStateToProps, dispatchToProps)(StepTwo)