import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from '../page/nine-square';
import Intro from '../page/intro';
import CalcTemp from '../page/calcTemp';
import Leftbar from "../layout/left-bar";
import {DemoA, DemoB}  from "../page/demoPage";

const Main = () => <div><h1>hellow, world!</h1></div>

class Roots extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }
  
  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    const modal = this.state.showModal ? (
        <div className="modal">
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
    ) : null;

    return (
      <Router>
        <div className="section">
          <div className="section-left">
            <Leftbar />
          </div>
          <div className="section-right">
            <button onClick={this.handleShow}>测试弹窗</button>
            <Route exact path="/" component={Main} />
            <Route exact path="/intro" component={Intro} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/calc" component={CalcTemp} />
            <Route exact path="/demoa" component={DemoA} />
            <Route exact path="/demob" component={DemoB} />
          </div>
          {modal}
        </div>
    </Router>
    )
  }
}

export default Roots;