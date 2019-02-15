import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateHorizontalLines(lines, boardSize) {
	for (let i = 0; i < boardSize; i++) {
		let line = [];

		for (let j = 0; j < boardSize; j++) {
			line.push((boardSize * i) + j);
		}

		lines.push(line);
	}
}

function calculateVerticalLines(lines, boardSize) {
	for (let i = 0; i < boardSize; i++) {
		let line = [];

		for (let j = 0; j < boardSize; j++) {
			line.push((boardSize * j) + i);
		}

		lines.push(line);
	}
}

function calculateDiagonalLines(lines, boardSize) {
	for (let i = 0; i < 2; i++) {
		let line = [];
		
		for (let j = 0; j < boardSize; j++) {
			line.push((+boardSize + (1 - (2 * i))) * (i + j));
		}

		lines.push(line);
	}
}

function calculateWinner(squares, boardSize) {
	let lines = [];

	calculateHorizontalLines(lines, boardSize);
	calculateVerticalLines(lines, boardSize);
	calculateDiagonalLines(lines, boardSize);

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

function Status(props) {
	let status;

	if (!props.winner && props.stepNumber >= (props.boardSize * props.boardSize)) {
		status = 'Draw'
	} else if (props.winner) {
		status = 'Winner: ' + props.winner.player;
	} else {
		status = 'Next player: ' + (props.xIsNext ? 'X' : 'O');
	}

	return (
		<div className="status">
			{status}
		</div>
	)
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
		const squares = history[history.length - 1].squares.slice();

		if (calculateWinner(squares, this.state.boardSize) || squares[i]) {
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
			boardSize: this.state.newBoardSize,
		});
	}

	setBoardSize(e) {
		const value = e.target.value;
		const regex = /^\d+$/;
		const valid = value.match(regex);

		this.setState({
			boardSizeValid: valid,
			newBoardSize: valid ? value : this.state.boardSize,
		});
	}

	render() {
		const squares = this.state.history[this.state.stepNumber].squares;
		const winner = calculateWinner(squares, this.state.boardSize);
		const sortButton = this.state.reversed ? 
			'Sort ascending' : 
			'Sort descending';

		const moves = this.state.history.map((step, m) => {
			const move = this.state.reversed ? this.state.history.length - 1 - m : m;
			const desc = move ? 
				'Go to move #' + move + ' (' + this.state.location[move].col + ',' + this.state.location[move].row + ')' : 
				'Go to game start';

			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		});

		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={squares}
						onClick={(i) => this.handleClick(i)}
						winner={winner}
						clicked={this.state.clicked}
						boardSize={this.state.boardSize}/>
				</div>
				<div className="game-info">
					<Status 
						winner={winner} 
						stepNumber={this.state.stepNumber} 
						boardSize={this.state.boardSize} 
						xIsNext={this.state.xIsNext}/>
					<div className="buttons">
						<input 
							type="tel" 
							placeholder={this.state.boardSize} 
							onChange={(e) => this.setBoardSize(e)}/>
						<button 
							onClick={(e) => this.changeBoardSize(e)} 
							disabled={!this.state.boardSizeValid}>
							Change board size
						</button>
						<button onClick={() => this.reverseOrder()}>
							{sortButton}
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
