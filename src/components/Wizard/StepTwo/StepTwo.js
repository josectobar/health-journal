import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Step2 extends Component {
    render() {
        return (
            <div>
                <h1>Step2</h1>
                <Link to="/wizard/stepone">Back</Link>
            </div>
        );
    }
}

export default Step2;