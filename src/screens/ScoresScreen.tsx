import { GameState, TacticalChoice } from '../game/types'
import { calculateRoundScores } from '../game/engine'

interface ScoresScreenProps {
  state: GameState
  escalationChange: number
  onContinue: () => void
}

const tacticalLabels: Record<TacticalChoice, string> = {
  ai_swarm: 'AI Autonomous Swarm',
  drone_strike: 'FPV Drone Strike',
  wire_guided: 'Fiber Optic Drone',
  electronic_jam: 'Electronic Warfare',
  defend: 'Fortify & Defend',
  negotiate: 'Negotiate / Ceasefire',
}

export default function ScoresScreen({ state, escalationChange, onContinue }: ScoresScreenProps) {
  const { playerScores } = calculateRoundScores(state)
  const maxScore = Math.max(...playerScores.map(s => s.total), 1)

  const isLastRound = state.currentRound >= state.totalRounds

  return (
    <div className="screen">
      <div className="section-title">
        Round {state.currentRound} Results
      </div>

      {/* Escalation change */}
      <div className={`escalation-change ${escalationChange > 0 ? 'increase' : escalationChange < 0 ? 'decrease' : 'neutral'}`}>
        Escalation: {escalationChange > 0 ? '+' : ''}{escalationChange}
        {escalationChange > 10 && ' — Dangerous'}
        {escalationChange < -5 && ' — De-escalation'}
      </div>

      {/* Tactical choices */}
      <div className="section-title">Tactical Decisions</div>
      <div className="tactical-results">
        {state.players.map(player => {
          const decision = player.decisions.find(d => d.round === state.currentRound)
          return (
            <div key={player.name} className="tactical-result-row">
              <span className="tactical-result-player">{player.name}</span>
              <span className="tactical-result-choice">
                {decision ? tacticalLabels[decision.tacticalChoice] : '—'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Scores */}
      <div className="section-title">Round Scores</div>

      <div className="score-legend">
        <div className="score-legend-item">
          <div className="score-legend-dot" style={{ background: 'var(--blue-bright)' }} />
          Accuracy
        </div>
        <div className="score-legend-item">
          <div className="score-legend-dot" style={{ background: 'var(--green-bright)' }} />
          Tactical
        </div>
        <div className="score-legend-item">
          <div className="score-legend-dot" style={{ background: 'var(--amber)' }} />
          Adaptation
        </div>
      </div>

      <div className="score-breakdown">
        {playerScores.map(score => (
          <div key={score.name} className="score-player-row">
            <div className="score-player-name">
              <span>{score.name}</span>
              <span className="score-player-total">+{score.total}</span>
            </div>
            <div className="score-bars">
              <div
                className="score-bar-accuracy"
                style={{ width: `${(score.accuracy / maxScore) * 100}%` }}
              />
              <div
                className="score-bar-tactical"
                style={{ width: `${(score.tactical / maxScore) * 100}%` }}
              />
              <div
                className="score-bar-adaptation"
                style={{ width: `${(score.adaptation / maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Running totals */}
      <div className="section-title">Standings</div>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Total</th>
            <th>Perspective</th>
          </tr>
        </thead>
        <tbody>
          {[...state.players]
            .sort((a, b) => b.score - a.score)
            .map(player => (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td className="score-num">{player.score}</td>
                <td>
                  <span className={`perspective-badge ${player.perspective}`}>
                    {player.perspective}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div style={{ paddingBottom: 16 }}>
        <button className="btn btn-primary" onClick={onContinue}>
          {isLastRound ? 'See Final Results' : `Next Round (${state.currentRound + 1}/${state.totalRounds})`}
        </button>
      </div>
    </div>
  )
}
