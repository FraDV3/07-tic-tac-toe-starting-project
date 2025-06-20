// Log component: displays the history of moves in an ordered list
export default function Log({ turns }) {
  // Render an ordered list representing the game move log
  return (
    <ol id="log" aria-label="Game move log" role="list">
      {turns.map((turn) => (
        // Each list item describes a move: player and selected square
        <li
          key={`${turn.square.row}${turn.square.col}`}
          aria-label={`Player ${turn.player} selected row ${turn.square.row + 1}, column ${turn.square.col + 1}`}
        >
          {turn.player} selected {turn.square.row}
        </li>
      ))}
    </ol>
  );
}
