export default function GameOver({ winnerName, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winnerName && <p>{winnerName.toUpperCase()} won!</p>}
      {!winnerName && <p>It's a tie!</p>}
      <p>
        <button onClick={onRestart}>Play Again!</button>
      </p>
    </div>
  );
}