import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminDashboard = () => {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTime, setShowTime] = useState('4PM');
  const [isClearing, setIsClearing] = useState(false);
  const [detailedVotes, setDetailedVotes] = useState([]);
  const [showDetailedView, setShowDetailedView] = useState(false);

  const fetchVotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('show_time', showTime)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Store detailed votes for timestamp display
      const formattedDetailedVotes = data?.map(vote => ({
        ...vote,
        formatted_time: vote.pacific_timestamp || 
          new Date(vote.created_at).toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }),
        utc_time: new Date(vote.created_at).toLocaleString("en-US", {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZoneName: 'short'
        })
      })) || [];
      
      setDetailedVotes(formattedDetailedVotes);

      // Count votes by character
      const voteCounts = {};
      data?.forEach(vote => {
        voteCounts[vote.character_name] = (voteCounts[vote.character_name] || 0) + 1;
      });

      // Convert to array and sort by vote count
      const sortedVotes = Object.entries(voteCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      setVotes(sortedVotes);
    } catch (error) {
      console.error('Error fetching votes:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearVotes = async () => {
    if (!window.confirm(`Are you sure you want to clear all votes for the ${showTime} show? This action cannot be undone.`)) {
      return;
    }

    setIsClearing(true);
    try {
      const { error } = await supabase
        .from('votes')
        .delete()
        .eq('show_time', showTime);

      if (error) throw error;

      await fetchVotes(); // Refresh the data
      alert('Votes cleared successfully!');
    } catch (error) {
      console.error('Error clearing votes:', error);
      alert('Failed to clear votes. Please try again.');
    } finally {
      setIsClearing(false);
    }
  };

  const clearAllVotes = async () => {
    if (!window.confirm('Are you sure you want to clear ALL votes for BOTH shows? This action cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    try {
      const { error } = await supabase
        .from('votes')
        .delete()
        .neq('id', 0); // Delete all records

      if (error) throw error;

      await fetchVotes(); // Refresh the data
      alert('All votes cleared successfully!');
    } catch (error) {
      console.error('Error clearing all votes:', error);
      alert('Failed to clear votes. Please try again.');
    } finally {
      setIsClearing(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [showTime]);

  const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="admin-controls">
        <select 
          value={showTime} 
          onChange={(e) => setShowTime(e.target.value)}
          className="show-selector"
        >
          <option value="4PM">4PM Show</option>
          <option value="8PM">8PM Show</option>
        </select>
        
        <button 
          onClick={fetchVotes}
          className="admin-button"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
        
        <button 
          onClick={() => setShowDetailedView(!showDetailedView)}
          className="admin-button"
        >
          {showDetailedView ? 'Hide Details' : 'Show Timestamps'}
        </button>
        
        <button 
          onClick={clearVotes}
          className="admin-button danger"
          disabled={isClearing}
        >
          {isClearing ? 'Clearing...' : `Clear ${showTime} Votes`}
        </button>
        
        <button 
          onClick={clearAllVotes}
          className="admin-button danger"
          disabled={isClearing}
        >
          {isClearing ? 'Clearing...' : 'Clear All Votes'}
        </button>
      </div>

      <div className="vote-results">
        <h3>{showTime} Show Results ({totalVotes} total votes)</h3>
        
        {loading ? (
          <div className="loading">Loading votes...</div>
        ) : votes.length === 0 ? (
          <div className="no-votes">No votes yet for the {showTime} show.</div>
        ) : (
          <>
            <div className="results-list">
              {votes.map((vote, index) => (
                <div key={vote.name} className="result-item">
                  <div className="result-character">
                    <span className="rank">#{index + 1}</span>
                    {vote.name}
                  </div>
                  <div className="result-votes">
                    {vote.count} vote{vote.count !== 1 ? 's' : ''}
                    {totalVotes > 0 && (
                      <span className="percentage">
                        ({Math.round((vote.count / totalVotes) * 100)}%)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {showDetailedView && (
              <div className="detailed-votes">
                <h4>Detailed Vote Log - Pacific Time</h4>
                <div className="vote-log">
                  {detailedVotes.map((vote, index) => (
                    <div key={vote.id || index} className="vote-log-item">
                      <div className="vote-time">
                        <strong>Pacific:</strong> {vote.formatted_time}
                        <br />
                        <small><strong>UTC:</strong> {vote.utc_time}</small>
                      </div>
                      <div className="vote-character">{vote.character_name}</div>
                      <div className="vote-show-assignment">
                        <span className={`show-badge ${vote.show_time === '4PM' ? 'show-4pm' : 'show-8pm'}`}>
                          {vote.show_time} Show
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;