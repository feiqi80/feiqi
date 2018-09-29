import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import ModalBody from "./modal_body";

  class Modal extends Component {    
    constructor(props) {    
      super(props);  
      console.log(props);     
    }

    componentDidMount() {
    }
    
    componentWillUnmount() {  
    }
    
    render() {    
      return [    
        <div key="modal" className="modal" onClick={this.props.options.closeBtn}></div>,
        <ModalBody key="modal-body" options={this.props.options} />
      ]    
    }    
  }

export default Modal;