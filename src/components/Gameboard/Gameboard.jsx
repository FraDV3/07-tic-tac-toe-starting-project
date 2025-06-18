const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let gameBoard = initialGameboard;

export default function Gameboard({ onSelectSquare, turns }) {
  // The gameBoard state is initialized with the initialGameboard.
  let gameBoard = initialGameboard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    // Update the gameBoard with the player's symbol at the specified square.
    gameBoard[row][col] = player;
  }

  // const [gameBoard, setGameBoard]   = useState(initialGameboard);
  // function handleSelectSquare(rowIndex, colIndex) {
  //   // This function will handle the logic for selecting a square
  //   // and updating the game board state.
  //   // For now, it does nothing.
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // Update the square with the active player's symbol
  //       return updatedBoard;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
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
