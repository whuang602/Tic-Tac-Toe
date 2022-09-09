import React, {useState} from "react";
import * as ReactDOM from "react-dom";
import * as styles from "./styles/styles.css";
import PageID from "./PageID.js"

function Square(props) {
  var sqName = "square";

  if (props.isWinningSquare)
    sqName = "winningSquare";

  if ( props.value == "X" )
    sqName = sqName + "1"
  else
    sqName = sqName + "2"
  return(
    <button
      className={sqName}
      onClick={props.onClick}>
        {props.value}
      </button>

  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      squares: Array(9).fill(null),
      xIsNext: props.xFirst,
      winner: props.winner,
      name1: props.name1,
      name2: props.name2,
      counter:0,
    };
    this.setWinner = props.setWinner;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if ( calculateWinner(squares))
    {
      this.setWinner(calculateWinner(squares));
      return;
    }
    if (squares[i])
      return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      counter:this.state.counter+1,
    });
  }


  renderSquare(i,winning3) {
    var isWin = false;
    if ( winning3.indexOf(i) > -1 )
    {
      isWin=true;
      console.log("hello1")
    }

    return ( 
      <Square 
        value={this.state.squares[i]}
        isWinningSquare={isWin}
        onClick={() => this.handleClick(i)}
      />
    );
  }


  render() {
    const winner = calculateWinner(this.state.squares);
    var winning3 = [];
    let status;
    if (winner)
    {
      winning3=calculateWinnerSquares(this.state.squares);
      this.setWinner(winner)
      status = "GAMEOVER";
    }
    else
    {
      if ( this.state.counter == 9)
      {
        this.setWinner("=");
        status = "It's a stalemate!";
      }
      else
      {
        status = 'Next player: ' + (this.state.xIsNext? this.state.name1 + ' (X)' : this.state.name2 +' (O)');
      }
    }


    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0,winning3)}
          {this.renderSquare(1,winning3)}
          {this.renderSquare(2,winning3)}
        </div>
        <div className="board-row">
          {this.renderSquare(3,winning3)}
          {this.renderSquare(4,winning3)}
          {this.renderSquare(5,winning3)}
        </div>
        <div className="board-row">
          {this.renderSquare(6,winning3)}
          {this.renderSquare(7,winning3)}
          {this.renderSquare(8,winning3)}
        </div>
      </div>
    );
  }
}


// helper function to determine the winner
// establishes a series of winning patterns (horizontal, vertical, diagonal lines of 3)
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

function calculateWinnerSquares(squares) {
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
      return lines[i];
    }
  }
  return null;
}

function App() {
  const [winner, setWinner] = useState(0);
  const [pageID, setPageID] = useState(PageID.Menu);
  const [name1, setName1] = useState("Anne");
  const [name2, setName2] = useState("Ben");
  const [xFirst, setXFirst] = useState(true);
  
    return (
      <div>

        {/* Starting Menu Page */}
        { pageID==PageID.Menu && 
        <div className="start-game">
          <h1> Tic-Tac-Toe </h1>
          <h6>v. 1.0</h6>
          <div style={{margin:20}}>
            <button onClick={() => setPageID(PageID.Game)}> Start Game </button>
          </div>
          <div>
            <button onClick={() => setPageID(PageID.Options)}> Options </button>
          </div>
          <h2> W.H. </h2>
        </div> 
        }

        {/* Game Page */}
        { pageID == PageID.Game &&
        <div className="game">
          
          { winner != "=" && winner != "O" && winner != "X" && <div className="quit">
            <button onClick={() => {setWinner(0) ; setPageID(PageID.Menu)}}> Quit </button>
          </div>}

          { winner != "=" && (winner == "O" || winner == "X") && <div className="quit">
            <button> Quit </button>
          </div>}

          { winner == "=" && <div className="quit">
            <button onClick={() => {setWinner(0) ; setPageID(PageID.Menu)}}> Restart </button>
          </div>}

          <div className="game-header">
          <h2> {"Tic-Tac-Toe"}</h2>
          </div>

          <div className="game-board">
            <Board name1={name1} name2={name2} xFirst={xFirst} winner={winner} setWinner={setWinner}/>
          </div>

          {winner != 0 && winner != null && winner != "=" && setTimeout(()=>setPageID(PageID.WinPage),3500)}

        </div> }


        {/* Options Page */}
        { pageID == PageID.Options &&
        <div className="options-page">
          <div>
          <button className="save" onClick={() => setPageID(PageID.Menu)}> Save </button>
          <h2> Options </h2>
            </div>

          <div className="name-label">
          <label > Player X: 
          </label>
          
          <label> Player O:
          </label>
          </div>
          
          <div>
            <label className="optionChoiceNames"> Change Player Name </label>
            <input className="name-box"
              type="text"
              placeholder="default: Anne"
              onChange={(e)=>setName1(e.target.value)} />
            <input className="name-box"
              type="text"
              placeholder="default: Ben"
              onChange={(e)=>setName2(e.target.value)} />

            </div>

          <div>
            <label className="optionChoiceNames"> Play Order (default: X)</label>
            <button className="who-first-button" onClick={()=>setXFirst(true)}> X </button>
            <button className="who-first-button" onClick={()=>setXFirst(false)}> O </button>
          </div>


        </div> }

        {/* Winning Page */}
        { pageID==PageID.WinPage &&
          <div className="winning-page">

            <div className="restart">
              <button onClick={()=>{setWinner(0);setPageID(PageID.Menu)}}> Restart </button>
            </div>

            <div className="game-header">
              <h2> {"Tic-Tac-Toe"}</h2>
            </div>

            {(winner=="X" && setWinner(name1))|| (winner=="O" && setWinner(name2))}

            <div className="winning-text">
              <h3> CONGRATULATIONS </h3>
              <text > PLAYER </text>
              <text className="winner"> <text className="brackets">{""}</text> <u>{winner}</u> <text className="brackets">{""}</text></text>
              <text> WINS!  </text>
            </div>
          </div>
        }

      </div>
      
    );
}


// ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
export default App;

