import React, { Component } from "react";
//Routes:
import { withRouter  } from "react-router-dom";

//redux:
import { Provider } from "react-redux";
import store from "./ducks/store";

//routes:
import routes from './routes'

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
