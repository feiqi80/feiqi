import React, { Component } from "react";
import Draggable from 'react-draggable';
import { DropTarget } from 'react-dnd';
import {Types} from "./dragType";

const squareTarget = {

  drop(props, monitor, component) {
    const item = monitor.getItem();
    console.log("最终投放", item);
    const label = monitor.getSourceClientOffset();
    const box = document.getElementById(`drop-item${props.picIndex}`);
    const st = props.calcScroll();
    console.log("标签左位置：", label.x, "标签上位置", label.y);
    console.log("图片左位置：", box.offsetLeft, "图片上位置", box.offsetTop);
    console.log("滚动条位置rrr", st);
    const newX = label.x - box.offsetLeft;
    const newY = label.y + st -box.offsetTop;
    const newposition = {
      x: newX < 0 ? 0 : newX,
      y: newY < 0 ? 0 : newY
    };
    console.log("新位置：", newposition)
    props.addEvent(item, props.picIndex, newposition);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    didDrop: monitor.didDrop()
  };
}

class DropItem extends Component {

  constructor(props) {
    super(props);
    console.log("拖拽item的props ====== ", props);
    
  }

  

  
  componentDidMount() {
    // const a = document.documentElement.getBoundingClientRect;
    // console.log(a);
    // const box=document.getElementById(`drag${this.props.picIndex}`);
    // console.log(box.getBoundingClientRect());
  }

  DraggableEventHandler = (e, data) => {
    console.log(e, data);
    
    console.log(e.target.parentNode.getAttribute("data-value"), data.node.getAttribute("data-value"), data);
    const arr = data.node.getAttribute("data-value").split("-");
    this.props.moveEvent(arr, data.x, data.y);
  }

  clickDown = (index, index2) => {
    return (e) => {
      const dom = e.target.localName;
      if (dom === "i" || dom === "span") {
        console.log(index, index2);
        this.props.delClick(index, index2);
      }
    }
  }

  render() {
    const { connectDropTarget, isOver, didDrop, dragList, picIndex } = this.props;
    
    console.log(isOver, didDrop, dragList);
      const picDiv= dragList.map((one, i) => {
        console.log("每个标签", one);
        return (
          <Draggable key={one.id}
            cancel=".drop-close"
            onMouseDown={this.clickDown(picIndex, i)}
            bounds="parent"
            defaultClassNameDragging="dragging"
            defaultPosition={{x: one.x, y: one.y}}
            onStop={this.DraggableEventHandler}
            // position={{x: -1, y: -1}}
            // onStart={this.DraggableEventHandler}
            // onDrag={this.DraggableEventHandler}
          >
            <div data-value={`${one.name}-${picIndex}-${i}`} className="label label-drop">
              {one.label}
              <span className="drop-close">
                <i className="fa fa-times"></i>
              </span>
            </div> 
          </Draggable>
        )
      })
      
    return connectDropTarget(
      <div id={`drop-item${picIndex}`} style={{width: 500, height: 400, border: "solid 1px red", position: "relative", margin: "0 auto", marginBottom: 20}}>
        {picDiv} 
      </div>
    )
  }
}

export default DropTarget(Types.CARD, squareTarget, collect)(DropItem);