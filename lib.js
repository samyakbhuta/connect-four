var ConnectFour = function (player1, player2) {
	this.columns = [];
	this.players = [player1, player2];

	// change it to currentPlayerIndex?;
	this.currentTurn = 0;
	for ( var i = 0 ; i <= 6 ; i++ ) {
		this.columns[i]=[];
	}
}

ConnectFour.prototype.displayMatrix = function () {
	var self = this;
	var matrixStr = '';
	this.columns.map( function (column, i) {
		matrixStr += '\n';
		matrixStr += self.displayColumn(i);
	});

	return matrixStr;
}

ConnectFour.prototype.displayColumn = function (column) {
	return this.columns[column].join('\t');
}

ConnectFour.prototype.currentPlayer = function () {
	return this.players[this.currentTurn];
}

ConnectFour.prototype.turn = function () {
	this.currentTurn === this.players.length-1 ?
		this.currentTurn = 0 : this.currentTurn++;
}

ConnectFour.prototype.drop = function (str, column) {

	// Returning 0 indicates the column was already filled up with discs.
	return this.columns[column].length === 6 ?
		0 : this.columns[column].push(str);	
}

ConnectFour.prototype.dropByCurrentPlayer = function (column) {
	var addedToRow = this.drop(this.currentPlayer(),column);
	if ( addedToRow > 0 ) {
		var isWin = this.checkConnectivity(column, addedToRow - 1);
		return isWin ? this.currentPlayer() : this.turn();
	}
}

ConnectFour.prototype.checkConnectivity = function (column, row) {
	console.log('I should check connectivity in all directions.');

	var self = this;
	var directions = [	[-1,-1],	// South-West
						[-1, 0],	// West
						[-1, 1],	// North-West
						[ 0,-1],	// South
						// [ 0, 0],	// Non Direction
						// [ 0, 1],	// North, Not Needed
						[ 1,-1],	// South-East
						[ 1, 0],	// East
						[ 1, 1],	// North-East
	];

	var results = directions.map( function (direction) {
		var discArray = self.traverse(column, row, 4, direction[0], direction[1]);
		if ( discArray.length < 4 )
			return false;
		var isIdentical = discArray.every( function(disc) {
			return ( disc === discArray[0]);
		});
		console.log('is it all identical ? - %s', isIdentical);
		return isIdentical;
	})

	console.log('Results ' + results);
	console.log('I checked connectivity in all directions.');
}

ConnectFour.prototype.traverse = function (column, row, length, hDir, vDir) {
	console.log('I should traverse in [%s,%s] direction from [%s,%s] - %s steps', 
			hDir, vDir, column, row, length);
	var returnArr = [];
	for ( var i = 0 ; i < length ; i++ ) {
		if (this.columns[column + (hDir*i)]) {
			returnArr.push(this.columns[column + (hDir*i)][row + (vDir*i)]);
		}
	}
	return returnArr;
}


// ConnectFour.prototype.traverseSouth = function (column, row, length) {
// 	console.log('I should traverse south from [%s,%s] - %s steps', 
// 			column, row, length);
// 	var returnArr = [];
// 	for ( var i = 0 ; i < length ; i++ ) {
// 		returnArr.push(this.columns[column][row-i]);
// 	}
// 	return returnArr;
// }


// ConnectFour.prototype.traverseSouthEast = function (column, row, length) {
// 	console.log('I should traverse south-east from [%s,%s] - %s steps', 
// 			column, row, length);
// 	var returnStr = '';
// 	for ( var i = 0 ; i < length ; i++ ) {
// 		returnStr += this.columns[column+i][row-i];
// 	}
// 	return returnStr;
// }

// ConnectFour.prototype.traverseSouthWest = function (column, row, length) {
// 	console.log('I should traverse south-west from [%s,%s] - %s steps', 
// 			column, row, length);
// 	var returnStr = '';
// 	for ( var i = 0 ; i < length ; i++ ) {
// 		returnStr += this.columns[column-i][row-i];
// 	}
// 	return returnStr;
// }

exports.ConnectFour = ConnectFour;