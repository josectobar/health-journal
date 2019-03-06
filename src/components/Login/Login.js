import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: ``,
            password: ``
        }
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <input 
                    type="text" placeholder="Username"/>
                <input 
                    type="Password" placeholder="Password"/>
                <button>Login</button>
                <Link to="/signup">Not a user?</Link>
            </div>
        );
    }
}

export default Login;