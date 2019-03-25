import React, { Component } from 'react';
import './Header.scss'
//redux:
import { connect } from 'react-redux'
import { updateUser, clearState } from '../../ducks/reducer'
import { clearFullIndState } from '../../ducks/indicatorsReducer'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


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
        await this.props.clearFullIndState()
        this.props.push('/')            
    }

    render() {
        return (
            <>
            {this.props.pathname.includes('/day') &&
            <header className="header-container">
                <h2>Hi {this.props.name}!</h2>
                <div className="menu-icons">
                    <div className='btn-label' aria-label="Logout" onClick={this.handleLogout}>
                        <FontAwesomeIcon 
                            icon={faSignOutAlt}
                            size="lg"/>
                        <label>Logout</label>
                    </div>
                </div>
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
    clearState,
    clearFullIndState
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)