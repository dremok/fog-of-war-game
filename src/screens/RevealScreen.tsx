import { GameState, MediaPerspective } from '../game/types'
import { getCurrentEvent } from '../game/engine'

interface RevealScreenProps {
  state: GameState
  onContinue: () => void
}

const perspectiveNames: Record<MediaPerspective, string> = {
  western: 'Western Media',
  russian: 'Russian State Media',
  osint: 'OSINT Intelligence',
  neutral: 'Neutral Observer',
}

const perspectiveOrder: MediaPerspective[] = ['western', 'russian', 'osint', 'neutral']

export default function RevealScreen({ state, onContinue }: RevealScreenProps) {
  const event = getCurrentEvent(state)

  // Only show perspectives that are assigned to players
  const activePerspectives = state.players.map(p => p.perspective)

  return (
    <div className="screen">
      <div className="section-title">
        Round {state.currentRound} — The Full Picture
      </div>

      <div className="card highlight mb-16">
        <div className="card-label">Ground Truth</div>
        <div className="card-text" style={{ marginBottom: 0, color: 'var(--text-bright)' }}>
          {event.groundTruth}
        </div>
      </div>

      <div className="section-title">How each side reported it</div>

      <div className="reveal-grid">
        {perspectiveOrder
          .filter(p => activePerspectives.includes(p))
          .map(perspective => {
            const narrative = event.narratives[perspective]
            const playerName = state.players.find(p => p.perspective === perspective)?.name
            return (
              <div key={perspective} className={`reveal-card ${perspective}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className={`perspective-badge ${perspective}`}>
                    {perspectiveNames[perspective]}
                  </span>
                  <span className="font-mono text-muted" style={{ fontSize: 11 }}>
                    {playerName}
                  </span>
                </div>
                <div className="reveal-headline">{narrative.headline}</div>
                <div className="reveal-desc">{narrative.description}</div>
                <div className="reveal-casualties">{narrative.casualties}</div>
              </div>
            )
          })}
      </div>

      <div className="mt-16" style={{ paddingBottom: 16 }}>
        <button className="btn btn-primary" onClick={onContinue}>
          See Scores
        </button>
      </div>
    </div>
  )
}
