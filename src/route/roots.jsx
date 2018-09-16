import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from '../page/nine-square';
import Intro from '../page/intro';
import CalcTemp from '../page/calcTemp';

const Main = () => <div><h1>hellow, world!</h1></div>

class Roots extends Component {
  render() {
    return (
      <Router>
        <div className="section-right">
          <Route exact path="/" component={Main} />
          <Route exact path="/intro/:id" component={Intro} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/calc" component={CalcTemp} />
        </div>
    </Router>
    )
  }
}

export default Roots;