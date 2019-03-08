import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'

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
        }

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <input 
                    type="text" name="username" onChange={this.handleInput} value={this.state.username} placeholder="Username"/>
                <input 
                    type="Password" name="password" onChange={this.handleInput} value={this.state.password} placeholder="Password"/>
                <button onClick={this.handleLogin}>Login</button>
                <Link to="/signup">Not a user?</Link>
            </div>
        );
    }
}

const mapStateToProps = ( reduxState ) => {
    const { wizard, id } = reduxState
    return {
        wizard,
        id
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);