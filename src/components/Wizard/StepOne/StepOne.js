import React, { Component } from 'react';
import { Link } from 'react-router-dom'

//Redux:
import { connect } from 'react-redux'

class StepOne extends Component {

    state = {
        indicators: [],
        overallCondition: true,
        painScale: false,
        glucoseLevel:false,
        bloodPresure: false
    }

    toggleView(e){
        console.log(this.state);
        
        this.setState({
            [e]:!this.state.e
        })
    }

    handleOverAll = (e) => {
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
                <h2 onClick={() => this.toggleView("painScale")}>Pain level</h2>
                {this.state.painScale &&
                    <div>
                        <div onClick={() => this.handleOverAll(5)}><h5>Excelent</h5></div>
                        <div onClick={() => this.handleOverAll(4)}><h5>Good</h5></div>
                        <div onClick={() => this.handleOverAll(3)}><h5>Normal</h5></div>
                        <div onClick={() => this.handleOverAll(2)}><h5>I've been better</h5></div>
                        <div onClick={() => this.handleOverAll(1)}><h5>Don't ask...</h5></div>
                    </div>
                }
                <h2 onClick={() => this.toggleView("glucoseLevel")}>Glucose</h2>
                {this.state.glucoseLevel &&
                    <input type="text" placeholder="Enter glucose level"/>
                }
                <h2 onClick={() => this.toggleView("bloodPressure")}>Blood Pressure</h2>
                {this.state.bloodPressure &&
                    <div>
                        <input type="text" />
                        <h4>/</h4>
                        <input type="text" />
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