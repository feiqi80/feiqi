import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => <div><h1>Home</h1></div>;
const About = () => <div><h1>About</h1></div>;
const Contact = () => <div><h1>Contact</h1></div>;

// const Links = () => 
//   <nav>
//     <Link to="/">{Home}</Link>
//     <Link to="/about">{About}</Link>
//     <Link to="/contact">{Contact}</Link>
//   </nav>;

class Nav extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">主页</Link></li>
            <li><Link to="/about">关于我们</Link></li>
            <li><Link to="/contact">联系</Link></li>
          </ul>
          <hr/>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </div>
      </Router>
    );
  }
}

export default Nav;