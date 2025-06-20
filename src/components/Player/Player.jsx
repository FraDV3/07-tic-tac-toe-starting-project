// Player component: displays player info and allows editing name
export default function Player({ initialName, symbol, isActive, onChangeName }) {
  // State: playerName holds the current name (editable by user)
  const [playerName, setPlayerName] = useState(initialName);
  // State: isEditing controls whether input field is shown
  const [isEditing, setIsEditing] = useState(false);

  // Handler: toggles editing mode, saves name when exiting edit mode
  function handleEdit() {
    setIsEditing((isEditing) => !isEditing);
    
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Handler: updates playerName as user types
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    // List item representing a player, with ARIA attributes for accessibility
    <li
      className={isActive ? "active" : undefined}
      aria-label={`Player ${symbol}: ${playerName}`}
      aria-current={isActive ? "true" : undefined}
    >
      <span className="player">
        {isEditing ? (
          // Input shown when editing the player name
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
            autoFocus
            onFocus={(e) => e.target.select()}
          />
        ) : (
          // Display player name when not editing
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* Button toggles between Edit and Save */}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
