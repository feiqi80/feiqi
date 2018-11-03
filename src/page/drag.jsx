import React, { Component } from "react";
import DragItem from "./dragItem";
const labelList = [
  {name: "name", label: "姓名"},
  {name: "phone", label: "手机号"},
  {name: "mail", label: "邮箱"},
  {name: "age", label: "年龄"},
  {name: "gender", label: "性别"}
]
class Drag extends Component {

  render() {
    const div = labelList.map((one, i) => {
      return (
        <div key={i} style={{width: "100%", paddingBottom: 15}}>
          <DragItem label={one}  />
        </div>
      )
    });
    return (
        <div style={{width: 200, float: "left"}}>
          {div}
        </div>
    );
  }
  
}

export default Drag;