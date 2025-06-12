import { use } from "react";
import { useState } from "react";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function Gameboard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard]   = useState(initialGameboard);

  function handleSelectSquare(rowIndex, colIndex) {
    // This function will handle the logic for selecting a square
    // and updating the game board state.
    // For now, it does nothing.
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];  
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // Update the square with the active player's symbol
        return updatedBoard;
    });

    onSelectSquare();
  } 

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
