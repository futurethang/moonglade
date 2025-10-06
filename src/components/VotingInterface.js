import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const characters = [
  { id: 1, name: "Lady Victoria Ashworth" },
  { id: 2, name: "Dr. Edmund Blackwell" },
  { id: 3, name: "Margaret Sterling" },
  { id: 4, name: "Charles Worthington" },
  { id: 5, name: "Ruby Diamond" },
  { id: 6, name: "Detective Harrison" }
];

const VotingInterface = ({ onVoteSubmitted }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitVote = async () => {
    if (!selectedCharacter) {
      setError('Please select a suspect before voting.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Generate a unique voter ID based on browser fingerprint and timestamp
      const voterId = `${navigator.userAgent.slice(-10)}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { error: insertError } = await supabase
        .from('votes')
        .insert([
          {
            character_id: selectedCharacter,
            character_name: characters.find(c => c.id === selectedCharacter)?.name,
            voter_id: voterId,
            show_time: new Date().getHours() < 18 ? '4PM' : '8PM', // Determine show time
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      onVoteSubmitted();
    } catch (err) {
      console.error('Error submitting vote:', err);
      setError('Failed to submit vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="voting-interface">
      <h2>Who Do You Think Is The Murderer?</h2>
      <p>Choose wisely - you can only vote once!</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="voting-grid">
        {characters.map(character => (
          <button
            key={character.id}
            className={`vote-option ${selectedCharacter === character.id ? 'selected' : ''}`}
            onClick={() => setSelectedCharacter(character.id)}
            disabled={isSubmitting}
          >
            {character.name}
          </button>
        ))}
      </div>
      
      <button
        className="submit-vote"
        onClick={handleSubmitVote}
        disabled={!selectedCharacter || isSubmitting}
      >
        {isSubmitting ? 'Submitting Vote...' : 'Submit Vote'}
      </button>
    </div>
  );
};

export default VotingInterface;