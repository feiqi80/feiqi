import React, { Component } from 'react';

class ModalBody extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.opt = this.props.options;
  }


  submitParam() {
    let a = this.props.options.params;
    a++;
    console.log(a);
    this.opt.okBtn(a);
  }

  render() {
    const button = <div className="modal-footer">
                    {this.opt.type === "alert"
                      ? <button onClick={this.opt.closeBtn}>确定</button>
                      : [<button key="btnOk" onClick={() => this.submitParam()}>点击点击</button>,
                        <button key="btnClose" onClick={this.opt.closeBtn}>确定</button>]                  
                    }
                   </div>



    return (
      <div className="modal-layer">
        <div className="modal-header">

        </div>
        <div className="modal-body">

        </div>
        {button}
      </div>
    )
  }
  
}

export default ModalBody;