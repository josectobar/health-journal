import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import logo from "../../logo.png"

//MaterialUI:
import ButtonUI from "../Button/ButtonUI";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: ``,
      password: ``
    };
  }

  componentDidMount() {
    this.handleCurrent();
  }

  handleCurrent = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let verifySession = await axios.get("/auth/current");
        this.props.updateUser(verifySession.data);
        this.handleWizardDisplay();
      } catch (err) {}
    } else {
      console.log(this.props);
      this.props.history.push("/day/dashboard");
    }
  };

  handleWizardDisplay = () => {
    this.props.wizard
      ? this.props.history.push("/wizard/stepone")
      : this.props.history.push("/day/dashboard");
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleLogin = async () => {
    try {
      let postLogin = await axios.post("/auth/login", this.state);
      this.props.updateUser(postLogin.data);
      this.setState({ username: ``, password: `` });
      this.handleWizardDisplay();
    } catch (err) {
      console.log(err);
      alert(`Incorrect username or password`);
    }
  };

  render() {
    return (
      <div className="background">
        <Paper elevation={1} className="login-main">
          <img className="logo" src={logo} alt="logo" />
          <input
            className="input-effect"
            type="text"
            name="username"
            onChange={this.handleInput}
            value={this.state.username}
            placeholder="Username"
          />
          <input
            className="input-effect"
            type="Password"
            name="password"
            onChange={this.handleInput}
            value={this.state.password}
            placeholder="Password"
          />
          <ButtonUI
            action={this.handleLogin}
            color={'secondary'}
            label={"Login"}
            className="btn-ui"
          />
          <Link to="/signup">Not a user?</Link>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { wizard, id } = reduxState.reducer;
  return {
    wizard,
    id
  };
};

const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
