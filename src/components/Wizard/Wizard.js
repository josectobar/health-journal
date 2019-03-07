import React from 'react'

//Routes:
import { Link } from 'react-router-dom'

//Wizard routes:
import { Switch, Route } from 'react-router-dom'
import StepOne from './StepOne/StepOne'
import StepTwo from './StepTwo/StepTwo'

export default function Wizard() {
    return (
        <div>
            <Link to="/day/dashboard">Cancel</Link>
            <h1>
                Wizard
            </h1>
            <Switch>
                <Route path="/wizard/stepone" component={StepOne}/>
                <Route path="/wizard/steptwo" component={StepTwo}/>
            </Switch>
        </div>
    )
}