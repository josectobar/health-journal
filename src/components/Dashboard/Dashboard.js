import React, { Component } from "react";
import "./Dashboard.scss";

import axios from "axios";

//materialUI:
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Paper from "@material-ui/core/Paper";

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
      id: 0,
      index: -1
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

  handleClick = (event, id, index) => {
    this.setState({ anchorEl: event.currentTarget, id, index });
  };

  handleSelect = option => {
    const { id, index } = this.state;
      option === "Delete"
      ? this.handleDelete(id, index)
      : option === "Edit"
      ? this.props.history.push(`/day/entry/compose/${id}`)
      : option === "View"
      ? this.props.history.push(`/day/entry/${id}`)
      : this.setState({ anchorEl: null, id: 0, index:-1 });
    
  }

  handleDelete = async (id, index) => {
    let { updateEntries, entries } = this.props
    entries.splice(index, 1)
    console.log(entries)
    await updateEntries(entries)
    let updatedEntries = await axios.delete(`/api/entry/${id}`)
    updateEntries(updatedEntries.data)
    this.setState({ anchorEl: null, id: 0, index: -1 });
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
      date = new Date(date);
      date = date.toLocaleDateString();
      return (
        <div className="entry-list-container" key={index}>
          <div
            className="entry-list-map"
            onClick={() => this.handleEntryView(id)}
            >
            <p>{title}</p>
            <p>{date}</p>
            </div>
            {/* -------------------------------------Material UI --------------------------------- */}
            <div>
              <IconButton
                aria-label="More"
                aria-owns={open ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={event => this.handleClick(event, id, index)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                id="long-menu"
                onClose={this.handleSelect}
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
                      onClick={() => this.handleSelect(option)}
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
      <div className="dashboard-container">
        <Switch>
          <Route path="/day/dashboard/stats" component={Stats} />
          <Route path="/day/dashboard/articles" component={Articles} />
        </Switch>
        <h1>Dashboard</h1>
        <Stats />
        <Articles />
        <Paper elevation={4} className="entry-list-main">
          {displayEntries}
        </Paper>
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
