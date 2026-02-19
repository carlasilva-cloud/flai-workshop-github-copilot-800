import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams - Fetching from REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results || data;
        setTeams(teamsList);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleViewTeam = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  const handleCreateTeam = () => {
    alert('Create Team feature coming soon! This will open a form to create a new team.');
  };

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span>Loading teams...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Teams</h5>
        <p className="mb-0">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">👥 Teams</h2>
        <button className="btn btn-primary btn-sm" onClick={handleCreateTeam}>
          <span>+ Create Team</span>
        </button>
      </div>
      {teams.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h5>No teams found</h5>
          <p className="mb-0">Create or join a team to compete together!</p>
        </div>
      ) : (
        <div className="row">
          {teams.map(team => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{team.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span><strong>👤 Members</strong></span>
                    <span className="badge bg-primary rounded-pill">{team.member_count || 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span><strong>📅 Created</strong></span>
                    <small>{new Date(team.created_at).toLocaleDateString()}</small>
                  </li>
                </ul>
                <div className="card-footer bg-transparent border-0">
                  <button 
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => handleViewTeam(team)}
                  >
                    View Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Team Details */}
      {showModal && selectedTeam && (
        <div 
          className="modal show d-block" 
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          onClick={handleCloseModal}
        >
          <div 
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <strong>👥 {selectedTeam.name}</strong>
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6 className="text-muted">Description</h6>
                  <p>{selectedTeam.description || 'No description available'}</p>
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <h6 className="text-muted">Team ID</h6>
                    <p><span className="badge bg-secondary">#{selectedTeam.id}</span></p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6 className="text-muted">Members</h6>
                    <p><span className="badge bg-primary">{selectedTeam.member_count || 0}</span></p>
                  </div>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">Created Date</h6>
                  <p>{new Date(selectedTeam.created_at).toLocaleString()}</p>
                </div>
                {selectedTeam.members && selectedTeam.members.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-muted">Team Members</h6>
                    <ul className="list-group">
                      {selectedTeam.members.map((member, idx) => (
                        <li key={idx} className="list-group-item">{member}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => alert('Join Team feature coming soon!')}
                >
                  Join Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
