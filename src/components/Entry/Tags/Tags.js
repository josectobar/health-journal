import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import './Tags.scss'

//redux:
import { connect } from 'react-redux'
 
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
        // this.checkTags()
    }

    checkTags(){
        console.log(this.props)
            this.setState({
                tags: this.props.tags
            })
    }
    
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        })
    }
    
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
    
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        
        // re-render
        this.setState({ tags: newTags });
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

export default connect(mapStateToProps)(Tags)