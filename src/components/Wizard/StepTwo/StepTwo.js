import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Entry from '../../Entry/Entry'

class StepTwo extends Component {
    render() {
        return (
            <div>
                <h1>StepTwo</h1>
                <Entry />
                <Link to="/wizard/stepone">Back</Link>
            </div>
        );
    }
}

export default StepTwo;