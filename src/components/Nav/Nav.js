import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Nav extends Component {

    render() {
        return (
            <nav>
                {this.props.pathname.includes('/day') &&
                    <>
                        <h1>Nav</h1>
                        <Link to="/day/dashboard">Home</Link>
                        <Link to="/wizard/stepone">Wizard</Link>
                        <Link to="/day/compose">Compose</Link>
                    </>
                }
            </nav>
        );
    }
}

export default withRouter(Nav);