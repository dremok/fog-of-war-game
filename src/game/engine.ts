import { GameState, PlayerState, MediaPerspective, TacticalChoice, PlayerDecision } from './types'
import { EVENTS } from './events'

const PERSPECTIVES: MediaPerspective[] = ['western', 'russian', 'osint', 'neutral']

export function createInitialState(playerNames: string[]): GameState {
  // Assign perspectives: cycle through available perspectives
  const players: PlayerState[] = playerNames.map((name, i) => ({
    name,
    perspective: PERSPECTIVES[i % PERSPECTIVES.length],
    resources: 100,
    score: 0,
    accuracyScore: 0,
    adaptationScore: 0,
    tacticalScore: 0,
    decisions: [],
    confidenceHistory: [],
    escalationLevel: 0,
  }))

  return {
    phase: 'setup',
    currentRound: 0,
    totalRounds: EVENTS.length,
    players,
    currentPlayerIndex: 0,
    events: EVENTS,
    globalEscalation: 0,
  }
}

export function startGame(state: GameState): GameState {
  return {
    ...state,
    phase: 'briefing',
    currentRound: 1,
    currentPlayerIndex: 0,
  }
}

export function getCurrentEvent(state: GameState) {
  return state.events[state.currentRound - 1]
}

export function getCurrentPlayer(state: GameState): PlayerState {
  return state.players[state.currentPlayerIndex]
}

export function getCurrentNarrative(state: GameState) {
  const event = getCurrentEvent(state)
  const player = getCurrentPlayer(state)
  return event.narratives[player.perspective]
}

export function submitTacticalChoice(state: GameState, choice: TacticalChoice): GameState {
  return {
    ...state,
    phase: 'confidence',
    // Store choice temporarily — will be committed in confidence phase
    players: state.players.map((p, i) =>
      i === state.currentPlayerIndex
        ? { ...p, _pendingTactical: choice } as any
        : p
    ),
  }
}

export function submitConfidence(state: GameState, confidence: number, tacticalChoice: TacticalChoice): GameState {
  const decision: PlayerDecision = {
    round: state.currentRound,
    tacticalChoice,
    confidence,
    believedTruth: '', // simplified
  }

  const updatedPlayers = state.players.map((p, i) => {
    if (i !== state.currentPlayerIndex) return p
    return {
      ...p,
      decisions: [...p.decisions, decision],
      confidenceHistory: [...p.confidenceHistory, confidence],
    }
  })

  const nextPlayerIndex = state.currentPlayerIndex + 1

  // If all players have decided, move to reveal
  if (nextPlayerIndex >= state.players.length) {
    return {
      ...state,
      players: updatedPlayers,
      phase: 'reveal',
      currentPlayerIndex: 0,
    }
  }

  // Otherwise, next player's briefing
  return {
    ...state,
    players: updatedPlayers,
    phase: 'briefing',
    currentPlayerIndex: nextPlayerIndex,
  }
}

