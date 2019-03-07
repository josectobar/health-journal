import React, { Component } from "react";

//redux:
import { Provider } from "react-redux";
import store from "./ducks/store";

//routes:
import routes from './routes'
import { withRouter } from 'react-router-dom'

//Components:
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider 
        store={store}>
          <div className="App">
            <Header 
              push={this.props.history.push}
              pathname={this.props.location.pathname}
            />
            <Nav 
              pathname={this.props.location.pathname}
            />
            {routes}
          </div>
      </Provider>
    );
  }
}

export default withRouter(App);
