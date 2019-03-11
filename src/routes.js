import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Wizard from './components/Wizard/Wizard'
import Entry from './components/Entry/Entry'

export default (
    <Switch>
        <Route path='/signup' component={SignUp}/>
        <Route path='/day/dashboard' component={Dashboard}/>
        <Route path='/wizard' component={Wizard}/>
        <Route path='/day/entry/:id' component={Entry}/>
        <Route path='/day/new' component={Entry}/>
        <Route path='/' exact component={Login}/>
    </Switch>
)