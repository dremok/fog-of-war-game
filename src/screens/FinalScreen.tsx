import { GameState } from '../game/types'

interface FinalScreenProps {
  state: GameState
  onRestart: () => void
}

export default function FinalScreen({ state, onRestart }: FinalScreenProps) {
  const isNuclear = state.globalEscalation >= 100
  const sorted = [...state.players].sort((a, b) => b.score - a.score)
  const winner = sorted[0]
  const escalationPenalty = Math.round(state.globalEscalation * 0.5)

  return (
    <div className="screen">
      {isNuclear ? (
        <>
          <div className="nuclear-ending">
            <div className="nuclear-icon">&#x2622;</div>
            <div className="nuclear-title">NUCLEAR ESCALATION</div>
            <div className="nuclear-text">
              The combined aggressive choices of all players pushed the escalation meter to 100.
              Autonomous weapons systems triggered a chain reaction that no human could stop.
              There are no winners in nuclear war.
            </div>
          </div>

          <div className="card mb-16">
            <div className="card-label">Final Escalation Level</div>
            <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--red-bright)', textAlign: 'center' }}>
              100%
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="final-winner">
            <div className="final-winner-label">Commander Victorious</div>
            <div className="final-winner-name">{winner.name}</div>
            <div className="final-winner-score">{winner.score} points</div>
          </div>

          <div className="card mb-16">
            <div className="card-label">Global Escalation</div>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              textAlign: 'center',
              color: state.globalEscalation > 70 ? 'var(--red-bright)' :
                     state.globalEscalation > 40 ? 'var(--escalation-mid)' :
                     'var(--green)',
            }}>
              {state.globalEscalation}%
            </div>
            {escalationPenalty > 0 && (
              <div className="text-center text-muted" style={{ fontSize: 13, marginTop: 8 }}>
                Escalation penalty: -{escalationPenalty} points to all players
              </div>
            )}
          </div>
        </>
      )}

      <div className="section-title">Final Standings</div>
      <table className="scores-table mb-16">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Accuracy</th>
            <th>Tactical</th>
            <th>Adapt</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((player, i) => (
            <tr key={player.name}>
              <td className="font-mono" style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
              <td>
                <div>{player.name}</div>
                <span className={`perspective-badge ${player.perspective}`} style={{ marginTop: 4 }}>
                  {player.perspective}
                </span>
              </td>
              <td className="score-num">{player.accuracyScore}</td>
              <td className="score-num">{player.tacticalScore}</td>
              <td className="score-num">{player.adaptationScore}</td>
              <td className="score-num" style={{ fontSize: 16 }}>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card mb-16">
        <div className="card-label">Debrief</div>
        <div className="card-text" style={{ marginBottom: 0 }}>
          {isNuclear ? (
            'Every player contributed to the escalation spiral. The lesson: in a world of autonomous weapons, ' +
            'individual tactical "wins" become collective catastrophe. The fog of war does not just obscure the enemy — ' +
            'it obscures the consequences of your own choices.'
          ) : state.globalEscalation > 60 ? (
            'The world survived, but barely. High escalation means the next crisis could tip the balance. ' +
            'Notice how different media perspectives shaped different tactical decisions — and how those decisions ' +
            'compounded into systemic risk.'
          ) : state.globalEscalation > 30 ? (
            'A measured outcome. Some aggression, some restraint. The players who calibrated their confidence ' +
            'to their media bias scored highest — epistemic humility is a strategic advantage.'
          ) : (
            'Remarkably restrained. The players chose de-escalation when it mattered, resisting the pressure ' +
            'of their individual media narratives. In the fog of war, the clearest thinkers are those who know ' +
            'what they do not know.'
          )}
        </div>
      </div>

      <div style={{ paddingBottom: 16 }}>
        <button className="btn btn-primary" onClick={onRestart}>
          New Game
        </button>
      </div>
    </div>
  )
}
