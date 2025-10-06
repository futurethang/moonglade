import React from 'react';

const characters = [
  {
    id: 1,
    name: "Lady Victoria Ashworth",
    role: "The Wealthy Widow",
    backstory: "Recently inherited a vast fortune after her husband's mysterious death. Known for her lavish parties and sharp tongue. Has many secrets hidden behind her charming smile.",
    emoji: "👑"
  },
  {
    id: 2,
    name: "Dr. Edmund Blackwell",
    role: "The Family Doctor",
    backstory: "The trusted family physician with access to deadly substances. Has been treating the Ashworth family for years and knows all their medical secrets.",
    emoji: "💊"
  },
  {
    id: 3,
    name: "Margaret Sterling",
    role: "The Loyal Maid",
    backstory: "Has served the family for over 20 years. Sees everything, hears everything, but rarely speaks. Her silence might be hiding deadly knowledge.",
    emoji: "🕯️"
  },
  {
    id: 4,
    name: "Charles Worthington",
    role: "The Business Partner",
    backstory: "Victoria's late husband's business associate with mounting debts. Desperately needs money and has been making increasingly dangerous deals.",
    emoji: "💼"
  },
  {
    id: 5,
    name: "Ruby Diamond",
    role: "The Cabaret Singer",
    backstory: "The mysterious entertainer with connections to the underground. Known for her sultry voice and even more sultry secrets about the city's elite.",
    emoji: "🎤"
  },
  {
    id: 6,
    name: "Detective Harrison",
    role: "The Investigating Officer",
    backstory: "The hard-boiled detective assigned to the case. Has his own dark past and may not be as honest as he appears. Could he be covering up his own crimes?",
    emoji: "🔍"
  }
];

const Playbill = () => {
  return (
    <div className="playbill">
      <div className="playbill-header">
        <h2>Death at Moonglade Manor</h2>
        <p>A murder mystery where anyone could be the killer...</p>
        <p className="show-info">
          <strong>Tonight's Show:</strong> The wealthy socialite has been found dead in the library. 
          Six suspects remain, each with their own dark secrets. 
          Can you solve the mystery before the killer strikes again?
        </p>
      </div>
      
      <div className="characters-grid">
        {characters.map(character => (
          <div key={character.id} className="character-card">
            <div className="character-image">
              {character.emoji}
            </div>
            <h3>{character.name}</h3>
            <div className="role">{character.role}</div>
            <div className="backstory">{character.backstory}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playbill;