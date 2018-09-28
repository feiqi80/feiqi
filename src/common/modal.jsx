import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Modal() {
  class Portal extends Component {    
    constructor(props) {    
      super(props);  
      console.log(props); 
      this.el = document.createElement('div');    
      if (props) {    
        this.el.id = props.id || "modal";    
        if (props.className) {
          this.el.className = props.className || "modal";
        }     
        if (props.style) {
          Object.keys(props.style).map((v) => {
            this.el.style[v] = props.style[v];
            return null;
          });
        }
        this.el.onclick = props.showModal;    
        document.body.appendChild(this.el);
      }    
    }

    componentDidMount() {
      document.body.appendChild(this.el);
    }
    
    componentWillUnmount() {    
      document.body.removeChild(this.el);    
    }
    
    render() {    
      return ReactDOM.createPortal(    
        this.props.children,    
        this.el    
      )    
    }    
  }
  Portal.propTypes = {    
    style: PropTypes.object   
  }   
  return Portal;
}

export default Modal();