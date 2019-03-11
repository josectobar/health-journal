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
        this.handleEntryView = this.handleEntryView.bind(this)
    }

    componentDidMount(){
        this.handleEntriesRequest()
    }

    async handleEntriesRequest(){
        const { entries, updateEntries } = this.props
        if (!entries.length) {
           let entries = await axios.get('/api/entries')
           updateEntries(entries.data)
        }
    }

    handleEntryView(id){
        this.props.history.push(`/day/entry/${id}`)
    }

    render() {
        const displayEntries = this.props.entries.map(entry => {
            const {id, title, date} = entry
            return (
                <div key={id} onClick={() =>this.handleEntryView(id)}>
                    <p>{title}</p>
                    <p>{date}</p>
                </div>
            )
        })
        return (
            <div>
                <Switch>
                    <Route path="/day/dashboard/stats" component={Stats}/>
                    <Route path="/day/dashboard/articles" component={Articles}/>
                </Switch>
                <h1>Dashboard</h1>
                <Stats/>
                <Articles/>
                <div>
                    {displayEntries}
                </div>
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