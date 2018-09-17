import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Leftbar extends Component {
  constructor(props) {
    super(props);
    console.log(props);    
    this.state = {
      menuList: [
        { id: 1, name: "菜单1", url: "", isExpand: false, children: [
            {id: 2, name: "菜单1的子菜单", isActive: false, url: "/intro/:id"},
          ]
        },
        { id: 3, name: "菜单2", isActive: false, url: "/calc" },
        { id: 4, name: "菜单3", isActive: false, url: "/game" },
        { id: 5, name: "菜单6", url: "", isExpand: false, children: [
          {id: 6, name: "菜单6的子菜单", isActive: false, url: "/intro/:id"},
        ]
      },
      ]
    };
    
  }

  componentWillMount() {
    console.log("将要加载页面");
    if (this.props.location.pathname.length > 1) {
      let list = this.getSelectMenu(this.state.menuList, this.props.location.pathname, 1);
      this.setState({
        menuList: list
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const locationChanged = nextProps.location !== this.props.location;
    console.log(locationChanged);
  }
    
  expandMenu = (obj, e) => {
    let ev = e || window.event;
    ev.stopPropagation();
    let list = this.getSelectMenu(this.state.menuList, obj.url);
    this.setState({
      menuList: list
    });
  }

  getSelectMenu(list, url, isRefresh, upObj) {
    let arr = list.map((one, i) => {
      if (one.url === url) {
        if (one.children) {
          one.isExpand = !one.isExpand;
        } else {
          one.isActive = true;
          if (upObj) {
            upObj.isExpand = true;
          }
          if (!isRefresh) {
            this.props.history.replace(one.url);
          }          
        }
      } else {
        one.children ? this.getSelectMenu(one.children, url, isRefresh, one) : one.isActive = false;
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

export default withRouter(Leftbar);