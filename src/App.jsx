import { useState } from "react";
import Player from "./components/Player/Player.jsx";
import Gameboard from "./components/Gameboard/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  }); 
  const [gameTurns, setGameTurns] = useState([]); // This state will hold the history of game turns

  const activePlayer = deriveActivePlayer(gameTurns); // Derive the active player based on game turns
  // This function will handle the logic for selecting a square

  let gameBoard = initialGameboard.map((array) => [...array]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Update the gameBoard with the player's symbol at the specified square.
    gameBoard[row][col] = player;
  }

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

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleResetGame() {
    // This function will handle the logic for resetting the game.
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    // This function will handle the logic for changing player names.
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
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
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
