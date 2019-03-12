import React, { Component } from 'react';
import DatePicker from 'react-datepicker'

import axios from 'axios'

//Redux:
import { updateEntries } from '../../ducks/reducer'
import { connect } from 'react-redux'

//Routing:
import { withRouter } from 'react-router-dom'

//QuillJS: 
import ReactQuill from 'react-quill'

//Imported CSS for 3rd party libraries:

//Quilljs
import 'react-quill/dist/quill.snow.css'
//Date-pickerjs:
import "react-datepicker/dist/react-datepicker.css"

class Compose extends Component {
    constructor(){
        super()
        this.state = { 
            content:``,
            title: ``,
            date: new Date()
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleTitleInput = this.handleTitleInput.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleDateInput = this.handleDateInput.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleEntryUpdate = this.handleEntryUpdate.bind(this)
    }

//Quill modules & format: 

    modules = {
        toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }], 
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{ 'color': [] }, { 'background': [] }],       
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
        ],
      }
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
//-------------------------
    componentDidMount(){
        this.handleEdit()
    }

    async handleEdit(){
        console.log(this.props.match.params.id)
        if (this.props.match.params.id) {
            try {
                const { id } = this.props.match.params
                const getEntry = await axios.get(`/api/entry/${id}`)
                let { title, content, date } = getEntry.data[0]
                date = new Date(date)
                await this.setState({
                    title,
                    content,
                    date
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    handleTitleInput(e){
        this.setState({
            title: e.target.value
        })
    }

    handleDateInput(date){
        this.setState({
            date
        })
    }

    handleChange(value){
        this.setState({
            content: value
        })
    }
    
   async handleSave(){
        const { title, content, date } = this.state
        let updatedPosts = await axios.post('/api/entry', {title, content, date})
        this.props.updateEntries(updatedPosts.data)
        this.props.history.push('/day/dashboard')
    }

    async handleEntryUpdate(){
        const { id } = this.props.match.params
        const { title, content, date } = this.state
        let updatedPosts = await axios.put(`/api/entry/${id}`, {title, content, date})
        this.props.updateEntries(updatedPosts.data)
        this.props.history.push('/day/dashboard')
    }

    render() {
        return (
            <div>
                {this.props.location.pathname === '/day/compose'
                ?
                    <h1>Compose new entry</h1>
                : this.props.location.pathname === '/wizard/steptwo' 
                ?
                    null
                :
                    <h1>Edit entry</h1>
            }
                <input 
                    type="text" 
                    onChange={this.handleTitleInput}
                    value={this.state.title} 
                    placeholder="Enter a title"/>
                <DatePicker 
                    selected={this.state.date}
                    onChange={this.handleDateInput}/>
                <ReactQuill
                    theme="snow"
                    modules={this.modules}
                    format={this.format}
                    value={this.state.content}
                    placeholder='This is all I need'
                    readOnly={false}
                    onChange={this.handleChange}/>
            {this.props.location.pathname === '/day/compose'
                ?
                    <button 
                    onClick={() => this.handleSave()}>
                    Submit
                    </button>
                : this.props.location.pathname === '/wizard/steptwo' 
                ?
                    null
                :
                    <button
                        onClick={this.handleEntryUpdate}>
                        Save Changes
                    </button>
            }
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateEntries
}

export default withRouter(connect(null, mapDispatchToProps)(Compose))