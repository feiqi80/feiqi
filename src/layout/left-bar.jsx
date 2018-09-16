import React, { Component } from "react";

class Leftbar extends Component {
    menu = {
        children: [
            {name: "菜单1", url: "", isExpand: false, children: [
                {name: "菜单1的子菜单", url: "/intro/:id"},
            ]},
            {name: "菜单2", url: "/calc"},
            {name: "菜单3", url: "/game"}
        ] 
    }    

    clickMenu() {

    }
    
    expandMenu = (obj) => {        
        console.log(obj.isExpand);
        let list = this.state.menuList.map((one, i) => {
            if (!i) {
                one.isExpand = !one.isExpand;
            }
            return one;
        });
        this.setState({
            menuList: list
        });
    }

    render() {
        return (
            <div className="section-left">
                <MenuItem menu={this.menu} />
            </div>
        )
    }
}

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: props.menu
        }
        console.log(this.state.menu.name);
    }

    expandMenu(obj) {
        // console.log(event);
        // let ev = window.event;
        // ev.stopPropagation();
        // ev.nativeEvent.stopImmediatePropagation();
        obj.isExpand = !obj.isExpand;
        this.setState({
            menu: obj
        })
    }

    gotoPage(url, e) {
        let ev = e || window.event;
        ev.stopPropagation();
        console.log(url);
    }

    render() {
        const list = this.state.menu.children;
        console.log(list);
        let divList = "";
        if (list && list.length) {
            divList = list.map((one, i) => {
                return (               
                    <MenuItem menu={one} key={i} />
                )
            });
        }        
        return(
            <div>
                {!this.state.menu.name
                    ? divList
                    :
                    <div>
                    {this.state.menu.children
                        ?
                        <div onClick={ () => this.expandMenu(this.state.menu)}>
                            {this.state.menu.name}
                            {this.state.menu.isExpand
                                ? divList
                                : null 
                            }                                               
                        </div>
                        :
                        <div onClick={ (e) => this.gotoPage(this.state.menu.url, e)}>
                            {this.state.menu.name}
                        </div>
                    }
                    </div>
                    
                    
                }
            </div>           
        )
    }
}

export default Leftbar;