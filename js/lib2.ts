class ConnectFour {

  players: string[];
  currentTurn: number;
  columns: Array<string[]>;

  constructor(player1: string, player2: string) {
    this.players = [player1, player2];
    this.currentTurn = 0;
    this.columns = [];
    for (let i: number = 0; i <= 6; i++) {
      this.columns[i] = [];
    }
  }

  getColumnsDOM(): string {
    console.log(this.columns);
    return this.columns
      .map((column, i) => `<div class="column"> ${this.getColumnDOM(i)} </div>`)
      .join("");
  }

  getColumnDOM(column: number): string {
    return this.columns[column]
      .map((i) => `<div class="disc ${i}"> ${i} </div>`)
      .reverse()
      .join("");
  }

  currentPlayer(): string {
    return this.players[this.currentTurn];
  }

  turn(): void {
    // this.currentTurn === this.players.length - 1
    this.currentTurn === 1
      ? (this.currentTurn = 0)
      : this.currentTurn++;
  }

  drop(str: string, column: number): number {
    // Returning 0 indicates the column was already filled up with discs.
    return this.columns[column].length === 6
      ? 0
      : this.columns[column].push(str);
  }

  dropByCurrentPlayer(column: number): string | void {
    const addedToRow = this.drop(this.currentPlayer(), column);
    if (addedToRow > 0) {
      let isWin = this.checkConnectivity(
        column,
        addedToRow - 1,
        this.currentPlayer()
      );
      return isWin ? this.currentPlayer() : this.turn();
    } else {
      // Attempted column was already filled.
      // Check if all columns are filled, return accordingly.
      const allColumnsFilled = this.columns.every((i) => {i.length === 6;});
      return allColumnsFilled ? "all-columns-filled" : "column-filled";
    }
  }

  checkContinuity(
    arr: string[],
    value: string,
    continuity: number
  ): number | boolean {
    const result = arr.reduce((prev, current) => {
      if (prev === continuity) {
        return prev;
      }

      if (current === value) {
        return ++prev;
      } else {
        return 0;
      }
    }, 0);
    return result === continuity;
  }

  //JYLDYZ: shortened with logical OR (||) operator
  checkConnectivity(column: number, row: number, player: string): boolean {
    if (
      this.checkContinuity(this.getColumn(column, row), player, 4) ||
      this.checkContinuity(this.getRow(column, row), player, 4) ||
      this.checkContinuity(this.getForwardDia(column, row), player, 4) ||
      this.checkContinuity(this.getBackwardDia(column, row), player, 4)
    )
      return true;
    else {
      return false;
    }
  }

  getColumn(column: number, row: number): string[] {
    return this.columns[column];
  }

  getRow(column: number, row: number): string[] {
    let returnArr: any = [];
    for (let i = 0; i < this.columns.length; i++) {
      returnArr.push(this.columns[i][row] ? this.columns[i][row] : null);
    }
    return returnArr;
  }

  getForwardDia(column: number, row: number): string[] {
    let returnArr: any = [];
    let c: number, r: number;
    for (c = column - row, r = 0; c < this.columns.length; c++, r++) {
      if (this.columns[c]) {
        returnArr.push(this.columns[c][r] ? this.columns[c][r] : null);
      }
    }
    return returnArr;
  }

  getBackwardDia(column: number, row: number): string[] {
    let returnArr: any = [];
    let c: number, r: number;
    for (c = column + row, r = 0; c >= 0; c--, r++) {
      if (this.columns[c]) {
        returnArr.push(this.columns[c][r] ? this.columns[c][r] : null);
      }
    }
    return returnArr;
  }
}
