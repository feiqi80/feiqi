import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Leftbar extends Component {
  tempObj = ""; // 根据path匹配的菜单对象

  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        { id: 1, name: "菜单1", isExpand: false, pid: 0, url: "", isChildMenu: 0, children: [
            { id: 2, name: "菜单1-1", isActive: false, pid: 1, url: "/demoa", isChildMenu: 1, },
            { id: 3, name: "菜单1-2", isActive: false, pid: 1, url: "/demob", isChildMenu: 1, },
          ]
        },
        { id: 4, name: "菜单2", isActive: false, pid: 0, url: "/calc", isChildMenu: 0, },
        { id: 5, name: "菜单3", isActive: false, pid: 0, url: "/game", isChildMenu: 0, },
        { id: 6, name: "菜单4", isExpand: false, pid: 0, url: "", isChildMenu: 0, children: [
          { id: 7, name: "菜单4-1", isActive: false, pid: 6, url: "/intro", isChildMenu: 1, },
        ]
      },
      ]
    };    
  }
  /**
   * 页面加载前（只在第一次加载或刷新时触发）
   */
  componentWillMount() {
    console.log("将要加载页面",);
    let path = this.props.location.pathname;
    this.resetState(path);
  } 
  /**
   * 进入页面前将要接收的参数（只在路由跳转、前进/后退时触发）
   * @param  props  接受的参数 
   */
  componentWillReceiveProps(props) {
    console.log("将要接受props", props);
    let path = props.location.pathname;
    this.resetState(path);
  }
  /**
   * 在刷新、前进、后退时重新设置菜单的状态
   * queryMenuByUrl: 先根据path获取匹配的菜单对象赋给tempObj，此方法顺便重置了菜单的isActive和isExpand
   * setMenuList:    再根据菜单对象设置匹配当前路由的菜单
   * @param  path    当前路径 
   */
  resetState(path) {
    let list = this.queryMenuByUrl(this.state.menuList, path),
        arr = this.setMenuList(list, this.tempObj, (path.length === 1));
    this.setState({
      menuList: arr
    })
  }

  /**
   * 根据path获取匹配的菜单对象赋给tempObj，顺便重置了菜单的isActive和isExpand
   * @param  list  菜单数组 
   * @param  url   当前路径
   */
  queryMenuByUrl(list, url) {
    let arr = list.map((one, i) => {
      if (one.url === url) {
        this.tempObj = one;
        one.isActive = true;
      } else {
        if (one.children) {
          if (url.length === 1) { // 当前路径为主页时关闭所有的isExpand，其他页面不关闭
            one.isExpand = false;
          }           
          this.queryMenuByUrl(one.children, url);
        } else {
          one.isActive = false;
        }
      }      
      return one;
    });
    return arr;
  }
  /**
   * 点击菜单事件
   * 有子菜单则展开/关闭，否则就进入路由
   * @param  obj  当前菜单 
   */
  clickMenu = (obj, e) => {
    let ev = e || window.event;
    ev.stopPropagation();
    let list = "";
    if (obj.children) {
      obj.isExpand = !obj.isExpand;
    } else {
      obj.isActive = true;
      this.props.history.push(obj.url);
      list = this.setMenuList(this.state.menuList, obj);
    }
    this.setState({
      menuList: list ? list : this.state.menuList
    });
  }
  /**
   * 根据菜单对象设置匹配当前路由的菜单
   * @param  list        菜单列表
   * @param  obj         当前菜单对象
   * @param  isMainPage  如果是主页，不展开子菜单; 否则匹配pid的则展开子菜单
   */
  setMenuList(list, obj, isMainPage) {
    let arr = list.map((one, i) => {
      if (one.id === obj.pid && !isMainPage) {
        one.isExpand = true;
      }   
      if (one.id !== obj.id) {
        one.children ? this.setMenuList(one.children, obj) : one.isActive = false;
      }
      return one;
    });
    return arr;
  }

  render() {
    return (
      <MenuItem list={this.state.menuList} onClickMenu={this.clickMenu} />
    )
  }
}

class MenuItem extends Component {
  list;
  constructor(props) {
    super(props);
    this.list = props.list;
  }

  render() {
    const menu = this.list.map((one, i) => {
      return (
        <div key={i} className={(one.isActive ? "active" : "") + (one.isChildMenu ? " child-menu" : "") + (one.children ? "" : " no-child")} onClick={(e) => this.props.onClickMenu(one, e)}>
          <div className={one.isChildMenu ? "" : "has-child"}>
            {one.name}
          </div>
          {one.isExpand 
            ?
            <div>
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