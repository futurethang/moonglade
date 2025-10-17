import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const characters = [
  {
    id: 1,
    name: '"Tommie" LaBouche',
    role: 'Jo Burkholder',
    backstory: "Tommie has enjoyed a long career as a cabaret performer and club owner in Paris. He's rubbed shoulders with artists like Hemingway and Picasso, and with wealthy rabble-rousers like Victor Timmins. Although a confirmed bachelor, Tommie took his sister's orphaned daughter, Stella, under his wing after the war. Tommie was delighted to travel to America, with Stella and another girl, to perform at his old friend Victor's party.",
    image: "/images/JoBW.webp",
    canVoteFor: true
  },
  {
    id: 2,
    name: 'Isabelle Timmins',
    role: 'Nina Legout',
    backstory: "Isabelle met the dashing and wealthy Vic Timmins in Paris, and came to America as his wife. She is no fan of her husband's shady business dealings, but she so enjoys having money. Sources say that Isabelle spends nearly all of her time these days at the Timmins' penthouse in the city, and little at their main residence, Moonglade Manor. Will she bother to come out to the sticks for her husband's party?",
    image: "/images/nina1bw.webp",
    canVoteFor: true
  },
  {
    id: 3,
    name: 'Trixie McQueen',
    role: 'Randi Morrison',
    backstory: "Trixie is a dancer at the Can-Can Club, located somewhere between the city and Moonglade Manor. She loves attention, loves to party, and has a long line of admirers, including Vic Timmins. She also has an overprotective twin sister named Siobhan (nickname: Shiv) who is the highest-ranking woman in the mob.",
    image: "/images/Randi.webp",
    canVoteFor: true
  },
  {
    id: 4,
    name: 'Camille Diamond',
    role: 'Tessa Vanderwielen',
    backstory: "Camille, along with Tommie LaBouche and his niece Stella, has traveled from Paris to perform cabaret acts at Vic Timmins's party. She was a last-minute replacement for another dancer, Marie, who had an unfortunate accident a few days before the trip. Camille loves things that shine and cost a lot of money, and she can't wait to take the world by storm.",
    image: "/images/tessa2bw.webp",
    canVoteFor: true
  },
  {
    id: 5,
    name: 'Martha & James',
    role: 'Emily Eberle-Levine & Mikey Eberle-Levine',
    backstory: "Martha and James are the maid and footman at Moonglade Manor. They began service around the same time, claiming not to know each other, and have been thick as thieves ever since. Remarkably observant, they often know who is coming for a meeting before Victor ever tells them. They have been seen in the city on their days off, enjoying dinners that look much too expensive for their salaries.",
    image: "/images/mikey_emily3bw.webp",
    canVoteFor: true
  },
  {
    id: 6,
    name: 'Siobhan "Shiv" McQueen',
    role: 'Meredith Armstrong',
    backstory: "Shiv has been a bruiser since the day she kicked her way out of her mother's womb. Some say she then reached a tiny hand back for her beloved twin, Trixie. Rising in the mob was extra tough as a woman, and Shiv made scores of enemies along the way. Not many people know that Shiv bankrolled Vic Timmins's first business venture – with money so dirty even the mob wouldn't touch it – and he has never paid her back.",
    image: "/images/meredith3bw.webp",
    canVoteFor: true
  },
  {
    id: 7,
    name: 'Victor "Vic" Timmins',
    role: 'Garet Nenninger',
    backstory: "Though Victor was born with a silver spoon in his mouth, he found that he preferred the taste of gold. He blew all of his parents' money in Europe, fought in the war, and returned with his own butler but no house. Ever the charmer, he made numerous mob connections and played them against each other, amassing a small fortune along the way. These days, he runs Timmins Industries from the comfort of Moonglade Manor, sips the finest wines, and hosts lavish parties every fall. But make no mistake: Victor will always be hungry for the next shiny thing, and will cut down anyone standing in his way.",
    image: "/images/garetbw.webp",
    canVoteFor: false
  },
  {
    id: 8,
    name: 'Arthur Wensleydale',
    role: 'Phil Beber',
    backstory: "Born and raised in England, Arthur Wensleydale was a hero in the war. He lost an arm saving a group of fellow soldiers under attack – including Victor Timmins. Nobody can fathom how Wensleydale survived his heroic act, but Timmins was appreciative enough to bring him back to America to live as his butler and companion.",
    image: "/images/philbw.webp",
    canVoteFor: true
  },
  {
    id: 9,
    name: 'Stella Pearl',
    role: 'Jenni Newman',
    backstory: "Stella grew up in France, never knowing who her father was. When her mother died, Uncle Tommie whisked her off to Paris to perform in his cabaret. Although Tommie was seen as a saint for taking in the poor urchin, Stella holds the outlandish belief that she should decide what she gets to do with her life. But some new information about her parentage has made her very interested in taking this trip to America.",
    image: "/images/jenni1bw.webp",
    canVoteFor: true
  },
  {
    id: 10,
    name: 'Angel Fairweather',
    role: 'Amy Neuburger',
    backstory: "Angel is new in town, so don't worry if you haven't seen her before. She was invited to the event at Moonglade Manor by Victor himself. (Who knows where he knew her from!) Angel prides herself on her ability to blend in with the jewel-dripping elite as easily as she blends in with the dockworkers or the nuns. The only thing she'd say is more important than versatility is a strong work ethic.",
    image: "/images/Amy1bw.webp",
    canVoteFor: true
  },
  {
    id: 11,
    name: 'Delilah von Featherbottom',
    role: 'Jeani Hunt',
    backstory: "Delilah grew up in the cold shadow of her older brother, Victor Timmins. Her parents suffered from the barbaric and outdated notion that a woman should pass from the hands to her parents to those of her husband, accumulating no wealth of her own on the journey. So they left everything to Vic. Delilah married the Count Egon von Featherbottom and promptly watched him gamble their money away. She spends her time in the city, attending society events and snitching jewels from cloakrooms.",
    image: "/images/jeani2bw.webp",
    canVoteFor: true
  },
  {
    id: 12,
    name: 'Detective MaeBelle "Monty" Montgomery',
    role: 'Adrienne Mays',
    backstory: 'Detective Montgomery prefers the nickname "Monty," but most people insist on using her given name, MaeBelle. She grew up on the wrong side of the tracks with the McQueen twins (Shiv and Trixie), but went the way of law enforcement rather than law breaking. She has a fierce sense of justice and a love of puzzles, so she just might be the one to break this case wide open. (Not that there is a case! Not that anything like murder would happen here!)',
    image: "/images/adrienne1bw.webp",
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
        <h2>Death at Moonglade Manor: an aerial murder mystery</h2>
        <p>Welcome to Moonglade Manor, home of the large-living, crooked tycoon Victor Timmins. You are guests at his party, so sit back, relax, and get to know some of your fellow guests, listed below.</p>
        <div className="show-info">
          <p>
            <strong>DO NOT</strong> click the voting button next to anyone's name until you are asked to do so, late in the show. Clicking a button will accuse someone. . . . of murder!
            <br />
            (Not to suggest anything like murder would ever happen here, of course!)
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
      
      <div className="credits-section" style={{marginTop: '5rem'}}>
        <div className="character-card credits-card">
          <div className="character-image">
            <img src="/images/jill-bw.webp" alt="Jill Maio" />
          </div>
          <h3>Criminal Mastermind: Jill "The Quill" Maio</h3>
          <div className="role">Writer • Director • Producer</div>
          <div className="backstory">
            Jill is the writer-director-producer of Death at Moonglade Manor, and probably the guiltiest of them all. She would like to thank a cast that was truly inspiring to work with, and an always-stellar tech crew. Special thanks to Bev Sobelman for helping to get this party started before the 2020 pandemic outbreak put it on pause, and for the renewed support this year. Thanks also to Amy Funbuttons for consulting, to Jen Ryan for making extra space, and to Kevin Hyde for his sweet design skills.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInterface;