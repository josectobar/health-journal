import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Step1 extends Component {
    render() {
        return (
            <div>
                <h1>Step1</h1>
                <Link 
                    to="/wizard/steptwo">
                    Next
                </Link>
            </div>
        );
    }
}

export default Step1;