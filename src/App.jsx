import { useState } from "react";
import Player from "./components/Player/Player";
import Gameboard from "./components/Gameboard/Gameboard";
import Log from "./components/Log";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]); // This state will hold the history of game turns

  const activePlayer = deriveActivePlayer(gameTurns); // Derive the active player based on game turns
  // This function will handle the logic for selecting a square

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <Gameboard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
