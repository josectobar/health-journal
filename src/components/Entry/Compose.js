import React, { Component } from "react";

//SASS:
import "./Compose.scss";

import axios from "axios";

//Redux:
import { updateEntries, updateEntry, clearEntry } from "../../ducks/reducer";
import { connect } from "react-redux";

//Routing:
import { withRouter } from "react-router-dom";

//QuillJS:
import ReactQuill from "react-quill"
import {quillModules, quillFormats } from '../../utils/Entry/QuillJS/modules'

//React-tag-input:
import Tags from './Tags/Tags'

//Date-pickerjs:
import DatePicker from "react-datepicker";

//Imported CSS for 3rd party libraries:

//Quilljs
import "react-quill/dist/quill.snow.css";
//Date-pickerjs:
import "react-datepicker/dist/react-datepicker.css";

class Compose extends Component {
  constructor() {
    super()
    this.handleSave = this.handleSave.bind(this)
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEntryUpdate = this.handleEntryUpdate.bind(this);
    this.HandleEditCancel = this.HandleEditCancel.bind(this)
  }

  componentDidMount() {
    this.handleEdit();
  }

  componentWillUnmount(){
    this.HandleEditCancel()
  }

  HandleEditCancel(){
    this.props.clearEntry()
  }

  async handleEdit() {
    if (this.props.match.params.id) {
      try {
        const { id } = this.props.match.params;
        const getEntry = await axios.get(`/api/entry/${id}`);
        let { title, content, date, tags } = getEntry.data[0];
        date = new Date(date)
        tags = tags.split(',')
        // console.log(tags)
        await this.props.updateEntry({
          title,
          content,
          date,
          tags
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async handleSave() {
    const { title, content, date } = this.props.entry;
    let updatedPosts = await axios.post("/api/entry", { title, content, date });
    this.props.updateEntries(updatedPosts.data);
    this.props.clearEntry();
    this.props.history.push("/day/dashboard");
  }

  async handleEntryUpdate() {
    const { id } = this.props.match.params;
    const { title, content, date } = this.state;
    let updatedPosts = await axios.put(`/api/entry/${id}`, {
      title,
      content,
      date
    });
    this.props.updateEntries(updatedPosts.data);
    this.props.history.push("/day/dashboard");
  }

  // handleImageUpload= (event) => {
  //   console.log(event)
  // }

  render() {
    const { updateEntry, entry } = this.props;
    // let source = document.querySelectorAll('.ql-editor img')[0] ? document.querySelectorAll('.ql-editor img')[0].src : null
    // console.log(source)
    return (
      <div className="main-compose-container">
        {this.props.location.pathname === "/day/compose" ? (
          <h1>Compose new entry</h1>
        ) : this.props.location.pathname === "/wizard/steptwo" ? null : (
          <h1>Edit entry</h1>
        )}
        <div className="compose-text-date">
          <input
            className="title input-effect"
            type="text"
            onChange={e => updateEntry({ title: e.target.value })}
            value={entry.title}
            placeholder="Enter a title"
          />
          {this.props.location.pathname !== "/wizard/steptwo" && (
            <DatePicker
              className="input-effect"
              id="datepicker"
              selected={entry.date}
              onChange={value => updateEntry({ date: value })}
            />
          )}
        </div>
        <div className="quill-btn-container">
          <div className='tag-component'>
            <Tags tags={this.props.tags}/>
          </div>
          <div>
            <ReactQuill
              className="quill"
              theme="snow"
              modules={quillModules}
              format={quillFormats}
              value={entry.content}
              placeholder="Type your entry here."
              readOnly={false}
              onChange={delta => updateEntry({ content: delta })}
              />
          </div>
            {this.props.location.pathname === "/day/compose" ? (
              <button className="compose-btn" onClick={() => this.handleSave()}>
                Submit
              </button>
            ) : this.props.location.pathname === "/wizard/steptwo" ? null : (
              <button className="compose-btn" onClick={this.handleEntryUpdate}>
                Save Changes
              </button>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { entry } = reduxState.reducer;
  return {
    entry
  };
};

const mapDispatchToProps = {
  updateEntries,
  updateEntry,
  clearEntry
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Compose)
);
