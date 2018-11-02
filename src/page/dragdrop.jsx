import React, { Component } from "react";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Drag from "./drag";
import Drop from "./drop";

class DragDrop extends Component {
  
  constructor(props) {
    super(props);
    console.log(props);
  }

  
  componentWillReceiveProps(props) {
    console.log("外层reviece===", props);
  }

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