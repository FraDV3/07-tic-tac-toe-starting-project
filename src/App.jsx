import { useState, useMemo } from "react";
import Player from "./components/Player/Player.jsx";
import Gameboard from "./components/Gameboard/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

// Constant holding default player names
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

// Constant defining the initial empty game board
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Helper: determine which player is next based on the number of turns
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

// Helper: build a 2D game board array from the history of turns
function deriveGameBoard(gameTurns) {
  let gameBoard = INITIAL_GAME_BOARD.map((array) => [...array]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Update the gameBoard with the player's symbol at the specified square.
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

// Helper: check if there is a winner on the current board
function deriveWinner(gameBoard, players) {
  let winner = null; // Initialize winner variable

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; // Return the winning symbol
    }
  }
  return winner;
}

function App() {
  // State: track player names (modifiable by user)
  const [players, setPlayers] = useState(PLAYERS);

  // State: history of game turns (each turn = {square: {row, col}, player: X|O})
  const [gameTurns, setGameTurns] = useState([]);

  // Derived: who is the current active player (X or O)
  const activePlayer = useMemo(
    () => deriveActivePlayer(gameTurns),
    [gameTurns]
  );

  // Derived: current game board (updated with each turn)
  const gameBoard = useMemo(() => deriveGameBoard(gameTurns), [gameTurns]);

  // Derived: check if there's a winner
  const winner = useMemo(
    () => deriveWinner(gameBoard, players),
    [gameBoard, players]
  );

  // Derived: check for draw (all squares filled, no winner)
  const hasDraw = useMemo(
    () => gameTurns.length === 9 && !winner,
    [gameTurns, winner]
  );

  // Handler: when player clicks a square
  function handleSelectSquare(rowIndex, colIndex) {
    // This function will handle the logic for selecting a square
    // and updating the game board state.
    setGameTurns((prevTurns) => {
      const currentPlayer = activePlayer; // Use the derived active player

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // Handler: reset the game state
  function handleResetGame() {
    // This function will handle the logic for resetting the game.
    setGameTurns([]);
  }

  // Handler: change player name
  function handlePlayerNameChange(symbol, newName) {
    // This function will handle the logic for changing player names.
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  // Render the app layout and components
  return (
    <main>
      <div id="game-container" role="application" aria-label="Tic Tac Toe Game">
        <ol id="players" className="highlight-player" aria-label="Players list">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winnerName={winner} onRestart={handleResetGame} />
        )}
        <Gameboard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
          board={gameBoard}
          aria-label="Game board"
        />
      </div>
      <Log turns={gameTurns} aria-label="Game log" />
    </main>
  );
}

export default App;
