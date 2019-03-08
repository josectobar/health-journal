import React, { Component } from 'react';
import { Link } from 'react-router-dom'

//Redux:
import { connect } from 'react-redux'

class StepOne extends Component {

    state = {
        indicators: [],
        overallCondition: true,
        pain_scale: false,
        glucose_level:false,
        blood_presure_systolic: false,
        blood_presure_diastolic: false
    }

    handleOverAll = (e) => {
        // Referemce to overall conditon. Scale 1 - 5. indicatorId = 5
        let date = new Date()
        date = date.toLocaleDateString()
        console.log(e)
        this.setState({
            overallCondition: !this.state.overallCondition,
            indicators: this.state.indicators.push({
                    "user_id": this.props.id,
		            "indicator_id": 5,
		            "reading": e,
		            "date": date
            })
        })
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>StepOne</h1>
                    {this.state.overallCondition &&
                        <div>
                            <h2>How are you feeling today?</h2>
                            <div onClick={() => this.handleOverAll(5)}><h5>Excelent</h5></div>
                            <div onClick={() => this.handleOverAll(4)}><h5>Good</h5></div>
                            <div onClick={() => this.handleOverAll(3)}><h5>Normal</h5></div>
                            <div onClick={() => this.handleOverAll(2)}><h5>I've been better</h5></div>
                            <div onClick={() => this.handleOverAll(1)}><h5>Don't ask...</h5></div>
                        </div>
                    }

                <Link 
                    to="/wizard/steptwo">
                    Next
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    const { id } = reduxState
    return {
        id
    }
}

export default connect(mapStateToProps)(StepOne);