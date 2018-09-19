import React, { Component } from 'react';

// 组件小方格

/**函数式组件
 * 是一种更简单的方法来编写只包含 render 方法且没有自己 state(状态) 的组件。
 * 而不是定义一个 React.Component 的扩展类， 我们可以编写一个函数，它将 props 作为输入，并返回应该渲染的内容。
 * @param {*} props 
 */
function Square(props) {
  return (
    <button style={{width: "30px", height: "30px", padding: 0}} onClick={props.onClick}>
      {props.value ? `${props.value}${props.type}` : ''}
    </button>
  );
}

// 外层组件，组合小方格
class Board extends Component {

  renderSquare(i) {
    let obj = {
      num: i,
      type: "【】【】"
    }
    return (
      <Square
        value={this.props.squares[i]}
        type={`${i}`}
        onClick={() => this.props.onClick(obj)}
      />
    );
  }  

  render() {
    return (
      <div>
        <div style={{display: "flex"}}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div style={{display: "flex"}}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div style={{display: "flex"}}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

// 组件，最外层
class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      isNext: true,
      stepNumber: 0
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      isNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      isNext: !this.state.isNext,
      stepNumber: history.length,
    });
  }

  render() {
    console.log("走了一遍render");
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((ele, i) => {
      console.log(ele, i);
      const desc = i ?
        `回到第${i}步` :
        '回到开始';
      return (
        <li key={i}>
          <button onClick={() => this.jumpTo(i)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = '胜利者: ' + winner;
    } else {
      status = '下一个棋手: ' + (this.state.isNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(obj) => {
              this.handleClick(obj.num)}
            }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}