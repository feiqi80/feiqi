import React, { Component } from "react";
import DropItem from "./dropItem"

class Drop extends Component {

  constructor() {
    super();
    this.state = {
      labelObj: [
        [
          {id: Math.random()* 10000, pageNum: 1, type: "text", name: "name", x: 30, y: 100, label: "姓名"},
          {id: Math.random()* 10000, pageNum: 1, type: "text", name: "mail", x: 220, y: 200, label: "邮箱"},
        ],
        [
          {id: Math.random()* 10000, pageNum: 2, type: "text", name: "name", x: 30, y: 100, label: "姓名"},
          {id: Math.random()* 10000, pageNum: 2, type: "text", name: "mail", x: 150, y: 20, label: "邮箱"},
        ],
        [

        ]
      ]
    }
  }

  

  addNew = (dragObj, picNum, newPosition) => {
    const arr = [...this.state.labelObj];
    const obj = {
      id: Math.random()* 10000,
      pageNum: picNum + 1,
      type: "text",
      name: dragObj.name,
      x: newPosition.x,
      y: newPosition.y,
      label: dragObj.label
    };
    arr[picNum] = [
      ...arr[picNum],
      obj
    ]
    this.setState({
      labelObj: arr
    })
  }

  delLabel = (outIndex, index) => {
    const arr = [...this.state.labelObj];
    arr[outIndex] = arr[outIndex].filter((one, i) => i !== index);
    this.setState({
      labelObj: arr
    })
  }

  moveEvent = (arr, x, y) => {
    const obj = [...this.state.labelObj];
    obj[arr[1]][arr[2]].x = x;
    obj[arr[1]][arr[2]].y = y;
    this.setState((preValue) => ({
      labelObj: obj
    }))
  }

  // 滚动条位置
  getScrollTop = () => {
    return document.getElementById("picArea").scrollTop;
  }

  render() {
    const {labelObj} = this.state;
    const picDiv = labelObj.map((one, i) => {
      return (
        <DropItem
          key={i}
          dragList={one}
          picIndex={i}
          moveEvent={this.moveEvent}
          addEvent={this.addNew}
          calcScroll={this.getScrollTop}
          delClick={this.delLabel}
        />
      )
    });
    return (
      <div id="picArea" className="pic-area">
        {picDiv}
      </div>
    )
  }
}

export default Drop;