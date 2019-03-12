import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Compose from '../../Entry/Compose'

class StepTwo extends Component {
    render() {
        return (
            <div>
                <h1>StepTwo</h1>
                <Compose />
                <Link to="/wizard/stepone">Back</Link>
                <button>Finsh</button>
            </div>
        );
    }
}

export default StepTwo