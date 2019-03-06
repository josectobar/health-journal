import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {

    render() {
        return (
            <nav>
                {this.props.pathname.includes('day') &&
                    <>
                        <h1>Nav</h1>
                        <Link to="/wizard/stepone">Wizard</Link>
                        <Link to="/day/new">New</Link>
                    </>
                }
            </nav>
        );
    }
}

export default Nav;