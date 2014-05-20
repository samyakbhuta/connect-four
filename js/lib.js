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

ConnectFour.prototype.getColumnsDOM = function () {
	var self = this;
	return this.columns.map( function (column, i) {
		return '<div class="column">' + self.getColumnDOM(i) + '</div>';
	}).join('');
}

ConnectFour.prototype.getColumnDOM = function (column) {
	return this.columns[column].map( function(i) {
		return '<div class="disc ' + i + '" >' + i + '</div>'
	}).reverse().join('');
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
		var isWin = this.checkConnectivity(column, addedToRow - 1, this.currentPlayer());
		return isWin ? this.currentPlayer() : this.turn();
	} else {
		// Attempted column was already filled.
		// Check if all columns are filled, return accordingly.
		var allColumnsFilled = this.columns.every(function(i){
			return i.length === 6;
		});
		return allColumnsFilled ? 'all-columns-filled' : 'column-filled';
	}
}

ConnectFour.prototype.checkContinuity = function (arr, value, continuity) {
	var result = arr.reduce(function (prev, current) {
		if ( prev === continuity ) {
			return prev;
		}

		if ( current === value ) {
			return ++prev;
		} else {
			return 0;
		}
	}, 0);
	return result === continuity;
}

ConnectFour.prototype.checkConnectivity = function (column, row, player) {
	console.log('I should check connectivity in all directions.');

	var result;

	if (this.checkContinuity(this.getColumn(column, row), player, 4))
		return true;
	if (this.checkContinuity(this.getRow(column, row), player, 4))
		return true;
	if (this.checkContinuity(this.getForwardDia(column, row), player, 4))
		return true;
	if (this.checkContinuity(this.getBackwardDia(column, row), player, 4))
		return true;

	return false;
}

ConnectFour.prototype.getColumn = function (column, row) {
	console.log('I should get column which contains [%s,%s]', column, row);
	return this.columns[column];
}

ConnectFour.prototype.getRow = function (column, row) {
	console.log('I should get row which contains [%s,%s]', column, row);
	var returnArr = [];
	for ( var i = 0 ; i < this.columns.length ; i++ ) {
		returnArr.push( this.columns[i][row] ? this.columns[i][row] : null);
	}
	return returnArr;
}

ConnectFour.prototype.getForwardDia = function (column, row) {
	console.log('I should get forward diagonal which contains [%s,%s]', column, row);
	var returnArr = [];
	var c,r;
	for ( c = column - row, r = 0 ; c < this.columns.length ; c++, r++ ) {
		console.log('c - %s , r - %s',c,r);
		if ( this.columns[c]) {
			returnArr.push( this.columns[c][r] ? this.columns[c][r] : null);
		}
	}
	return returnArr;
}

ConnectFour.prototype.getBackwardDia = function (column, row) {
	console.log('I should get backward diagonal which contains [%s,%s]', column, row);
	var returnArr = [];
	var c,r;
	for ( c = column + row, r = 0 ; c >= 0  ; c--, r++ ) {
		console.log('c - %s , r - %s',c,r);
		if ( this.columns[c]) {
			returnArr.push( this.columns[c][r] ? this.columns[c][r] : null);
		}
	}
	console.log(returnArr);
	return returnArr;
}

// ConnectFour.prototype.checkConnectivity = function (column, row) {
// 	console.log('I should check connectivity in all directions.');

// 	var self = this;
// 	var directions = [	[-1,-1],	// South-West
// 						[-1, 0],	// West
// 						[-1, 1],	// North-West
// 						[ 0,-1],	// South
// 						// [ 0, 0],	// Non Direction
// 						// [ 0, 1],	// North, Not Needed
// 						[ 1,-1],	// South-East
// 						[ 1, 0],	// East
// 						[ 1, 1],	// North-East
// 	];

// 	var results = directions.map( function (direction) {
// 		var discArray = self.traverse(column, row, 4, direction[0], direction[1]);
// 		if ( discArray.length < 4 )
// 			return false;
// 		var isIdentical = discArray.every( function(disc) {
// 			return ( disc === discArray[0]);
// 		});
// 		console.log('is it all identical ? - %s', isIdentical);
// 		return isIdentical;
// 	})

// 	console.log('Results ' + results);
// 	console.log('I checked connectivity in all directions.');
// }

// ConnectFour.prototype.traverse = function (column, row, length, hDir, vDir) {
// 	console.log('I should traverse in [%s,%s] direction from [%s,%s] - %s steps', 
// 			hDir, vDir, column, row, length);
// 	var returnArr = [];
// 	for ( var i = 0 ; i < length ; i++ ) {
// 		if (this.columns[column + (hDir*i)]) {
// 			returnArr.push(this.columns[column + (hDir*i)][row + (vDir*i)]);
// 		}
// 	}
// 	return returnArr;
// }

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

if (!window) exports.ConnectFour = ConnectFour;