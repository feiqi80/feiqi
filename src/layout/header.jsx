import React, { Component } from "react";
import male from  "../assets/img/male.png"

class Header extends Component {
  render() {
    return (
      <div className="top-bar">
          <div className="div-userpic"> 
            <img src={male} alt="" />
            <span className="arrow arrow-up">▲</span>
            <span className="arrow arrow-down">▼</span>
            <div className="menu">
              <span>退出</span>
            </div>
          </div>
      </div>
    )
  }
}

export default Header;