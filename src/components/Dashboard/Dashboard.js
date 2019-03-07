import React, { Component } from 'react';

//Routes:
import { Switch, Route } from 'react-router-dom'
import Stats from './Stats/Stats'
import Articles from './Articles/Articles'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/day/dashboard/stats" component={Stats}/>
                    <Route path="/day/dashboard/articles" component={Articles}/>
                </Switch>
                <h1>Dashboard</h1>
                <Stats/>
                <Articles/>
            </div>
        );
    }
}

export default Dashboard;