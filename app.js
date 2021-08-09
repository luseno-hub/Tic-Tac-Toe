var TicTacToe = {
  init: function () {
    TicTacToe.symbols = ["X", "O"];
    TicTacToe.squares = Array.from(document.querySelectorAll(".square"));
    TicTacToe.turnIndicator = document.querySelector(".turnIndicator");
    TicTacToe.button = document.querySelector(".newGame");
    TicTacToe.board = document.querySelector(".board");
    TicTacToe.winningSets = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    TicTacToe.addEventListeners();
    TicTacToe.newGame();
  },

  addEventListeners: function () {
    var ttt = this;
    this.squares.forEach(function (e) {
      e.addEventListener("click", function () {
        ttt.play(this);
      });
    });
    this.button.addEventListener("click", function () {
      ttt.newGame();
    });
  },

  newGame: function () {
    this.activePlayer = 0;
    this.gameOver = false;
    this.squares.forEach(function (e) {
      e.classList.remove("X");
      e.classList.remove("O");
    });
    this.board.classList.remove("gameOver");
    this.setTurnIndicator();
  },

  setTurnIndicator: function () {
    this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn.";
  },

  play: function (e) {
    //check if square is empty
    if (!this.gameOver && e.classList.length == 1) {
      //set box to player Symbol
      e.classList.add(this.symbols[this.activePlayer]);
      //check winners
      if (this.checkWin()) {
        this.turnIndicator.innerText =
          this.symbols[this.activePlayer] + " wins!";
        this.endGame();
      }
      //check draw
      else if (this.checkDraw()) {
        this.turnIndicator.innerText = "Cats Game! It's a draw";
        this.endGame();
      }
      //switch players turn
      else {
        this.activePlayer = 1 - this.activePlayer;
        this.setTurnIndicator();
      }
    }
  },

  checkWin: function () {
    var ttt = this;
    return this.winningSets.some(function (e) {
      return e.every(function (i) {
        return (
          Array.from(ttt.squares[i].classList).indexOf(
            ttt.symbols[ttt.activePlayer]
          ) > -1
        );
      });
    });
  },

  checkDraw: function () {
    //check if every square is filled
    return this.squares.every(function (e) {
      //square also has an X, and O class apart from squares class
      return e.classList.length > 1;
    });
  },

  endGame: function () {
    this.gameOver = true;
    this.board.classList.add("gameOver");
  },
};

window.onload = TicTacToe.init;
