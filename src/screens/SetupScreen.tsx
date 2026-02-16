import { useState } from 'react'

interface SetupScreenProps {
  onStart: (names: string[]) => void
}

export default function SetupScreen({ onStart }: SetupScreenProps) {
  const [players, setPlayers] = useState<string[]>(['', ''])

  const updatePlayer = (index: number, value: string) => {
    setPlayers(prev => prev.map((p, i) => (i === index ? value : p)))
  }

  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers(prev => [...prev, ''])
    }
  }

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(prev => prev.filter((_, i) => i !== index))
    }
  }

  const canStart = players.every(p => p.trim().length > 0)

  const perspectiveLabels = ['Western Media', 'Russian Media', 'OSINT Analyst', 'Neutral Observer']
  const perspectiveClasses = ['western', 'russian', 'osint', 'neutral']

  return (
    <div className="screen">
      <div className="game-header">
        <div className="game-title">Fog of War</div>
        <div className="game-subtitle">Information is a weapon</div>
      </div>

      <div className="card mb-16">
        <div className="card-text" style={{ marginBottom: 0 }}>
          A game of information warfare and tactical decisions. Each player sees the same events
          through a different media lens. Choose your tactics wisely — aggressive choices escalate
          toward nuclear catastrophe.
        </div>
      </div>

      <div className="section-title">Players (2-4)</div>

      <div className="setup-form">
        {players.map((name, i) => (
          <div key={i} className="player-input-row">
            <span className="player-number">{i + 1}</span>
            <input
              className="player-input"
              type="text"
              placeholder={`Player ${i + 1} name`}
              value={name}
              onChange={e => updatePlayer(i, e.target.value)}
              maxLength={20}
            />
            <span className={`perspective-badge ${perspectiveClasses[i]}`}>
              {perspectiveLabels[i]}
            </span>
            {players.length > 2 && (
              <button className="remove-btn" onClick={() => removePlayer(i)}>
                &times;
              </button>
            )}
          </div>
        ))}

        {players.length < 4 && (
          <button className="add-player-btn" onClick={addPlayer}>
            + Add Player
          </button>
        )}
      </div>

      <div className="mt-auto" style={{ paddingTop: 24, paddingBottom: 16 }}>
        <button
          className="btn btn-primary"
          disabled={!canStart}
          onClick={() => onStart(players.map(p => p.trim()))}
        >
          Begin Operation
        </button>
      </div>
    </div>
  )
}
