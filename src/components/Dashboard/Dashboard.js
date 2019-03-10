import React, { Component } from 'react';

import axios from 'axios'

//Redux:
import { connect } from 'react-redux'
import { updateEntries } from '../../ducks/reducer';

//Routes:
import { Switch, Route } from 'react-router-dom'
import Stats from './Stats/Stats'
import Articles from './Articles/Articles'

class Dashboard extends Component {

    constructor(){
        super()

        this.handleEntriesRequest = this.handleEntriesRequest.bind(this)
    }

    componentDidMount(){
        this.handleEntriesRequest()
    }

    handleEntriesRequest(){
        const { entries, updateEntries } = this.props
        if (entries.length) {
            
        }
    }

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

const mapStateToProps = (reduxState) => {
    const { entries } = reduxState.reducer
    return {
        entries
    }
}

const dispatchToProps = {
    updateEntries
}

export default connect(mapStateToProps, dispatchToProps)(Dashboard);