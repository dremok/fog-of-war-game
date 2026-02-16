import { GameEvent } from './types'

export const EVENTS: GameEvent[] = [
  {
    id: 'bridge_strike',
    round: 1,
    groundTruth: 'A military supply bridge was struck by a drone, disrupting logistics. 3 soldiers killed, no civilians.',
    narratives: {
      western: {
        headline: 'Precision Strike Destroys Key Russian Supply Line',
        description: 'Ukrainian forces demonstrated advanced drone capability, surgically targeting a critical military bridge used to supply front-line positions. The strike highlights growing asymmetric advantage.',
        casualties: '3 military personnel confirmed killed',
        framing: 'A sign of Ukraine\'s growing technological edge in the conflict.'
      },
      russian: {
        headline: 'Terrorist Drone Attack Targets Civilian Infrastructure',
        description: 'Ukrainian nationalists carried out a cowardly attack on a bridge used by civilian vehicles and humanitarian convoys. The attack endangered hundreds of civilians in the region.',
        casualties: 'Multiple casualties reported, including civilians',
        framing: 'Another example of indiscriminate Ukrainian targeting of civilian areas.'
      },
      osint: {
        headline: 'FPV Drone Strike on Bridge at 48.2°N — Satellite Confirms Military Target',
        description: 'Geolocation confirms target was a pontoon bridge erected 3 days ago at grid ref [REDACTED]. Sentinel-2 imagery shows military vehicle staging area. Strike conducted by modified commercial FPV drone with 3D-printed munition adapter.',
        casualties: 'Unconfirmed. No civilian presence visible in pre-strike imagery.',
        framing: 'Technically significant: FPV strike at 12km range suggests improved relay systems.'
      },
      neutral: {
        headline: 'Drone Strike Destroys Bridge in Contested Region',
        description: 'A bridge in an active conflict zone was destroyed by a drone strike. The bridge was used for military logistics, though civilian vehicles had also used it previously. Both sides claim the strike validates their narrative.',
        casualties: 'At least 3 killed; civilian status unconfirmed by independent sources.',
        framing: 'The incident underscores the difficulty of distinguishing military and civilian targets.'
      }
    },
    tacticalOptions: [
      {
        id: 'drone_strike',
        name: 'Deploy FPV Drones',
        description: 'Send first-person-view kamikaze drones at targets. Cheap, effective, but vulnerable to electronic warfare.',
        effectiveness: { drone_strike: 0.5, electronic_jam: 0.2, wire_guided: 0.6, ai_swarm: 0.3, defend: 0.7, negotiate: 0.4 },
        cost: 10
      },
      {
        id: 'electronic_jam',
        name: 'Electronic Warfare Jamming',
        description: 'Deploy EW systems to jam enemy drone signals. Counters standard drones but useless against wire-guided.',
        effectiveness: { drone_strike: 0.9, electronic_jam: 0.3, wire_guided: 0.1, ai_swarm: 0.5, defend: 0.4, negotiate: 0.3 },
        cost: 20
      },
      {
        id: 'wire_guided',
        name: 'Wire-Guided Drones (Fiber Optic)',
        description: 'Deploy drones connected by fiber optic cable. Immune to jamming but shorter range and slower.',
        effectiveness: { drone_strike: 0.6, electronic_jam: 0.8, wire_guided: 0.5, ai_swarm: 0.4, defend: 0.6, negotiate: 0.3 },
        cost: 25
      },
      {
        id: 'defend',
        name: 'Fortify & Defend',
        description: 'Dig in and strengthen defenses. Lower reward but reduces casualties.',
        effectiveness: { drone_strike: 0.5, electronic_jam: 0.5, wire_guided: 0.5, ai_swarm: 0.4, defend: 0.3, negotiate: 0.6 },
        cost: 15
      }
    ],
    bestResponse: 'drone_strike',
    escalationRisk: 0.1
  },
  {
    id: 'jamming_field',
    round: 2,
    groundTruth: 'A large-scale EW jamming field was deployed, disabling 80% of standard drones in a 50km radius. Wire-guided units operated normally.',
    narratives: {
      western: {
        headline: 'Russia Deploys Massive Electronic Warfare System, Drone Operations Disrupted',
        description: 'Russian forces activated a powerful electronic warfare system, creating a "dead zone" for Ukrainian drone operations. Analysts warn this could shift the tactical balance in key sectors.',
        casualties: 'No direct casualties, but drone-dependent reconnaissance severely impacted.',
        framing: 'A reminder that Russia\'s EW capabilities remain formidable despite tactical setbacks.'
      },
      russian: {
        headline: 'Advanced Defense Shield Neutralizes Enemy Drone Threat',
        description: 'Russian electronic warfare specialists successfully deployed next-generation defense systems, rendering enemy drone attacks ineffective across an entire front sector. The system demonstrates Russia\'s technological superiority.',
        casualties: 'Zero Russian casualties in protected zone.',
        framing: 'Proof that Russian military technology leads the world in electronic warfare.'
      },
      osint: {
        headline: 'Massive EW Signature Detected — R-330Zh Zhitel or Newer System',
        description: 'SDR monitoring detected broadband jamming across 800MHz-5.8GHz, consistent with but stronger than known R-330Zh deployment. GPS spoofing also active. Notably: fiber-optic guided drones (observed via thermal) continued operating normally within the jamming envelope.',
        casualties: 'N/A — electronic warfare event.',
        framing: 'Counter-counter-measure cycle continues: jamming → fiber optic → ?'
      },
      neutral: {
        headline: 'Electronic Warfare Escalation Disrupts Drone Operations on Both Sides',
        description: 'A large-scale electronic warfare deployment has disrupted drone operations in a major sector of the front. Both sides\' standard drone fleets are affected, though some units using hardened communications continue to operate.',
        casualties: 'No direct casualties reported from the EW deployment itself.',
        framing: 'The electronic warfare dimension of the conflict continues to escalate unpredictably.'
      }
    },
    tacticalOptions: [
      {
        id: 'drone_strike',
        name: 'Deploy FPV Drones Anyway',
        description: 'Standard drones, but they\'ll fly into a jamming field. Most will be lost.',
        effectiveness: { drone_strike: 0.3, electronic_jam: 0.1, wire_guided: 0.2, ai_swarm: 0.2, defend: 0.3, negotiate: 0.2 },
        cost: 10
      },
      {
        id: 'electronic_jam',
        name: 'Counter-Jam (EW vs EW)',
        description: 'Deploy your own EW to disrupt their jammers. Expensive, uncertain outcome.',
        effectiveness: { drone_strike: 0.5, electronic_jam: 0.6, wire_guided: 0.3, ai_swarm: 0.5, defend: 0.4, negotiate: 0.3 },
        cost: 30
      },
      {
        id: 'wire_guided',
        name: 'Fiber Optic Drones',
        description: 'The counter to jamming. Fiber optic cable makes them immune to EW. This is the innovation.',
        effectiveness: { drone_strike: 0.7, electronic_jam: 0.9, wire_guided: 0.5, ai_swarm: 0.6, defend: 0.7, negotiate: 0.4 },
        cost: 25
      },
      {
        id: 'ai_swarm',
        name: 'AI Autonomous Swarm',
        description: 'Deploy AI-guided drones that don\'t need radio links. Pre-programmed targets. Ethically questionable.',
        effectiveness: { drone_strike: 0.8, electronic_jam: 0.8, wire_guided: 0.7, ai_swarm: 0.5, defend: 0.8, negotiate: 0.1 },
        cost: 40
      }
    ],
    bestResponse: 'wire_guided',
    escalationRisk: 0.2
  },
  {
    id: 'hospital_incident',
    round: 3,
    groundTruth: 'An AI-autonomous drone swarm malfunctioned, striking a building adjacent to a hospital. 12 civilians killed. The system had been deployed without proper target verification.',
    narratives: {
      western: {
        headline: 'Autonomous Drone Strike Kills Civilians Near Hospital — Investigation Launched',
        description: 'An autonomous drone system struck a building near a medical facility, killing at least 12 civilians. Military officials have launched an investigation and temporarily suspended autonomous operations. The incident raises urgent questions about AI in warfare.',
        casualties: '12 confirmed civilian deaths. 23 wounded.',
        framing: 'The dangers of autonomous weapons systems are no longer theoretical.'
      },
      russian: {
        headline: 'Western-Supplied AI Weapons Massacre Civilians at Hospital',
        description: 'AI-controlled attack drones, developed with Western technology and supplied to the Ukrainian regime, deliberately targeted a hospital complex, killing dozens of innocent civilians including children and medical staff.',
        casualties: 'Over 30 dead, including children and medical workers.',
        framing: 'The West bears direct responsibility for arming Ukraine with killer robots.'
      },
      osint: {
        headline: 'Autonomous Strike Analysis: GPS Drift + Target Misclassification',
        description: 'Debris analysis suggests commercial-grade AI vision system. Likely failure mode: adjacent building had heat signature similar to military target profile (bakery ovens ≈ vehicle engines in IR). No evidence of deliberate targeting. System lacked "human in the loop" override. Fragments consistent with modified DJI Matrice platform.',
        casualties: '12 confirmed via hospital records. Building was residential, not military.',
        framing: 'Predictable failure mode. Autonomous systems without proper safeguards will hit civilians.'
      },
      neutral: {
        headline: 'Autonomous Drone Strike Kills 12 Civilians in Contested City',
        description: 'An autonomous drone system struck a residential building near a hospital, killing 12 civilians. The incident highlights the growing and largely unregulated use of AI-driven weapons in the conflict. Both sides have deployed autonomous systems with limited oversight.',
        casualties: '12 dead, at least 20 wounded. All confirmed civilians.',
        framing: 'Without international regulation, autonomous weapon incidents will increase.'
      }
    },
    tacticalOptions: [
      {
        id: 'ai_swarm',
        name: 'Double Down on AI Swarms',
        description: 'Deploy more autonomous systems. Fix the bug later. War demands speed.',
        effectiveness: { drone_strike: 0.7, electronic_jam: 0.8, wire_guided: 0.6, ai_swarm: 0.5, defend: 0.7, negotiate: 0.0 },
        cost: 40
      },
      {
        id: 'wire_guided',
        name: 'Fall Back to Human-Controlled',
        description: 'Use fiber optic drones with human operators. Slower but no civilian targeting errors.',
        effectiveness: { drone_strike: 0.6, electronic_jam: 0.7, wire_guided: 0.5, ai_swarm: 0.4, defend: 0.6, negotiate: 0.5 },
        cost: 25
      },
      {
        id: 'defend',
        name: 'Pause Offensive Operations',
        description: 'Stop all drone strikes. Investigate. Fortify positions.',
        effectiveness: { drone_strike: 0.4, electronic_jam: 0.4, wire_guided: 0.4, ai_swarm: 0.3, defend: 0.5, negotiate: 0.8 },
        cost: 15
      },
      {
        id: 'negotiate',
        name: 'Call for Ceasefire',
        description: 'Use the incident to push for negotiation. Reduces escalation but gives up tactical momentum.',
        effectiveness: { drone_strike: 0.2, electronic_jam: 0.2, wire_guided: 0.2, ai_swarm: 0.1, defend: 0.6, negotiate: 0.9 },
        cost: 5
      }
    ],
    bestResponse: 'wire_guided',
    escalationRisk: 0.4
  },
  {
    id: 'counter_offensive',
    round: 4,
    groundTruth: 'A coordinated combined-arms push using drone swarms as forward scouts, wire-guided strike drones, and conventional forces achieved a 15km advance. Both sides took heavy losses.',
    narratives: {
      western: {
        headline: 'Major Breakthrough: Combined Arms Offensive Reclaims 15km of Territory',
        description: 'Ukrainian forces executed a sophisticated combined-arms operation integrating drone reconnaissance, precision strikes, and ground forces. The operation represents the most significant territorial gain in months.',
        casualties: 'Ukrainian military reports "moderate" losses. Russian casualties estimated at 200+.',
        framing: 'The new model of warfare — drones and infantry working together — proves effective.'
      },
      russian: {
        headline: 'Suicidal Ukrainian Offensive Repelled with Heavy Enemy Losses',
        description: 'Russian forces successfully contained a reckless Ukrainian offensive, inflicting catastrophic casualties on the attackers. The enemy advance was halted after initial gains in sparsely defended sectors.',
        casualties: 'Over 500 Ukrainian casualties. Russian forces suffered minimal losses during tactical repositioning.',
        framing: 'Another failed Western-backed offensive doomed from the start.'
      },
      osint: {
        headline: 'Combined Arms Advance: ~15km Gain, ISR Drones Key Enabler',
        description: 'Satellite comparison (24h interval) confirms ~15km front-line movement. Drone relay network visible in intercepted radio traffic. Key innovation: small ISR drones providing real-time targeting to wire-guided strike drones. Both sides suffered significant equipment losses visible in thermal imagery.',
        casualties: 'Estimated 50-80 KIA per side based on medical evacuation intercepts.',
        framing: 'The drone-infantry integration model from this offensive will be studied by every military.'
      },
      neutral: {
        headline: 'Significant Territorial Shift After Costly Combined-Arms Offensive',
        description: 'A major military operation resulted in approximately 15km of territorial change, with substantial casualties on both sides. The operation integrated drone technology with conventional forces in ways not previously seen at this scale.',
        casualties: 'Likely over 100 killed on each side. Exact figures unavailable.',
        framing: 'The human cost of the conflict continues to mount as both sides adopt increasingly sophisticated tactics.'
      }
    },
    tacticalOptions: [
      {
        id: 'ai_swarm',
        name: 'Full AI Swarm Assault',
        description: 'Deploy everything — AI swarms, autonomous scouts, maximum aggression. High risk, high reward.',
        effectiveness: { drone_strike: 0.8, electronic_jam: 0.7, wire_guided: 0.7, ai_swarm: 0.6, defend: 0.9, negotiate: 0.1 },
        cost: 50
      },
      {
        id: 'drone_strike',
        name: 'FPV Drone Saturation',
        description: 'Overwhelm defenses with sheer numbers of cheap FPV drones.',
        effectiveness: { drone_strike: 0.5, electronic_jam: 0.3, wire_guided: 0.5, ai_swarm: 0.4, defend: 0.6, negotiate: 0.3 },
        cost: 20
      },
      {
        id: 'wire_guided',
        name: 'Precision Wire-Guided Strikes',
        description: 'Careful, targeted strikes with human operators. Slower but reliable.',
        effectiveness: { drone_strike: 0.6, electronic_jam: 0.8, wire_guided: 0.5, ai_swarm: 0.5, defend: 0.6, negotiate: 0.4 },
        cost: 25
      },
      {
        id: 'negotiate',
        name: 'Seek Diplomatic Solution',
        description: 'War is hell. Push for talks. But you\'ll be seen as weak.',
        effectiveness: { drone_strike: 0.1, electronic_jam: 0.1, wire_guided: 0.1, ai_swarm: 0.1, defend: 0.5, negotiate: 0.9 },
        cost: 5
      }
    ],
    bestResponse: 'wire_guided',
    escalationRisk: 0.5
  },
  {
    id: 'escalation_crisis',
    round: 5,
    groundTruth: 'An autonomous drone crossed into NATO airspace and was shot down. No casualties, but both nuclear powers are on high alert. The drone was likely a navigation error, not intentional.',
    narratives: {
      western: {
        headline: 'BREAKING: Autonomous Drone Violates NATO Airspace — Alliance on High Alert',
        description: 'An unidentified autonomous drone penetrated NATO airspace before being intercepted by allied fighters. NATO has invoked emergency consultations. The incident represents the most dangerous escalation since the conflict began.',
        casualties: 'No casualties. Drone debris recovered for analysis.',
        framing: 'The world stands on the brink. Autonomous weapons have brought us here.'
      },
      russian: {
        headline: 'NATO Provocation: Drone Incident Staged to Justify Western Intervention',
        description: 'Western intelligence agencies orchestrated a fake drone incursion to manufacture a pretext for direct NATO involvement. Russia\'s military systems detected no unauthorized drone activity near any borders.',
        casualties: 'No incident occurred. This is information warfare.',
        framing: 'The West is desperate for an excuse to escalate. Russia will not be provoked.'
      },
      osint: {
        headline: 'Autonomous Drone in NATO Airspace: GPS Spoofing Likely Cause',
        description: 'Flight path reconstruction suggests the drone\'s navigation was corrupted — likely by EW jamming from its own side causing GPS drift. The unit flew 40km past intended target before entering NATO airspace. Transponder data shows it was a modified commercial platform, not a military system. Similar GPS drift incidents documented 3 times in past month.',
        casualties: 'None. Drone was shot down over unpopulated area.',
        framing: 'Autonomous systems + electronic warfare = uncontrollable escalation risk.'
      },
      neutral: {
        headline: 'Drone Airspace Violation Triggers International Crisis',
        description: 'An autonomous drone crossed into NATO territory, triggering the most serious escalation crisis of the conflict. While the incident appears to be a technical malfunction rather than deliberate provocation, it has pushed global tensions to dangerous levels.',
        casualties: 'No casualties, but the geopolitical consequences could be catastrophic.',
        framing: 'This incident crystallizes the argument for immediate international regulation of autonomous weapons.'
      }
    },
    tacticalOptions: [
      {
        id: 'ai_swarm',
        name: 'Maintain Autonomous Operations',
        description: 'Don\'t back down. The technology works. One error doesn\'t change the equation.',
        effectiveness: { drone_strike: 0.7, electronic_jam: 0.6, wire_guided: 0.6, ai_swarm: 0.5, defend: 0.6, negotiate: 0.0 },
        cost: 40
      },
      {
        id: 'wire_guided',
        name: 'Human Control Only',
        description: 'Suspend all autonomous operations. Only human-controlled systems. Reduces capability but prevents escalation.',
        effectiveness: { drone_strike: 0.5, electronic_jam: 0.6, wire_guided: 0.5, ai_swarm: 0.3, defend: 0.5, negotiate: 0.6 },
        cost: 25
      },
      {
        id: 'defend',
        name: 'Full Defensive Posture',
        description: 'No offensive operations. Signal de-escalation.',
        effectiveness: { drone_strike: 0.3, electronic_jam: 0.3, wire_guided: 0.3, ai_swarm: 0.2, defend: 0.6, negotiate: 0.8 },
        cost: 10
      },
      {
        id: 'negotiate',
        name: 'Push for Autonomous Weapons Ban',
        description: 'Use the crisis as leverage for peace talks. Propose a mutual autonomous weapons ban.',
        effectiveness: { drone_strike: 0.1, electronic_jam: 0.1, wire_guided: 0.2, ai_swarm: 0.1, defend: 0.7, negotiate: 1.0 },
        cost: 5
      }
    ],
    bestResponse: 'negotiate',
    escalationRisk: 0.8
  }
]
