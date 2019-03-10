import React from 'react'
import axios from 'axios'
import './Wizard.css'

//Routes:
import { Link } from 'react-router-dom'

//Redux:
import { connect } from 'react-redux'
import { updateWizard } from '../../ducks/reducer'

//Wizard routes:
import { Switch, Route } from 'react-router-dom'
import StepOne from './StepOne/StepOne'
import StepTwo from './StepTwo/StepTwo'

 function Wizard(props) {
    const handleWizardUpdate = async () => {
        let { wizard, id } = props
        wizard = !wizard
        let toggleWizard = await axios.put('/api/wizard', {wizard, id})
        await props.updateWizard(toggleWizard.data.wizard)
    }
    
    return (
        <div>
            <div className="parent-container">
                    <h1>Day</h1>
                <div>
                    <input type="checkbox" onChange={handleWizardUpdate} checked={props.wizard}/>
                    <span>Launch wizard at startup</span>
                </div>
                <Link to="/day/dashboard">Cancel</Link>
            </div>
            <Switch>
                <Route path="/wizard/stepone" component={StepOne}/>
                <Route path="/wizard/steptwo" component={StepTwo}/>
            </Switch>
        </div>
    )
}


const mapStateToProps = ( reduxState ) => {
    const { wizard, id } = reduxState.reducer
    return {
        wizard,
        id
    }
}

const mapDispatchToProps = {
    updateWizard
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)