export function calculateRoundScores(state: GameState): {
  playerScores: { name: string; accuracy: number; tactical: number; adaptation: number; total: number }[]
  escalationChange: number
  nuclearEnding: boolean
} {
  const event = getCurrentEvent(state)
  const playerScores = state.players.map((player) => {
    const decision = player.decisions.find((d) => d.round === state.currentRound)
    if (!decision) return { name: player.name, accuracy: 0, tactical: 0, adaptation: 0, total: 0 }

    // Accuracy: perspective-based scoring
    // Western & neutral are closer to ground truth; Russian is further
    // OSINT is closest
    const perspectiveAccuracy: Record<MediaPerspective, number> = {
      osint: 0.9,
      neutral: 0.7,
      western: 0.5,
      russian: 0.2,
    }
    const baseAccuracy = perspectiveAccuracy[player.perspective]

    // Confidence calibration: being confident when wrong is penalized,
    // being appropriately uncertain when your source is biased is rewarded
    const confidenceModifier = decision.confidence / 5
    // If your perspective is inaccurate and you were low-confidence, bonus
    // If your perspective is accurate and you were high-confidence, bonus
    const calibrationBonus = Math.abs(baseAccuracy - confidenceModifier) < 0.3 ? 20 : -10

    const accuracy = Math.round(baseAccuracy * 50 + calibrationBonus)

    // Tactical: how effective was the choice
    const tacticalOption = event.tacticalOptions.find((o) => o.id === decision.tacticalChoice)
    const bestOption = event.tacticalOptions.find((o) => o.id === event.bestResponse)
    let tactical = 0
    if (tacticalOption && bestOption) {
      // Score based on effectiveness vs the best response's effectiveness
      const choiceScore = Object.values(tacticalOption.effectiveness).reduce((a, b) => a + b, 0)
      const bestScore = Object.values(bestOption.effectiveness).reduce((a, b) => a + b, 0)
      tactical = Math.round((choiceScore / bestScore) * 40)
    }

    // Adaptation: did they lower confidence after being wrong previously?
    let adaptation = 0
    if (player.confidenceHistory.length >= 2) {
      const prev = player.confidenceHistory[player.confidenceHistory.length - 2]
      const curr = decision.confidence
      // Reward for adjusting confidence downward if perspective is less accurate
      if (baseAccuracy < 0.5 && curr < prev) {
        adaptation = 15
      } else if (baseAccuracy >= 0.5 && curr >= prev) {
        adaptation = 10
      }
    }

    return {
      name: player.name,
      accuracy: Math.max(0, accuracy),
      tactical,
      adaptation,
      total: Math.max(0, accuracy) + tactical + adaptation,
    }
  })

  // Escalation change: based on tactical choices
  let escalationChange = 0
  state.players.forEach((player) => {
    const decision = player.decisions.find((d) => d.round === state.currentRound)
    if (!decision) return
    switch (decision.tacticalChoice) {
      case 'ai_swarm':
        escalationChange += 15
        break
      case 'drone_strike':
        escalationChange += 5
        break
      case 'wire_guided':
        escalationChange += 3
        break
      case 'electronic_jam':
        escalationChange += 2
        break
      case 'defend':
        escalationChange -= 3
        break
      case 'negotiate':
        escalationChange -= 8
        break
    }
  })

  // Event's own escalation risk adds to the meter
  escalationChange += Math.round(event.escalationRisk * 10)

  const newEscalation = Math.min(100, Math.max(0, state.globalEscalation + escalationChange))
  const nuclearEnding = newEscalation >= 100

  return { playerScores, escalationChange, nuclearEnding }
}

export function applyRoundScores(state: GameState): GameState {
  const { playerScores, escalationChange, nuclearEnding } = calculateRoundScores(state)

  const updatedPlayers = state.players.map((player) => {
    const scores = playerScores.find((s) => s.name === player.name)
    if (!scores) return player
    return {
      ...player,
      score: player.score + scores.total,
      accuracyScore: player.accuracyScore + scores.accuracy,
      tacticalScore: player.tacticalScore + scores.tactical,
      adaptationScore: player.adaptationScore + scores.adaptation,
    }
  })

  const newEscalation = Math.min(100, Math.max(0, state.globalEscalation + escalationChange))

  if (nuclearEnding) {
    return {
      ...state,
      players: updatedPlayers,
      globalEscalation: 100,
      phase: 'finished',
    }
  }

  return {
    ...state,
    players: updatedPlayers,
    globalEscalation: newEscalation,
    phase: 'scores',
  }
}

export function advanceRound(state: GameState): GameState {
  if (state.currentRound >= state.totalRounds) {
    // Apply escalation penalty to final scores
    const escalationPenalty = Math.round(state.globalEscalation * 0.5)
    const updatedPlayers = state.players.map((p) => ({
      ...p,
      score: Math.max(0, p.score - escalationPenalty),
      escalationLevel: state.globalEscalation,
    }))
    return {
      ...state,
      players: updatedPlayers,
      phase: 'finished',
    }
  }

  return {
    ...state,
    phase: 'briefing',
    currentRound: state.currentRound + 1,
    currentPlayerIndex: 0,
  }
}
