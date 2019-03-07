import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class StepOne extends Component {
    render() {
        return (
            <div>
                <h1>StepOne</h1>
                <Link 
                    to="/wizard/steptwo">
                    Next
                </Link>
            </div>
        );
    }
}

export default StepOne;