import React, { Component } from "react";
import "./Dashboard.scss";

import axios from "axios";

//materialUI:
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

//Redux:
import { connect } from "react-redux";
import { updateEntries } from "../../ducks/reducer";

//Routes:
import { Switch, Route } from "react-router-dom";
import Stats from "./Stats/Stats";
import Articles from "./Articles/Articles";

// --------------------------- Material UI --------------------------------
const options = ["Edit", "View", "Delete"];

const ITEM_HEIGHT = 48;

// --------------------------- Material UI --------------------------------

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      id: 0
    };

    this.handleEntriesRequest = this.handleEntriesRequest.bind(this);
    this.handleEntryView = this.handleEntryView.bind(this);
  }

  componentDidMount() {
    this.handleEntriesRequest();
  }

  async handleEntriesRequest() {
    const { entries, updateEntries } = this.props;
    if (!entries.length) {
      let entries = await axios.get("/api/entries");
      updateEntries(entries.data);
    }
  }

  handleEntryView(id) {
    this.props.history.push(`/day/entry/${id}`);
  }

  handleClick = (event, id) => {
    this.setState({ anchorEl: event.currentTarget, id });
  };

  handleClose = option => {
    const { id } = this.state;
    console.log(`this console:`, id);
    option === "Delete"
      ? this.handleDelete(id)
      : option === "Edit"
      ? this.handleEdit(id)
      : console.log("View");
    this.setState({ anchorEl: null, id: 0 });
  };

  handleDelete = async id => {
    let updatedEntries = await axios.delete(`/api/entry/${id}`);
    console.log(updatedEntries);
    this.props.updateEntries(updatedEntries.data);
  };

  handleEdit = id => {
    this.props.history.push(`/day/entry/compose/${id}`);
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const displayEntries = this.props.entries.map((entry, index) => {
      const { id, title } = entry;
      let { date } = entry;
      const test = id;
      date = new Date(date);
      date = date.toLocaleDateString();
      return (
        <div key={index}>
          <div onClick={() => this.handleEntryView(id)}>
            <p>{title}</p>
            <p>{date}</p>
          </div>
          <button onClick={() => console.log({ test })}>click me</button>
          {/* -------------------------------------Material UI --------------------------------- */}
          <div>
            <IconButton
              aria-label="More"
              aria-owns={open ? "long-menu" : undefined}
              aria-haspopup="true"
              onClick={event => this.handleClick(event, id)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              id="render-props-menu"
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {options.map(option => {
                return (
                  <MenuItem
                    key={option}
                    selected={option === "Edit"}
                    onClick={() => this.handleClose(option)}
                  >
                    {option}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          {/* -------------------------------------Material UI --------------------------------- */}
        </div>
      );
    });
    return (
      <div>
        <Switch>
          <Route path="/day/dashboard/stats" component={Stats} />
          <Route path="/day/dashboard/articles" component={Articles} />
        </Switch>
        <h1>Dashboard</h1>
        <Stats />
        <Articles />
        {displayEntries}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { entries } = reduxState.reducer;
  return {
    entries
  };
};

const dispatchToProps = {
  updateEntries
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(Dashboard);
