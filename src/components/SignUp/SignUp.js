import React, { Component } from "react"
import logo from "../../logo.png";

//Redux:
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import axios from "axios";

//MaterialUI:
import ButtonUI from "../Button/ButtonUI";
import Paper from "@material-ui/core/Paper";

class Register extends Component {
  state = {
    username: ``,
    password: ``,
    name: ``,
    email: ``
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSignUp = async () => {
    try{
      const userSignUp = await axios.post("/auth/register", this.state);
      this.props.updateUser(userSignUp.data);
      this.props.history.push("/wizard/stepone");
    } catch (err) {
      console.log(err)
      alert('There was a problem signing you up. please try again')
    }
  };

  render() {
    return (
      <div className="signup-background">
        <Paper elevation={1} className="signup-main">

        <img className="logo" src={logo} alt="logo" />
        <h1>Sign Up</h1>
        <input
          className="input-effect"
          name="name"
          onChange={this.handleInput}
          value={this.state.name}
          placeholder="name"
          type="text"
        />
        <input
          className="input-effect"
          name="username"
          onChange={this.handleInput}
          value={this.state.username}
          placeholder="username"
          type="text"
        />
        <input
          className="input-effect"
          name="email"
          onChange={this.handleInput}
          value={this.state.email}
          placeholder="email"
          type="text"
        />
        <input
          className="input-effect"
          name="password"
          onChange={this.handleInput}
          value={this.state.password}
          placeholder="password"
          type="password"
        />
        <ButtonUI
          color={"secondary"}
          label={"Sign Up"}
          action={this.handleSignUp}
        />
        <a href="#/">Back</a>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateUser
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
