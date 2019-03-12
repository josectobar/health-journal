import React, { Component } from 'react';
import DatePicker from 'react-datepicker'

import axios from 'axios'

//Redux:
import { updateEntries } from '../../ducks/reducer'
import { connect } from 'react-redux'

//QuillJS: 
import ReactQuill from 'react-quill'

//Imported CSS for 3rd party libraries:
//Quilljs
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
//Date-pickerjs:
import "react-datepicker/dist/react-datepicker.css";

class Entry extends Component {
    constructor(){
        super()
        this.state = { 
            content:``,
            title: ``,
            date: new Date()
        }
        this.handleViewEntry = this.handleViewEntry.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        this.handleViewEntry()
    }

    async handleViewEntry(){
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

    handleEdit(){
        const { id } = this.props.match.params
        this.props.history.push(`/day/entry/compose/${id}`)
    }

    async handleDelete(){
        const { id } = this.props.match.params
        const updatedEntries = await axios.delete(`/api/entry/${id}`)
        this.props.updateEntries(updatedEntries.data)
        this.props.history.push('/day/dashboard')
    }

    render() {
        return (
            <div>
                <h1>Entry</h1>
                <h3>{this.state.title}</h3>
                <button onClick={this.handleEdit}>Edit</button>
                <button onClick={this.handleDelete}>Delete</button>
                <DatePicker
                    selected={this.state.date}
                    disabled={true}/>
                <ReactQuill
                    theme="bubble"
                    value={this.state.content}
                    readOnly={true}/>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateEntries
}

export default connect(null, mapDispatchToProps)(Entry);