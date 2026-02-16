# Fog of War: The Information Game

A browser-based epistemological strategy game where players experience the same geopolitical conflict through radically different media lenses. Inspired by the information warfare surrounding the Ukraine conflict.

## Concept

4-6 players. Same conflict, same timeline. But each player receives news from a different "media channel" — Western mainstream, Russian state media, Ukrainian OSINT Twitter, Chinese perspective, neutral NGO reports, etc.

Each round presents an event. All players see it, but the **description differs radically** depending on their channel. An attack might be "liberation of civilians" in one channel and "war crime" in another. The numbers don't match. The map looks different.

Players must make decisions: allocate resources, support negotiations, escalate or withdraw. But they decide based on their skewed picture of reality.

Mid-game: a **verification round** where all players see each other's versions of the same event. The shock of realizing how totally different your reality looks compared to others — THAT is the game's core.

## How It Works

### Setup
- Each player is randomly assigned a media perspective
- A shared game board shows a simplified map of the conflict region
- Players start with equal resources (influence points, diplomatic capital, military assets)

### Each Round
1. **Event Card** — A real-world-inspired event is presented (e.g., "Attack on civilian infrastructure")
2. **Narrative Filter** — Each player sees the event described through their media lens
3. **Decision Phase** — Players choose actions: sanction, negotiate, escalate, aid, investigate
4. **Consequences** — Actions have real effects on the game state, but outcomes depend on ground truth, not narrative
5. **Confidence Vote** — Players rate how confident they are in their worldview (1-5)

### Scoring
- **Accuracy Score** — How close was your mental model to ground truth?
- **Adaptation Score** — How quickly did you update when given new information?
- **Impact Score** — Did your decisions lead to good outcomes despite bad information?

Final score = weighted combination. The winner isn't the best strategist — it's the most epistemically humble.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: CSS (no framework, keep it lean)
- **State**: Client-side for MVP (single-device hot-seat multiplayer)
- **Future**: Socket.IO for real-time multiplayer

## MVP Scope

### Phase 1: Single-device prototype
- [ ] 3 media perspectives (Western, Russian, Neutral)
- [ ] 5 event rounds based on real conflict themes
- [ ] Hot-seat multiplayer (pass the device)
- [ ] Reveal/comparison screen after each round
- [ ] Basic scoring

### Phase 2: Polish
- [ ] More perspectives and events
- [ ] Visual map showing divergent realities
- [ ] Real-time multiplayer via WebSocket
- [ ] Mobile-friendly design

## Project Structure

```
fog-of-war-game/
├── src/
│   ├── game/          # Game logic, events, narratives
│   ├── components/    # React components
│   ├── screens/       # Game screens (setup, play, reveal, score)
│   └── App.tsx
├── public/
├── index.html
├── README.md
└── package.json
```

## Getting Started

```bash
npm install
npm run dev
```

## Philosophy

> *"Rashomon as a board game, with Ukraine as the case."*

This game doesn't take sides. It demonstrates that **information asymmetry is the real battlefield** — and that the first step to navigating it is recognizing that your map of the world is not the territory.

## License

MIT
