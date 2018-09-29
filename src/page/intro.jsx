import React, { Component } from 'react';
import Modal from "../common/modal";

class Intro extends Component {

  constructor(props) {
    super();
    console.log(props.match.params);

    this.state = {
      companyName: "上海杰森斯坦森梁山粮食粮米有限责任公司",
      companyYear: "2019",
      cid: props.match.params.id ? props.match.params.id : 99999,
      userList: [
        {id: 1, name: "mary"},
        {id: 2, name: "billy"},
        {id: 3, name: "terry"},
        {id: 4, name: "andy"},
      ],
      isShowModal: false,
      num: 0,
    }
  }

  delUser(obj) {
    this.setState((prevState) => ({
        userList: prevState.userList.filter(one => one.id !== obj.id)
      })
    )
  }

  componentWillMount() {
    console.log("willmount");
  }

  changeCid(id) {
    console.log("cid = " + id);
    console.log(this);
    this.setState((prevState, props) => ({
        cid: prevState.cid + id
      })
    );   
  }

  renderList = (obj, index) => {
    return (
      <div key={index}>
        <span>ID：{obj.id}</span>
        <span>Name：{obj.name}</span>
        <span><button onClick={() => this.delUser(obj)}>删除用户</button></span>
      </div>              
    );
  }

  clickModal = () => {
    console.log("点击弹窗");    
    this.setState((prevState, props) => ({
        isShowModal: !prevState.isShowModal
      })
    );
  }

  okBtn = (param) => {
    console.log(param);
    this.setState({
      num: param
    });
  }

  render() {
    console.log("about render一次", this.state.isShowModal);
    const clickBtn = <button className="btn" onClick={() => this.changeCid(4)}>点击</button>; 
    const style = {
      width: "200px",
      height: "300px",
      background: "red"
    }
    let value = this.state.num;
    let options = {
      type: "confirm",
      title: "回传参数",
      okBtn: this.okBtn,
      closeBtn: this.clickModal,
      params: value,
      style: style
    }
    const modal = <div>
                    {this.state.isShowModal
                      ?<Modal options={options}>xxxxxxxxx</Modal>
                      :null
                    }
                  </div>

    return (
      <div className="App">        
        <div>公司名称： {this.state.companyName}</div>
        <div>公司id： {this.state.cid}</div>
        <button className="btn" onClick={() => this.changeCid(3)}>点击</button>
        { clickBtn }
        { this.renderList({id: 5, name: "xxpp"}, 8) }
        { this.state.userList.map(this.renderList) }
        { this.state.cid === 3 && "公司cid3"}
        { this.state.cid === 4  && "公司cid4"}
        <button onClick={this.clickModal}>测试弹窗</button>
        <div>弹窗回传的参数：{this.state.num}</div>
        {modal}
      </div>
    );
  }
}


export default Intro;