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

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/teal';

import "./App.css";

const theme = createMuiTheme(
  {
    palette: {
      primary: purple,
      variant: purple[500],
      secondary: teal,
    },
    status: {
      danger: 'orange',
    },
  }
)

class App extends Component {
  render() {
    return (
      <Provider 
        store={store}>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default withRouter(App);
