import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import './Tags.scss'

import _ from "lodash";

//redux:
import { connect } from 'react-redux'
import { updateEntry } from '../../../ducks/reducer'
import axios from 'axios';
 
const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];
 
class Tags extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            tags: [
                { id: "Sample Tag", text: "Sample Tag" }
             ],
            suggestions: [
                { id: 'fibromyalgia', text: 'fibromyalgia' },
                { id: 'migranes', text: 'migranes' },
                { id: 'stress', text: 'stress' },
                { id: 'diabetis', text: 'diabetis' },
                { id: 'astma', text: 'astma' },
                { id: 'hypertension', text: 'hypertension' },
                { id: 'headaches', text: 'headaches' }
             ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount(){
        this.checkTags()
    }

    checkTags  = async () => {
        console.log(_.isEmpty(this.props.entry.tags) && this.props.params)
        if (_.isEmpty(this.props.entry.tags) && this.props.params) {
            try{
                const { id } = this.props.params
                let tags = await axios.get(`/api/tags/${id}`)
                this.props.updateEntry({
                    tags:tags.data
                })
                this.setState({
                    tags: tags.data
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
    
    async handleDelete(i) {
        const { tags } = this.state;
        await this.setState({
            tags: tags.filter((tag, index) => index !== i),
        })
        this.props.updateEntry({
            tags: this.state.tags
        })
    }
    
    async handleAddition(tag) {
        await this.setState(state => ({ tags: [...state.tags, tag] }));
        this.props.updateEntry({tags: this.state.tags})
        console.log(this.state.tags)

    }
    
    async handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        
        await this.setState({ tags: newTags });
        this.props.updateEntry({
            tags: this.state.tags
        })
    }
    
    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { entry } = reduxState.reducer
    return {
        entry
    }
}

const dispatchToProps = {
    updateEntry
}

export default connect(mapStateToProps, dispatchToProps)(Tags)