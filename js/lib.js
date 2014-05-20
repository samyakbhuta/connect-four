var ConnectFour = function (player1, player2) {
	this.columns = [];
	this.players = [player1, player2];

	// change it to currentPlayerIndex?;
	this.currentTurn = 0;
	for ( var i = 0 ; i <= 6 ; i++ ) {
		this.columns[i]=[];
	}
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
	return this.columns[column];
}

ConnectFour.prototype.getRow = function (column, row) {
	var returnArr = [];
	for ( var i = 0 ; i < this.columns.length ; i++ ) {
		returnArr.push( this.columns[i][row] ? this.columns[i][row] : null);
	}
	return returnArr;
}

ConnectFour.prototype.getForwardDia = function (column, row) {
	var returnArr = [];
	var c,r;
	for ( c = column - row, r = 0 ; c < this.columns.length ; c++, r++ ) {
		if ( this.columns[c]) {
			returnArr.push( this.columns[c][r] ? this.columns[c][r] : null);
		}
	}
	return returnArr;
}

ConnectFour.prototype.getBackwardDia = function (column, row) {
	var returnArr = [];
	var c,r;
	for ( c = column + row, r = 0 ; c >= 0  ; c--, r++ ) {
		if ( this.columns[c]) {
			returnArr.push( this.columns[c][r] ? this.columns[c][r] : null);
		}
	}
	return returnArr;
}