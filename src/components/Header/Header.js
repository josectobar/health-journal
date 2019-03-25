import React, { Component } from 'react';
import './Header.scss'
//redux:
import { connect } from 'react-redux'
import { updateUser, clearState } from '../../ducks/reducer'

import axios from 'axios'

class Header extends Component {

    componentDidMount(){
        this.handleCurrent()
        // window.onhashchange = () => {
            // this.handleCurrent()
        // }
    }

    handleCurrent = async () => {
        if (this.props.pathname !== "/") {
            const { id } = this.props
            if (!id) {
                try {
                    let verifySession = await axios.get('/auth/current')
                    this.props.updateUser(verifySession.data)
                }catch(error) {
                    this.props.push('/')
                }
            } 
        }
    }

    handleLogout =  async () => {
        await axios.post('/auth/logout')
        await this.props.clearState()
        this.props.push('/')            
    }

    render() {
        return (
            <>
            {this.props.pathname.includes('/day') &&
            <header className="header-container">
                <h2>Hello {this.props.name}!</h2>
                <button
                    onClick={this.handleLogout}>
                    Logout
                </button>
            </header>
                }
            </>
        );
    }
}

const mapStateToProps = ( reduxState ) => {
    const { name, id } = reduxState.reducer
    return {
        name,
        id
    }
}

const mapDispatchToProps = {
    updateUser,
    clearState
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)