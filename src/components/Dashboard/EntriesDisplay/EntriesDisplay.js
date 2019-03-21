import React from 'react'

//materialUI:
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert"

const options = ["Edit", "View", "Delete"]
const ITEM_HEIGHT = 48;

export default function EntriesDisplay(props){
    const { id, title } = props.entry
    const {open, index, date, anchorEl, handleClick, handleSelect } = props
    return (
        <div className="entry-list-container">
          <div
            className="entry-list-map"
            onClick={() => props.handleEntryView(id)}
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
                onClick={event => handleClick(event, id, index)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                id="long-menu"
                onClose={handleSelect}
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
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          {/* -------------------------------------Material UI --------------------------------- */}
        </div>
    )
}