import React, { Component } from "react";
import http from "./httpUtil";

// 显示组件
function BoilingVerdict(props) {
  return (
    <p>{props.celsius >= 100 ? "水已沸腾" : "还没沸腾"}</p>
  )
}

// 输入组件
class CalcTempInput extends Component {
  tempName = {
    c: "摄氏度",
    f: "华氏度"
  }

  constructor() {
    super();
    this.state = {
      temperature: ""
    }
  }

  changeTemp(e) {
    let ev = e || window.event;
    console.log("method: " , ev.target.value)
    this.props.onTempChange(e.target.value);    
  }

  changeTp = (e) => {
    let ev = e || window.event;
    console.log("property: " , ev.target.value)
    this.props.onTempChange(e.target.value);    
  }

  render() {
    const temp = this.props.temperature;
    const type = this.props.type;
    return (
      <div>
        <div>输入{this.tempName[type]}</div>
        {/* <input type="text" value={temp} onChange={(event) => this.changeTemp(event)} /> */}
        <input type="text" value={temp} onChange={this.changeTp} />
      </div>      
    )
  }
}

// 父组件
class CalcTemp extends Component {
  constructor(props) {
    super();
    this.state = {
      temperature: "",
      type: "c"
    }
  }

  changeCel(value) {
    this.setState({
      temperature: value,
      type: "c"
    })
  }

  changeC = (value) => {
    this.setState({
      temperature: value,
      type: "c"
    })
  }

  changeFah(value) {
    this.setState({
      temperature: value,
      type: "f"
    })
  }

  changeF = (value) => {
    this.setState({
      temperature: value,
      type: "f"
    })
  }

  onQuery() {
    let opt = {
      url: "test/home",
      method: "post",
      async: false
    }
    console.log(typeof(opt.async));
    http(opt, {id: 100}, () => {}).then(data => {
      if (data) {
        return http(opt, {id: data.number}, () => {});
      }
    }).then(data => {
      console.log(data);
    });
  }

  componentDidMount() {
    // this.onQuery();
    console.log("进入页面");
  }

  render() {
    const type = this.state.type;
    const value = this.state.temperature;
    const celTemp = type === "f" ? tryConvert(value, type) : value;
    const fahTemp = type === "c" ? tryConvert(value, type) : value;
    return (
      <div>
        <CalcTempInput
          type="c"
          temperature={celTemp}
          // onTempChange={ (value) => this.changeCel(value) }
          onTempChange={ this.changeC }
        />
        <CalcTempInput
          type="f"
          temperature={fahTemp}
          // onTempChange={ (value) => this.changeFah(value) }
          onTempChange={ this.changeF }
        />
        <BoilingVerdict
          celsius={parseFloat(celTemp)}
        />
      </div>
    )
  }
}

export default CalcTemp;

function tryConvert(value, type) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = type === "f" ? ((input - 32) * 5 / 9) : ((input * 9 / 5) + 32);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}