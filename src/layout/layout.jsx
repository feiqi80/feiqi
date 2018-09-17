import React, { Component } from "react";
import Header from "./header";
import Leftbar from "./left-bar";
import Roots from "../route/roots";
import "./layout.css";

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <div className="section">
          <Leftbar />
          <Roots />
        </div>
      </div>
    )
  }
}

export default Layout;