import React, { Component } from "react";
import Header from "./header";
import Roots from "../route/roots";
import "./layout.css";

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Header />                  
        <Roots />
      </div>
    )
  }
}

export default Layout;