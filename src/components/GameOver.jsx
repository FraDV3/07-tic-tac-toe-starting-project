// GameOver component: displays the end-of-game message and reset button
export default function GameOver({ winnerName, onRestart }) {
  return (
    // Main container with alert role for accessibility
    <div id="game-over" role="alert" aria-label="Game Over message">
      <h2>Game Over!</h2>
      {/* Display winner message if there is a winner */}
      {winnerName && (
        <p>{winnerName.charAt(0).toUpperCase() + winnerName.slice(1)} won!</p>
      )}
      {/* Display tie message if there is no winner */}
      {!winnerName && <p>It's a tie!</p>}
      {/* Restart button to reset the game */}
      <p>
        <button onClick={onRestart}>Play Again!</button>
      </p>
    </div>
  );
}
