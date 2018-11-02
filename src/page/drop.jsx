import React, { Component } from "react";
import DropItem from "./dropItem"

class Drop extends Component {

  constructor() {
    super();
    this.state = {
      labelObj: [
        [
          {id: Math.random()* 10000, pageNum: 1, type: "text", name: "name", x: 30, y: 100, label: "姓名"},
          {id: Math.random()* 10000, pageNum: 1, type: "text", name: "mail", x: 220, y: 100, label: "邮箱"},
        ],
        [
          {id: Math.random()* 10000, pageNum: 2, type: "text", name: "name", x: 30, y: 100, label: "姓名"},
          {id: Math.random()* 10000, pageNum: 2, type: "text", name: "mail", x: 150, y: 100, label: "邮箱"},
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
    console.log("新增的内容:", obj);
    arr[picNum] = [
      ...arr[picNum],
      obj
    ]
    console.log(arr);
    this.setState({
      labelObj: arr
    })
  }

  delLabel = (outIndex, index) => {
    console.log(outIndex, index);
    const arr = this.state.labelObj;
    const  array = arr[outIndex].filter((one, i) => i !== index);
    console.log(array);
    arr[outIndex] = array;
    this.setState({
      labelObj: arr
    })
  }

  

  moveEvent = (arr, x, y) => {
    console.log("子组件向上传递的 arr === ", arr);
    const obj = [...this.state.labelObj];
    obj[arr[1]][arr[2]].x = x;
    obj[arr[1]][arr[2]].y = y;
    console.log(obj);
    this.setState((preValue) => ({
      labelObj: obj
    }))
  }

  getScrollTop = () => {
    const scroll = document.getElementById("picArea");
    const sr = scroll.scrollTop;
    // console.log("picArea的高度：", sr);
    return sr;
  }

  render() {
    
    const {labelObj} = this.state;
    console.log(labelObj);
    
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
      <div id="picArea" style={{width: 600, border: "solid 1px", float: "left", height: "102%", overflow: "auto"}}>
        {picDiv}
      </div>
    )
  }
}

export default Drop;