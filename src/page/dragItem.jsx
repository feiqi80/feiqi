import React, { Component } from "react";
import { DragSource } from "react-dnd";
import {Types} from "./dragType";

const cardSource = {
  beginDrag(props, monitor) {
    return props.label;
  },

  endDrag(props, monitor, component) {
    console.log("Source endDRag", props, monitor.didDrop(),monitor.getDropResult(), monitor.getDifferenceFromInitialOffset());
    return;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    dDrop: monitor.didDrop()
  };
}


class DragItem extends Component {

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
        <div className="label">
          {this.props.label.label}
        </div>
    );
  }
  
}

export default DragSource(Types.CARD, cardSource, collect)(DragItem);