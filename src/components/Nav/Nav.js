import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import './Nav.scss'

import Home from "@material-ui/icons/Home"
import Edit from "@material-ui/icons/Edit"
import School from "@material-ui/icons/School"


class Nav extends Component {

    render() {
        return (
            <nav className="nav-container">
                {this.props.pathname.includes('/day') &&
                    <>
                        <h1>Nav</h1>
                        <div className="button-wrap" onClick={() => this.props.history.push('/day/dashboard')}>
                            <Home />
                            <label>Home</label>
                        </div>
                        <div className="button-wrap" onClick={() => this.props.history.push('/day/compose')}>
                            <Edit />
                            <label>Compose</label>
                        </div>
                        <div className="button-wrap" onClick={() => this.props.history.push('/wizard/stepone')}>
                            <School />
                            <label>Wizard</label>
                        </div>
                    </>
                }
            </nav>
        );
    }
}

export default withRouter(Nav);