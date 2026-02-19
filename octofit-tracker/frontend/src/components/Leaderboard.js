import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard - Fetching from REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || data;
        setLeaderboard(leaderboardList);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span>Loading leaderboard...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Leaderboard</h5>
        <p className="mb-0">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🏆 Leaderboard</h2>
        <span className="badge bg-success">{leaderboard.length} Competitors</span>
      </div>
      {leaderboard.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          <h5>No leaderboard data available</h5>
          <p className="mb-0">Complete activities to appear on the leaderboard!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Total Points</th>
                <th scope="col">Total Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => {
                const rankBadge = index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-primary';
                const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
                return (
                  <tr key={entry.id || index}>
                    <td>
                      <span className={`badge ${rankBadge} fs-6`}>
                        {rankIcon} {index + 1}
                      </span>
                    </td>
                    <td><strong>{entry.user}</strong></td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {entry.team || 'No Team'}
                      </span>
                    </td>
                    <td>
                      <strong className="text-success fs-5">{entry.total_points}</strong> pts
                    </td>
                    <td>
                      <span className="badge bg-secondary">{entry.total_activities}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
