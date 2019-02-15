import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares, boardSize) {
	let lines = [];

	for (let i = 0; i < boardSize; i++) {
		let line = [];

		for (let j = 0; j < boardSize; j++) {
			let id = (boardSize * i) + j;
			line.push(id);
		}

		lines.push(line);
	}

	for (let i = 0; i < boardSize; i++) {
		let line = [];

		for (let j = 0; j < boardSize; j++) {
			let id = (boardSize * j) + i;
			line.push(id);
		}

		lines.push(line);
	}

	let inclineLeft = [];

	for (let i = 0; i < boardSize; i++) {
		let id = (+boardSize + 1) * i;
		inclineLeft.push(id);
	}

	lines.push(inclineLeft);

	let inclineRight = [];

	for (let i = 0; i < boardSize; i++) {
		let id = (boardSize - 1) * (i + 1);
		inclineRight.push(id);
	}

	lines.push(inclineRight);

	console.log(lines);

	console.log(squares);

	for (let i = 0; i < lines.length; i++) {
		let hasWon = true;
		let currentLine = lines[i];
		let lineOwner = squares[currentLine[0]];

		for (let j = 1; j < lines[i].length; j++) {
			let currentSquare = squares[currentLine[j]];

			if (!hasWon || !lineOwner || currentSquare !== lineOwner) {
				hasWon = false;
			}
		}

		if (hasWon) {
			return {
				player: lineOwner,
				line: currentLine,
			}
		}
	}
	
	return null;
}

function Square(props) {
	let style;

	if (props.status === 'winner') {
		style = {
			backgroundColor: 'crimson',
			color: 'white',
		};
	} else if (props.status === 'clicked') {
		style = {
			color: 'crimson',
		};
	}
	
	return (
		<button className="square" onClick={props.onClick} style={style}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		let status;

		if (this.props.winner && this.props.winner.line.includes(i)) {
			status = 'winner';
		} else if (this.props.clicked === i) {
			status = 'clicked';
		}

		return (
			<Square 
				value={this.props.squares[i]} 
				onClick={() => this.props.onClick(i)}
				status={status}
				key={i}
			/>
		);
	}

	render() {
		const boardSize = this.props.boardSize;
		let board = [];

		for (let i = 0; i < boardSize; i++) {
			let boardRows =[];

			for (let j = 0; j < boardSize; j++) {
				boardRows.push(this.renderSquare(boardSize * i + j));
			}

			board.push(<div className="board-row" key={i}>{boardRows}</div>);
		}

		return (
			<div>
				{board}
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			location: [{
				col: null,
				row: null,
			}],
			stepNumber: 0,
			xIsNext: true,
			clicked: null,
			reversed: false,
			boardSize: 3,
			newBoardSize: 3,
			boardSizeValid: false,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const location = this.state.location.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const boardSize = this.state.boardSize;

		if (calculateWinner(squares, boardSize) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';
		
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			location: location.concat([{
				col: (i % 3),
				row: (Math.floor(i / 3)),
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		})
	}

	jumpTo(step) {
		const location = this.state.location[step];

		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
			clicked: location.col + (3 * location.row),
		});
	}

	reverseOrder() {
		this.setState({
			reversed: !this.state.reversed,
		});
	}

	resetGame() {
		this.setState({
			history: [{
				squares: Array(9).fill(null),
			}],
			location: [{
				col: null,
				row: null,
			}],
			stepNumber: 0,
			xIsNext: true,
			clicked: null,
			reversed: false,
		});
	}
	
	changeBoardSize(e) {
		e.preventDefault();
		let newBoardSize = this.state.newBoardSize;

		this.resetGame();

		this.setState({
			boardSize: newBoardSize,
		});
	}

	setBoardSize(e) {
		let value = e.target.value;
		let validity = false;
		let size = this.state.boardSize;
		const regex = /^\d+$/;

		if (value.match(regex)) {
			validity = true;
			size = value;
		}

		this.setState({
			boardSizeValid: validity,
			newBoardSize: size,
		});
	}

	render() {
		const history = this.state.history;
		const location = this.state.location;
		const reversed = this.state.reversed;
		const clicked = this.state.clicked;
		const current = history[this.state.stepNumber];
		const boardSize = this.state.boardSize;
		const winner = calculateWinner(current.squares, boardSize);

		const moves = history.map((step, move) => {
			if (reversed) {
				move = history.length - 1 - move;
			}

			const coords = '(' + location[move].col + ',' + location[move].row + ')';
			const desc = move ? 'Go to move #' + move + ' ' + coords : 'Go to game start';

			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		});

		let status;

		if (!winner && this.state.stepNumber >= (boardSize * boardSize)) {
			status = 'Draw'
		} else if (winner) {
			status = 'Winner: ' + winner.player;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		let order;

		if (reversed) {
			order = 'Sort ascending';
		} else {
			order = 'Sort descending';
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
						winner={winner}
						clicked={clicked}
						boardSize={boardSize}
					/>
				</div>
				<div className="game-info">
					<div className="status">
						{status}
					</div>
					<div className="buttons">
						<input type="tel" placeholder={this.state.boardSize} onChange={(e) => this.setBoardSize(e)}/>
						<button onClick={(e) => this.changeBoardSize(e)} disabled={!this.state.boardSizeValid}>
							Change board size
						</button>
						<button onClick={() => this.reverseOrder()}>
							{order}
						</button>
						<button onClick={() => this.resetGame()}>
							Reset game
						</button>
					</div>
					<ol>
						{moves}
					</ol>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
