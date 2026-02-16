export type MediaPerspective = 'western' | 'russian' | 'osint' | 'neutral'

export type TacticalChoice = 'drone_strike' | 'electronic_jam' | 'wire_guided' | 'ai_swarm' | 'defend' | 'negotiate'

export interface Narrative {
  headline: string
  description: string
  casualties: string
  framing: string
}

export interface TacticalOption {
  id: TacticalChoice
  name: string
  description: string
  effectiveness: Record<string, number> // vs other choices
  cost: number
}

export interface GameEvent {
  id: string
  round: number
  groundTruth: string
  narratives: Record<MediaPerspective, Narrative>
  tacticalOptions: TacticalOption[]
  bestResponse: TacticalChoice
  escalationRisk: number // 0-1, how much this event risks escalation
}

export interface PlayerState {
  name: string
  perspective: MediaPerspective
  resources: number
  score: number
  accuracyScore: number
  adaptationScore: number
  tacticalScore: number
  decisions: PlayerDecision[]
  confidenceHistory: number[]
  escalationLevel: number
}

export interface PlayerDecision {
  round: number
  tacticalChoice: TacticalChoice
  confidence: number // 1-5, how confident in their worldview
  believedTruth: string // what they think happened
}

export interface GameState {
  phase: 'setup' | 'briefing' | 'tactical' | 'confidence' | 'reveal' | 'scores' | 'finished'
  currentRound: number
  totalRounds: number
  players: PlayerState[]
  currentPlayerIndex: number
  events: GameEvent[]
  globalEscalation: number // 0-100, if hits 100 = nuclear escalation = everyone loses
}
