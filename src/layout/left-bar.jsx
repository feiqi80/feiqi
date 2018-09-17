import React, { Component } from "react";

class Leftbar extends Component {
  constructor() {
    super();
    this.state = {
      menuList: [
        {id: 1, name: "菜单1", url: "", isExpand: false, children: [
            {id: 2, name: "菜单1的子菜单", isActive: false, url: "/intro/:id"},
          ]
        },
        {id: 3, name: "菜单2", isActive: false, url: "/calc"},
        {id: 4, name: "菜单3", isActive: false, url: "/game"}
      ]
    }
  }
    
  expandMenu = (obj, e) => {
    let ev = e || window.event;
    ev.stopPropagation();
    let list = this.getSelectMenu(this.state.menuList, obj.id);
    this.setState({
      menuList: list
    });
  }

  getSelectMenu(list, id) {
    let arr = list.map((one, i) => {
      if (one.id === id) {
        one.children ? one.isExpand = !one.isExpand : one.isActive = true;
      } else {
        one.children ? this.getSelectMenu(one.children, id) : one.isActive = false;
      }
      return one;
    });
    return arr;
  }

  render() {
    return (
      <div className="section-left">
        <MenuItem list={this.state.menuList} onClickMenu={this.expandMenu} />
      </div>
    )
  }
}

class MenuItem extends Component {
  list;
  constructor(props) {
    super(props);
    console.log(props);
    this.list = props.list;
  }

  render() {
    const menu = this.list.map((one, i) => {
      return (
        <div key={i} className={one.isActive ? "active" : ""} onClick={(e) => this.props.onClickMenu(one, e)}>
          {one.name}
          {one.isExpand
            ?
            <div className="child-menu">
              <MenuItem list={one.children} onClickMenu={this.props.onClickMenu} />
            </div>
            : null
          }
        </div>
      )
    });
    return menu;
  }
}

export default Leftbar;