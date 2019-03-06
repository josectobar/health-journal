import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                {this.props.pathname.includes('day') &&
                    <>
                        <h1>Header</h1>
                    </>
                }
            </header>
        );
    }
}

export default Header;