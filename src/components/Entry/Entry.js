import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { dateGen } from '../../utils/dateGen'

import axios from 'axios'

//Redux:
import { updateEntries } from '../../ducks/reducer'
import { connect } from 'react-redux'

//QuillJS: 
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'


class Entry extends Component {
    constructor(){
        super()
        this.state = { 
            content:``,
            title: ``,
            date:``
        }
        this.handleChange = this.handleChange.bind(this)
        this.hanldeTitleInput = this.hanldeTitleInput.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleViewEntry = this.handleViewEntry.bind(this)
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
        this.handleViewEntry()
    }

    async handleViewEntry(){
        const { id } = this.props.match.params
        if (id) {
            const getEntry = await axios.get(`/api/entry/${id}`)
            const { title, content, date } = getEntry.data[0]
            console.log(getEntry) 
            this.setState({
                title,
                content,
                date
            })
        }
    }

    hanldeTitleInput(e){
        console.log(e.target.value)
        this.setState({
            title: e.target.value
        })
    }

    handleChange(value){
        this.setState({
            content: value
        })
    }

   async handleSave(){
       const { title, content } = this.state
       console.log(title);
       
        let updatePosts = await axios.post('/api/entry', {title, content, date:dateGen()})
        console.log(updatePosts.data);
        
        this.props.updateEntries(updatePosts.data)
        this.props.history.push('/day/dashboard')
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {(this.props.location.pathname.includes('/new') || this.props.location.pathname.includes('/steptwo')) &&
                    <>
                        <h1>New Entry</h1>
                        <input type="text" onChange={this.hanldeTitleInput} placeholder="Enter a title"/>
                        <ReactQuill
                            theme="snow"
                            modules={this.modules}
                            format={this.format}
                            value={this.state.content}
                            placeholder='This is all I need'
                            readOnly={false}
                            onChange={this.handleChange}/>
                        <button onClick={() => this.handleSave()}>Submit</button>
                    </>
                }
                {this.props.location.pathname.includes('/entry') &&
                    <>
                        <h1>Entry</h1>
                        <h3>{this.state.title}</h3>
                        <ReactQuill
                            theme="bubble"
                            value={this.state.content}
                            readOnly={true}/>
                    </>
                }
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateEntries
}

export default withRouter(connect(null, mapDispatchToProps)(Entry));

