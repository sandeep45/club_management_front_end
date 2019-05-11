import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { Component } from 'react'

const NotesSignWithTooltip = props => {
  const {notes} = props;
  if(notes && notes.length > 0){
    return (
      <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">{notes}</Tooltip>}>
        <Badge bsStyle="danger">!</Badge>
      </OverlayTrigger>
    );
  }else {
    return '';
  }
};

export default NotesSignWithTooltip

