import { useState } from 'react'
import { GameState } from '../game/types'
import { getCurrentPlayer } from '../game/engine'

interface ConfidenceScreenProps {
  state: GameState
  onSubmit: (confidence: number) => void
}

const confidenceLabels: Record<number, string> = {
  1: 'Very unsure — my source might be lying',
  2: 'Somewhat uncertain — missing key details',
  3: 'Moderately confident — seems plausible',
  4: 'Fairly confident — aligns with what I know',
  5: 'Completely certain — this is the truth',
}

export default function ConfidenceScreen({ state, onSubmit }: ConfidenceScreenProps) {
  const [confidence, setConfidence] = useState<number | null>(null)
  const player = getCurrentPlayer(state)

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span className={`perspective-badge ${player.perspective}`}>
          {player.name}
        </span>
        <span className="font-mono text-muted" style={{ fontSize: 12 }}>
          Round {state.currentRound}/{state.totalRounds}
        </span>
      </div>

      <div className="confidence-section">
        <div className="confidence-question">
          How confident are you in your understanding of what really happened?
        </div>

        <div className="card mb-16" style={{ textAlign: 'left' }}>
          <div className="card-text" style={{ fontSize: 13, marginBottom: 0 }}>
            Remember: you only saw one perspective. Being honestly uncertain when your source
            is biased earns <strong style={{ color: 'var(--amber)' }}>more points</strong> than
            blind confidence.
          </div>
        </div>

        <div className="confidence-buttons">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              className={`confidence-btn ${confidence === n ? 'selected' : ''}`}
              onClick={() => setConfidence(n)}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="confidence-label" style={{ minHeight: 40 }}>
          {confidence ? confidenceLabels[confidence] : 'Rate your confidence 1-5'}
        </div>
      </div>

      <div className="mt-auto" style={{ paddingBottom: 16 }}>
        <button
          className="btn btn-primary"
          disabled={!confidence}
          onClick={() => confidence && onSubmit(confidence)}
        >
          Lock In
        </button>
      </div>
    </div>
  )
}
