import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper"

import {connect} from 'react-redux'

class Articles extends Component {
    render() {
        const { title, urlToImage, content } = this.props.article
        return (
            <div>
              <Paper className="article-paper">
                  <h1>{title}</h1>
                  <img
                    src={urlToImage} 
                    alt={title} />
                  <p>{content}</p>
              </Paper>
            </div>
        );
    }
}

const mapStateToProps = reduxState => {
    const { article } = reduxState.reducer
    return {
        article
    }
}

export default connect(mapStateToProps)(Articles);