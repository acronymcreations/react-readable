import React, {Component} from 'react'
import {OverlayTrigger, Tooltip, Glyphicon, Button, ButtonGroup} from 'react-bootstrap'

class EditDeleteButtons extends Component{
  render(){
    const editTooltip = (
      <Tooltip placement="bottom" className="in" id='editTooltip'>
        Edit Post
      </Tooltip>
    )
    const deleteTooltip = (
      <Tooltip placement="bottom" className="in" id='deleteTooltip'>
        Delete Post
      </Tooltip>
    )
    return(
      <div className='text-center'>
        <ButtonGroup>
          <OverlayTrigger placement="bottom" overlay={editTooltip}>
            <Button><Glyphicon glyph="pencil" /></Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
            <Button><Glyphicon glyph='remove'/></Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div>
    )
  }
}

export default EditDeleteButtons;
