import React, { Component } from 'react';
import DatePicker from 'react-datepicker'

import axios from 'axios'

//MaterialUI:
import ButtonUI from "../Button/ButtonUI";

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
            <div className="view-main">
                <span>Title: </span><h2>{this.state.title}</h2>
                <div className="entry-btns">
                <ButtonUI
                action={this.handleEdit}
                color={'secondary'}
                label={"Edit"}
                className="btn-ui compose-btn"
                />
                <ButtonUI
                action={this.handleDelete}
                label={"Delete"}
                className="btn-ui compose-btn"
                />
                <DatePicker
                    selected={this.state.date}
                    disabled={true}/>
                </div>
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