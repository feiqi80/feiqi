import React, { Component } from "react";
import Draggable from 'react-draggable';
import { DropTarget } from 'react-dnd';
import {Types} from "./dragType";

const squareTarget = {

  drop(props, monitor, component) {
    const item = monitor.getItem();
    const label = monitor.getSourceClientOffset();
    const box = document.getElementById(`drop-item${props.picIndex}`);
    const st = props.calcScroll();
    console.log("标签左位置：", label.x, "标签上位置", label.y);
    console.log("图片左位置：", box.offsetLeft, "图片上位置", box.offsetTop);
    console.log("滚动条位置", st);
    const newX = label.x - box.offsetLeft - 2; // 2是border的宽度
    const newY = label.y + st -box.offsetTop - 2;
    const newposition = {
      x: newX < 0 ? 0 : newX,
      y: newY < 0 ? 0 : newY
    };
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

  DraggableEventHandler = (e, data) => {
    console.log(e.target.parentNode.getAttribute("data-value"), data.node.getAttribute("data-value"), data);
    const arr = data.node.getAttribute("data-value").split("-");
    this.props.moveEvent(arr, data.x, data.y);
  }

  clickDown = (index, index2) => {
    return (e) => {
      const dom = e.target.localName;
      if (dom === "i" || dom === "span") {
        this.props.delClick(index, index2);
      }
    }
  }

  render() {
    const { connectDropTarget, isOver, dragList, picIndex } = this.props;
    const style = isOver ? "no-over is-over" : "no-over";
      const picDiv= dragList.map((one, i) => {
        return (
          <Draggable key={one.id}
            cancel=".drop-close" // 不触发DraggableEventHandler事件的区域
            onMouseDown={this.clickDown(picIndex, i)}
            bounds="parent"
            defaultClassName="label label-drop"
            defaultClassNameDragging="dragging"
            defaultPosition={{x: one.x, y: one.y}}
            onStop={this.DraggableEventHandler}
          >
            <div data-value={`${one.name}-${picIndex}-${i}`}>
              {one.label}
              <span className="drop-close">
                <i className="fa fa-times"></i>
              </span>
            </div> 
          </Draggable>
        )
      })
      
    return connectDropTarget(
      <div id={`drop-item${picIndex}`} className={style}>
        {picDiv} 
      </div>
    )
  }
}

export default DropTarget(Types.CARD, squareTarget, collect)(DropItem);