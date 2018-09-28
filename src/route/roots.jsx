import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from '../page/nine-square';
import Intro from '../page/intro';
import CalcTemp from '../page/calcTemp';
import Leftbar from "../layout/left-bar";
import {DemoA, DemoB}  from "../page/demoPage";

const Main = () => <div><h1>hellow, world!</h1></div>

class Roots extends Component {
  render() {
    return (
      <Router>
        <div className="section">
          <div className="section-left">
            <Leftbar />
          </div>
          <div className="section-right">            
            <Route exact path="/" component={Main} />
            <Route exact path="/intro" component={Intro} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/calc" component={CalcTemp} />
            <Route exact path="/demoa" component={DemoA} />
            <Route exact path="/demob" component={DemoB} />
          </div>
        </div>
    </Router>
    )
  }
}

export default Roots;