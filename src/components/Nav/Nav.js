import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import logo from '../../logo.png'
import './Nav.scss'

import Home from "@material-ui/icons/Home"
import Edit from "@material-ui/icons/Edit"
import School from "@material-ui/icons/School"


class Nav extends Component {

    render() {
        return (
            <>
                {this.props.pathname.includes('/day') &&
                    <nav className="nav-container">
                        <h1>Nav</h1>
                        <img className="logo-nav" src={logo} alt="logo" />
                        <div className="button-wrap" onClick={() => this.props.history.push('/day/dashboard')}>
                            <Home />
                            <label>Home</label>
                        </div>
                        <div className="button-wrap" onClick={() => this.props.history.push('/day/compose')}>
                            {this.props.pathname ==="/day/dashboard" && 
                                <Fab className="add-btn" color="secondary" aria-label="Add">
                                    <AddIcon />
                                </Fab>
                            }                            
                            <Edit />
                            <label>Compose</label>
                        </div>
                        <div className="button-wrap" onClick={() => this.props.history.push('/wizard/stepone')}>
                            <School />
                            <label>Wizard</label>
                        </div>
                    </nav>
                }
            </>
        );
    }
}

export default withRouter(Nav);