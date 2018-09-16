import React, { Component } from "react";

class Leftbar extends Component {
    constructor() {
        super();
        this.state = {
            menuList: [
                {name: "菜单1", url: "", isExpand: false, children: [
                    {name: "菜单1的子菜单", url: "/intro/:id"},
                ]},
                {name: "菜单2", url: "/calc"},
                {name: "菜单3", url: "/game"}
            ]
        }
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
        const menu = this.list.map( (one, i) => {
            return (
                <div key={i}>
                    {one.children
                        ?                
                        <div onClick={() => this.props.onClickMenu(one)}>
                            {one.name}
                            {one.isExpand
                                ? <MenuItem list={one.children} />
                                : null
                            }
                            
                        </div>
                        :
                        <div>{one.name}</div>
                    }
                </div>
            )
        });
        return menu;
    }
}

export default Leftbar;