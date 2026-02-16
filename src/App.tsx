import { useState, useCallback } from 'react'
import { GameState, TacticalChoice } from './game/types'
import {
  createInitialState,
  startGame,
  submitConfidence,
  applyRoundScores,
  advanceRound,
  calculateRoundScores,
} from './game/engine'
import SetupScreen from './screens/SetupScreen'
import BriefingScreen from './screens/BriefingScreen'
import TacticalScreen from './screens/TacticalScreen'
import ConfidenceScreen from './screens/ConfidenceScreen'
import PassDeviceScreen from './screens/PassDeviceScreen'
import RevealScreen from './screens/RevealScreen'
import ScoresScreen from './screens/ScoresScreen'
import FinalScreen from './screens/FinalScreen'

type AppPhase =
  | 'setup'
  | 'pass-device'
  | 'briefing'
  | 'tactical'
  | 'confidence'
  | 'reveal'
  | 'scores'
  | 'finished'

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [phase, setPhase] = useState<AppPhase>('setup')
  const [pendingTactical, setPendingTactical] = useState<TacticalChoice | null>(null)
  const [lastEscalationChange, setLastEscalationChange] = useState(0)

  const handleStart = useCallback((names: string[]) => {
    const initial = createInitialState(names)
    const started = startGame(initial)
    setGameState(started)
    // First player of first round goes straight to briefing (no pass-device)
    setPhase('briefing')
  }, [])

  const handleBriefingContinue = useCallback(() => {
    setPhase('tactical')
  }, [])

  const handleTacticalChoice = useCallback((choice: TacticalChoice) => {
    setPendingTactical(choice)
    setPhase('confidence')
  }, [])

  const handleConfidenceSubmit = useCallback((confidence: number) => {
    if (!gameState || !pendingTactical) return

    const newState = submitConfidence(gameState, confidence, pendingTactical)
    setGameState(newState)
    setPendingTactical(null)

    if (newState.phase === 'reveal') {
      setPhase('reveal')
    } else {
      // Next player needs to see "pass device" screen
      setPhase('pass-device')
    }
  }, [gameState, pendingTactical])

  const handlePassReady = useCallback(() => {
    setPhase('briefing')
  }, [])

  const handleRevealContinue = useCallback(() => {
    if (!gameState) return
    const { escalationChange } = calculateRoundScores(gameState)
    setLastEscalationChange(escalationChange)
    const scored = applyRoundScores(gameState)
    setGameState(scored)

    if (scored.phase === 'finished') {
      // Nuclear ending
      setPhase('finished')
    } else {
      setPhase('scores')
    }
  }, [gameState])

  const handleScoresContinue = useCallback(() => {
    if (!gameState) return
    const advanced = advanceRound(gameState)
    setGameState(advanced)

    if (advanced.phase === 'finished') {
      setPhase('finished')
    } else {
      // New round — show pass device for first player
      setPhase('pass-device')
    }
  }, [gameState])

  const handleRestart = useCallback(() => {
    setGameState(null)
    setPhase('setup')
    setPendingTactical(null)
    setLastEscalationChange(0)
  }, [])

  // Escalation bar component
  const EscalationBar = gameState ? (
    <div className="escalation-bar">
      <div className="escalation-label">
        <span>Global Escalation</span>
        <span style={{
          color: gameState.globalEscalation > 70 ? 'var(--red-bright)' :
                 gameState.globalEscalation > 40 ? 'var(--escalation-mid)' :
                 'var(--green)',
        }}>
          {gameState.globalEscalation}%
        </span>
      </div>
      <div className="escalation-track">
        <div
          className={`escalation-fill ${
            gameState.globalEscalation > 80 ? 'critical' :
            gameState.globalEscalation > 60 ? 'high' :
            gameState.globalEscalation > 30 ? 'mid' : 'low'
          }`}
          style={{ width: `${gameState.globalEscalation}%` }}
        />
      </div>
    </div>
  ) : null

  // Round dots
  const RoundDots = gameState ? (
    <div className="round-indicator">
      {Array.from({ length: gameState.totalRounds }, (_, i) => {
        const roundNum = i + 1
        const isCurrent = roundNum === gameState.currentRound
        const isCompleted = roundNum < gameState.currentRound
        return (
          <div
            key={i}
            className={`round-dot ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
          />
        )
      })}
    </div>
  ) : null

  return (
    <div className="game-container">
      {phase === 'setup' && (
        <SetupScreen onStart={handleStart} />
      )}

      {phase !== 'setup' && phase !== 'finished' && gameState && (
        <>
          {EscalationBar}
          {RoundDots}
        </>
      )}

      {phase === 'pass-device' && gameState && (
        <PassDeviceScreen
          state={gameState}
          nextPlayerName={gameState.players[gameState.currentPlayerIndex].name}
          onReady={handlePassReady}
        />
      )}

      {phase === 'briefing' && gameState && (
        <BriefingScreen state={gameState} onContinue={handleBriefingContinue} />
      )}

      {phase === 'tactical' && gameState && (
        <TacticalScreen state={gameState} onChoose={handleTacticalChoice} />
      )}

      {phase === 'confidence' && gameState && (
        <ConfidenceScreen state={gameState} onSubmit={handleConfidenceSubmit} />
      )}

      {phase === 'reveal' && gameState && (
        <RevealScreen state={gameState} onContinue={handleRevealContinue} />
      )}

      {phase === 'scores' && gameState && (
        <ScoresScreen
          state={gameState}
          escalationChange={lastEscalationChange}
          onContinue={handleScoresContinue}
        />
      )}

      {phase === 'finished' && gameState && (
        <FinalScreen state={gameState} onRestart={handleRestart} />
      )}
    </div>
  )
}
