import React, { Component } from 'react';

class Entry extends Component {
    render() {
        return (
            <div>
                {this.props.location.pathname==="/day/new" &&
                    <h1>New Entry</h1>
                }
                {this.props.location.pathname.includes('/entry') &&
                    <h1>Entry</h1>
                }
            </div>
        );
    }
}

export default Entry;