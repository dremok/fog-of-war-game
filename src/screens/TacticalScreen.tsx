import { useState } from 'react'
import { GameState, TacticalChoice } from '../game/types'
import { getCurrentEvent, getCurrentPlayer } from '../game/engine'

interface TacticalScreenProps {
  state: GameState
  onChoose: (choice: TacticalChoice) => void
}

const escalationImpact: Record<TacticalChoice, string> = {
  ai_swarm: 'HIGH ESCALATION',
  drone_strike: 'Moderate escalation',
  wire_guided: 'Low escalation',
  electronic_jam: 'Low escalation',
  defend: 'De-escalation',
  negotiate: 'Strong de-escalation',
}

const escalationColor: Record<TacticalChoice, string> = {
  ai_swarm: 'var(--red-bright)',
  drone_strike: 'var(--escalation-mid)',
  wire_guided: 'var(--text-secondary)',
  electronic_jam: 'var(--text-secondary)',
  defend: 'var(--green)',
  negotiate: 'var(--green-bright)',
}

export default function TacticalScreen({ state, onChoose }: TacticalScreenProps) {
  const [selected, setSelected] = useState<TacticalChoice | null>(null)
  const event = getCurrentEvent(state)
  const player = getCurrentPlayer(state)

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span className="font-mono text-muted" style={{ fontSize: 12 }}>
          {player.name} — Tactical Response
        </span>
        <span className="font-mono text-muted" style={{ fontSize: 12 }}>
          Round {state.currentRound}/{state.totalRounds}
        </span>
      </div>

      <div className="section-title">Choose your response</div>

      <div>
        {event.tacticalOptions.map(option => (
          <button
            key={option.id}
            className={`tactical-option ${selected === option.id ? 'selected' : ''}`}
            onClick={() => setSelected(option.id)}
          >
            <div className="tactical-option-name">{option.name}</div>
            <div className="tactical-option-desc">{option.description}</div>
            <div className="tactical-option-cost">
              <span>Resource cost: {option.cost}</span>
              <span style={{
                marginLeft: 12,
                color: escalationColor[option.id],
              }}>
                {escalationImpact[option.id]}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto" style={{ paddingBottom: 16 }}>
        <button
          className="btn btn-primary"
          disabled={!selected}
          onClick={() => selected && onChoose(selected)}
        >
          Confirm Tactical Order
        </button>
      </div>
    </div>
  )
}
