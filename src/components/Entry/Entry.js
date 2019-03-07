import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Entry extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                {(this.props.location.pathname.includes('/new') || this.props.location.pathname.includes('/steptwo')) &&
                    <h1>New Entry</h1>
                }
                {this.props.location.pathname.includes('/entry') &&
                    <h1>Entry</h1>
                }
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapStateToProps)(Entry));