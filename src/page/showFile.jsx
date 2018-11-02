import React, { Component } from "react";
// import { Document } from 'react-pdf';
import PDF from "react-pdf-js";

class showFile extends Component {
  

  render() {
    return (
      <div>
        {/* <Document file="http://weizhicidev.oss-cn-hangzhou.aliyuncs.com/eff0bfd9c468b337ba7ca7e4221767b3.pdf" /> */}
        <PDF file="http://weizhicidev.oss-cn-hangzhou.aliyuncs.com/eff0bfd9c468b337ba7ca7e4221767b3.pdf" />
        xxxxx
      </div>
    )
  }
}

export default showFile