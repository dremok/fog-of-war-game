import { GameState } from '../game/types'
import { getCurrentEvent, getCurrentPlayer, getCurrentNarrative } from '../game/engine'

interface BriefingScreenProps {
  state: GameState
  onContinue: () => void
}

const perspectiveNames: Record<string, string> = {
  western: 'Western Media',
  russian: 'Russian State Media',
  osint: 'OSINT Intelligence',
  neutral: 'Neutral Observer',
}

export default function BriefingScreen({ state, onContinue }: BriefingScreenProps) {
  const event = getCurrentEvent(state)
  const player = getCurrentPlayer(state)
  const narrative = getCurrentNarrative(state)

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span className={`perspective-badge ${player.perspective}`}>
          {perspectiveNames[player.perspective]}
        </span>
        <span className="font-mono text-muted" style={{ fontSize: 12 }}>
          Round {state.currentRound}/{state.totalRounds}
        </span>
      </div>

      <div className="card highlight">
        <div className="card-label">
          Intelligence Briefing — {player.name}
        </div>
        <div className="card-headline">{narrative.headline}</div>
        <div className="card-text">{narrative.description}</div>

        <div className="card-detail">
          <strong>Casualties: </strong>{narrative.casualties}
        </div>
        <div className="card-detail">
          <strong>Analysis: </strong>{narrative.framing}
        </div>
      </div>

      <div className="card">
        <div className="card-label">Mission Context</div>
        <div className="card-text" style={{ marginBottom: 0, fontSize: 13 }}>
          Event ID: {event.id.toUpperCase().replace(/_/g, '-')} — Escalation risk for this sector:{' '}
          <span style={{ color: event.escalationRisk > 0.5 ? 'var(--red-bright)' : 'var(--amber)' }}>
            {Math.round(event.escalationRisk * 100)}%
          </span>
        </div>
      </div>

      <div className="mt-auto" style={{ paddingBottom: 16 }}>
        <button className="btn btn-primary" onClick={onContinue}>
          Proceed to Tactical Response
        </button>
      </div>
    </div>
  )
}
