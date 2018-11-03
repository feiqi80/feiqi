import React, { Component } from "react";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Drag from "./drag";
import Drop from "./drop";

class DragDrop extends Component {

  render() {
    return (
      <div className="drag-drop">
        <Drag />
        <Drop />
      </div>
      
    );
  }
  
}

export default DragDropContext(HTML5Backend)(DragDrop);