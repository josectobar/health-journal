import React from 'react'
import axios from 'axios'
import './Wizard.css'

//Routes:
import { Link } from 'react-router-dom'

//Redux:
import { connect } from 'react-redux'
import { updateWizard } from '../../ducks/reducer'
import { updateDate } from '../../ducks/indicatorsReducer'

//Date-pickerjs:
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from 'react-datepicker'

//Wizard routes:
import { Switch, Route } from 'react-router-dom'
import StepOne from './StepOne/StepOne'
import StepTwo from './StepTwo/StepTwo'

 function Wizard(props) {
     const {id, date, updateDate, updateWizard} = props
     let { wizard } = props
    const handleWizardUpdate = async () => {
        wizard = !wizard
        await updateWizard(wizard)
        let toggleWizard = await axios.put('/api/wizard', {wizard, id})
        await updateWizard(toggleWizard.data.wizard)
    }
        return (
            <div>
                <div className="parent-container">
                        <h1>Day</h1>
                    <div>
                        <input type="checkbox" onChange={handleWizardUpdate} checked={wizard}/>
                        <span>Launch wizard at startup</span>
                    </div>
                    <Link to="/day/dashboard">Cancel</Link>
                </div>
                <DatePicker
                        className="wizard-datepicker input-effect"
                        selected={date}
                        onChange={updateDate}/>
                <Switch>
                    <Route path="/wizard/stepone" component={StepOne}/>
                    <Route path="/wizard/steptwo" component={StepTwo}/>
                </Switch>
            </div>
        )
}


const mapStateToProps = ( reduxState ) => {
    const { wizard, id } = reduxState.reducer
    const { date } = reduxState.indicatorsReducer
    return {
        wizard,
        id,
        date
    }
}

const mapDispatchToProps = {
    updateWizard,
    updateDate
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)