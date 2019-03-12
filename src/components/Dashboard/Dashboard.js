import React, { Component } from "react";

import axios from "axios";

//materialUI:
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert"

//Redux:
import { connect } from "react-redux";
import { updateEntries } from "../../ducks/reducer";

//Routes:
import { Switch, Route } from "react-router-dom";
import Stats from "./Stats/Stats";
import Articles from "./Articles/Articles";

// --------------------------- Material UI --------------------------------
const options = [
    "Edit",
    "View",
    "Delete"
];

const ITEM_HEIGHT = 48;

// --------------------------- Material UI --------------------------------

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
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

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = (props) => {
        console.log(props)
    // option === 'Delete'
    // ?
    //     this.handleDelete(id)
    // :
    //     option === 'Edit' 
    // ?
    //  this.handleEdit(id)
    //  :
    //  console.log('View')
    this.setState({ anchorEl: null });
  }

  handleDelete = async (id) => {
    let updatedEntries = await axios.delete(`/api/entry/${id}`)
    updateEntries(updatedEntries.data)
  }

  handleEdit = (id) => {
      this.props.history.push(`/day/entry/compose/${id}`)
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const displayEntries = this.props.entries.map(entry => {
      const { id, title } = entry;
      let { date } = entry;
      date = new Date(date);
      date = date.toLocaleDateString();
      console.log(id)
      return (
        <div key={id} >
            <div onClick={() => this.handleEntryView(id)}>
                <p>{title}</p>
                <p>{date}</p>
            </div>
        {/* -------------------------------------Material UI --------------------------------- */}
            <IconButton
            aria-label="More"
            aria-owns={open ? "long-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            >
            <MoreVertIcon />
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                }
            }}
            >
            <Option name={id} key={'Edit'} option={'Edit'} id={id} handleClose={this.handleClose}/>
            {/* {options.map(option => {
                console.log(id)
                return <Option key={option} option={option} id={id} handleClose={this.handleClose}/>
            })} */}
            </Menu>
        {/* -------------------------------------Material UI --------------------------------- */}
        </div>
      )
    })
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

const Option = (props) => {
    console.log(props)
    return (
        <MenuItem
                selected={props.option === "Edit"}
                
                onClick={() => props.handleClose(props)}
                >
                {props.option}
        </MenuItem>
    )
}


const dispatchToProps = {
  updateEntries
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(Dashboard);
