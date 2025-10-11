import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const characters = [
  {
    id: 1,
    name: "Lady Victoria Ashworth",
    role: "The Wealthy Widow",
    backstory: "Recently inherited a vast fortune after her husband's mysterious death. Known for her lavish parties and sharp tongue. Has many secrets hidden behind her charming smile.",
    image: "/images/adrienne1bw.webp",
    canVoteFor: true
  },
  {
    id: 2,
    name: "Dr. Edmund Blackwell",
    role: "The Family Doctor",
    backstory: "The trusted family physician with access to deadly substances. Has been treating the Ashworth family for years and knows all their medical secrets.",
    image: "/images/philbw.webp",
    canVoteFor: true
  },
  {
    id: 3,
    name: "Margaret Sterling",
    role: "The Loyal Maid",
    backstory: "Has served the family for over 20 years. Sees everything, hears everything, but rarely speaks. Her silence might be hiding deadly knowledge.",
    image: "/images/meredith3bw.webp",
    canVoteFor: true
  },
  {
    id: 4,
    name: "Charles Worthington",
    role: "The Business Partner",
    backstory: "Victoria's late husband's business associate with mounting debts. Desperately needs money and has been making increasingly dangerous deals.",
    image: "/images/garetbw.webp",
    canVoteFor: true
  },
  {
    id: 5,
    name: "Ruby Diamond",
    role: "The Cabaret Singer",
    backstory: "The mysterious entertainer with connections to the underground. Known for her sultry voice and even more sultry secrets about the city's elite.",
    image: "/images/tessa2bw.webp",
    canVoteFor: true
  },
  {
    id: 6,
    name: "Detective Harrison",
    role: "The Investigating Officer",
    backstory: "The hard-boiled detective assigned to the case. Has his own dark past and may not be as honest as he appears. Could he be covering up his own crimes?",
    image: "/images/mikey_emily3bw.webp",
    canVoteFor: false
  },
  {
    id: 7,
    name: "Lord Reginald Ashworth",
    role: "The Deceased",
    backstory: "The late patriarch whose mysterious death started it all. Found in the library with signs of poisoning. Even in death, his secrets continue to haunt Moonglade Manor.",
    image: "/images/JoBW.webp",
    canVoteFor: false
  },
  {
    id: 8,
    name: "Inspector Collins",
    role: "The Lead Investigator",
    backstory: "Scotland Yard's finest, called in to solve the case. Known for his methodical approach and keen eye for detail. Will he uncover the truth, or become the next victim?",
    image: "/images/Amy1bw.webp",
    canVoteFor: false
  }
];

const MainInterface = ({ hasVoted, onVoteSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleVote = async (character) => {
    // Confirmation dialog
    if (!window.confirm(`Are you sure you want to vote for ${character.name}?\n\nYou can only vote ONCE and cannot change your vote!`)) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Generate a unique voter ID
      const voterId = `${navigator.userAgent.slice(-10)}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Get current time in Pacific timezone
      const pacificTime = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
      const pacificDate = new Date(pacificTime);
      const pacificHour = pacificDate.getHours();
      
      // Determine show time based on Pacific timezone (before 6 PM = 4PM show)
      const showTime = pacificHour < 18 ? '4PM' : '8PM';
      
      const { error: insertError } = await supabase
        .from('votes')
        .insert([
          {
            character_id: character.id,
            character_name: character.name,
            voter_id: voterId,
            show_time: showTime,
            pacific_timestamp: pacificTime,
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      onVoteSubmitted();
      alert(`Thank you! Your vote for ${character.name} has been submitted.`);
    } catch (err) {
      console.error('Error submitting vote:', err);
      setError('Failed to submit vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-interface">
      <div className="show-header">
        <p className="tagline">It's so hard to find non-murderous help these days...</p>
        <div className="show-info">
          <p>
            <strong>The Scene:</strong> The wealthy socialite has been found dead in the library. 
            Six suspects remain, each with their own dark secrets. 
            Can you solve the mystery before the killer strikes again?
          </p>
          {!hasVoted && (
            <p className="voting-instruction">
              <strong>Your Mission:</strong> Click "VOTE FOR GUILTY" on the suspect you believe is the murderer. 
              Choose carefully - you only get one vote!
            </p>
          )}
          {hasVoted && (
            <div className="voted-banner">
              <h3>✓ Thank You For Voting!</h3>
              <p>Your vote has been submitted. Enjoy the show!</p>
            </div>
          )}
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="characters-grid">
        {characters.map(character => (
          <div key={character.id} className={`character-card ${!character.canVoteFor ? 'non-votable' : ''}`}>
            <div className="character-image">
              <img src={character.image} alt={character.name} />
            </div>
            <h3>{character.name}</h3>
            <div className="role">{character.role}</div>
            <div className="backstory">{character.backstory}</div>
            
            {character.canVoteFor ? (
              !hasVoted ? (
                <button
                  className="vote-button"
                  onClick={() => handleVote(character)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'VOTE FOR GUILTY'}
                </button>
              ) : (
                <div className="vote-disabled">
                  Voting Complete
                </div>
              )
            ) : (
              <div className="not-suspect">
                Not a Suspect
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="creator-section">
        <div className="creator-profile">
          <div className="creator-header">
            <h2>Meet the Mastermind</h2>
          </div>
          <div className="creator-content">
            <div className="creator-image">
              <img src="/images/jill-bw.webp" alt="Jill Maio" />
            </div>
            <div className="creator-info">
              <h3>Jill Maio</h3>
              <div className="creator-title">Writer • Producer • Director</div>
              <div className="creator-bio">
                <p>
                  The mastermind behind tonight's murder and mayhem! Jill Maio has been crafting 
                  intricate mysteries and unforgettable characters for over a decade. Known for her 
                  ability to weave complex plots that keep audiences guessing until the very last 
                  reveal, she specializes in interactive murder mystery experiences that blur the 
                  line between theater and reality.
                </p>
                <p>
                  When she's not busy plotting fictional murders, Jill can be found researching 
                  obscure poisons, studying vintage crime scenes, and perfecting the art of the 
                  red herring. Her motto: "The best mysteries are the ones where everyone could 
                  be guilty... but only one person is."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInterface;