import React from "react";

//materialUI:
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert"

const options = [
    "Edit",
    "View",
    "Delete"
];

const ITEM_HEIGHT = 48;


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

export function EntryList(props){

    const ITEM_HEIGHT = 48;
    const { id, title } = props.entry

    return(
        <div key={props.option} >
            <div onClick={() => props.handleEntryView(id)}>
                <p>{title}</p>
                <p>{props.date}</p>
            </div>
            <IconButton
                aria-label="More"
                aria-owns={props.open ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={props.handleClick}>
            <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={props.handleClose}
                PaperProps={{
                    style: {
                        maxHeight:ITEM_HEIGHT * 4.5,
                        width: 200
                    }}}>
                <MenuItem
                    selected={props.option === "Edit"}
                    onClick={() => props.handleClose(props)}>
                    {props.option}
                </MenuItem>
            </Menu>
        </div>
    )
}