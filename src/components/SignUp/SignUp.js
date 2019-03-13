import React, { Component } from 'react';

//Redux:
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import axios from 'axios'

class Register extends Component {
    state = {
        username:``,
        password:``,
        name:``,
        email:``
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSignUp = async () => {
        const userSignUp = await axios.post('/auth/register', this.state)
        this.props.updateUser(userSignUp.data[0])
        this.props.history.push('/wizard/stepone')
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <input 
                    className="input-effect"
                    name="name"
                    onChange={this.handleInput} 
                    value={this.state.name} 
                    placeholder="name" type="text"/>
                <input 
                    className="input-effect"
                    name="username"
                    onChange={this.handleInput} 
                    value={this.state.username} 
                    placeholder="username" type="text"/>
                <input 
                    className="input-effect"
                    name="email" 
                    onChange={this.handleInput} 
                    value={this.state.email} 
                    placeholder="email" type="text"/>
                <input 
                    className="input-effect"
                    name="password" 
                    onChange={this.handleInput} 
                    value={this.state.password} 
                    placeholder="password" 
                    type="password"/>
                <button onClick={this.handleSignUp}>Sign Up</button>
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(null, mapDispatchToProps)(Register);