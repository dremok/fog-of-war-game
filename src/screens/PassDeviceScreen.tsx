import { GameState } from '../game/types'

interface PassDeviceScreenProps {
  state: GameState
  nextPlayerName: string
  onReady: () => void
}

export default function PassDeviceScreen({ state, nextPlayerName, onReady }: PassDeviceScreenProps) {
  return (
    <div className="screen">
      <div className="pass-device">
        <div className="pass-device-icon">
          &#x1F4F1;
        </div>
        <div className="pass-device-text">Pass the device to</div>
        <div className="pass-device-name">{nextPlayerName}</div>
        <div className="text-muted" style={{ fontSize: 14, maxWidth: 300 }}>
          Round {state.currentRound} of {state.totalRounds} — Do not look at the screen until
          it is your turn.
        </div>
        <button className="btn" onClick={onReady} style={{ maxWidth: 280 }}>
          I'm {nextPlayerName} — Ready
        </button>
      </div>
    </div>
  )
}
