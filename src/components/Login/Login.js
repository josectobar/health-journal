import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import Paper from "@material-ui/core/Paper";

import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: ``,
            password: ``
        }
    }

    componentDidMount(){
        this.handleCurrent()
    }

    handleCurrent = async () => {
        const { id } = this.props
        if (!id) {
            try {
                let verifySession = await axios.get('/auth/current')
                console.log(verifySession)
                this.props.updateUser(verifySession.data)
                this.handleWizardDisplay()
            }catch(err) {
            }
        } else {
            console.log(this.props)
            this.props.history.push('/day/dashboard')
        }
    }

    handleWizardDisplay = () => {
        console.log('hit!', this.props.wizard)
        this.props.wizard ? 
                this.props.history.push('/wizard/stepone')
            :
                this.props.history.push('/day/dashboard')
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleLogin = async () => {
        try {
            let postLogin = await axios.post('/auth/login', this.state)
            this.props.updateUser(postLogin.data)
            this.setState({username: ``, password: ``})
            this.handleWizardDisplay()
        } catch (err) {
            console.log( err)
            alert(`Incorrect username or password`)
        }

    }

    render() {
        return (
            <Paper elevation={1} className="login-main">
                <h1>Login</h1>
                <input 
                    className="input-effect"
                    type="text" 
                    name="username" 
                    onChange={this.handleInput} 
                    value={this.state.username} 
                    placeholder="Username"/>
                <input 
                    className="input-effect"
                    type="Password" 
                    name="password" 
                    onChange={this.handleInput} 
                    value={this.state.password} 
                    placeholder="Password"/>
                <button 
                    onClick={this.handleLogin}>
                    Login
                </button>
                <Link to="/signup">Not a user?</Link>
            </Paper>
        );
    }
}

const mapStateToProps = ( reduxState ) => {
    const { wizard, id } = reduxState.reducer
    return {
        wizard,
        id
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);