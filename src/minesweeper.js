class Game {
	constructor (numberOfRows, numberOfColumns, numberOfBombs) {
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	playMove(rowIndex, columnIndex) {
		this._board.flipTile(rowIndex, columnIndex);
		if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
			console.log('The game is over.');
			this._board.print();
		}

		else if (this._board.hasSafeTiles() === 0) {
			console.log('You win!');
		}
		else {
			console.log('Current Board: ');
			this._board.print();
		}
	}
}



class Board {
	constructor (numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard () {
		return this._playerBoard;
	}


	flipTile(rowIndex, columnIndex) {
	if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped!')
		return;
	}
	else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
		this.playerBoard[rowIndex][columnIndex] = 'B';
	}
	else {
		this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
	}
	this._numberOfTiles--;
	};


	getNumberOfNeighborBombs(rowIndex, columnIndex) {
	const neighborOffsets = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0,1],
		[1,-1],
		[1,0],
		[1,1]
	];

	let numberOfRows = this._bombBoard.length;
	let numberOfColumns = this._bombBoard[0].length;
	let numberOfBombs = 0;

	neighborOffsets.forEach(offset => { 
		let neighborRowIndex = rowIndex + offset[0]; 
		let neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
			if (bombBoard[neighborRowIndex[neighborColumnIndex]] == 'B') {
				numberOfBombs ++;
			} 
		}
	});

	return numberOfBombs;
	};

	hasSafeTiles () {
		return this._numberOfTiles !== this._numberOfBombs; 
	};

	print() { 
		console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
	};


	static generatePlayerBoard(numberOfRows, numberOfColumns) {
	const board = [];
	for (let i = 0; i < numberOfRows; i++) {
		const row = [];
		for (let j = 0; j < numberOfColumns; j++) {
			row.push(' ');
		}
		board.push(row);
	}
	return board;
	};

	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
	const board = [];
	for (let i = 0; i < numberOfRows; i++) {
		const row = [];
		for (let j = 0; j < numberOfColumns; j++) {
			row.push(null);
		}
		board.push(row);
	}
	
	let numberOfBombsPlaced = 0;
	while (numberOfBombsPlaced < numberOfBombs) {
		let randomRowIndex = Math.floor(Math.random() * numberOfRows);
		let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
		if (board[randomRowIndex][randomColumnIndex] !== 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced ++;
		}
		board[randomRowIndex][randomColumnIndex] = 'B';
		numberOfBombsPlaced ++;
	}

	return board;
	};

};

let playerBoard = new Board(3,4);
let bombBoard = new Board (3,4,5);

console.log('Player Board: ');
playerBoard.print(playerBoard);
console.log('Bomb Board: ');
playerBoard.print(bombBoard);

//playerBoard.flipTile(playerBoard, bombBoard, 0, 0);
//console.log('Updated Player Board: ');
//playerBoard.print(playerBoard);

const g = new Game(3, 3, 3);
g.playMove(2,2);



