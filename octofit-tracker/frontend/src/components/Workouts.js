import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts - Fetching from REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results || data;
        setWorkouts(workoutsList);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts - Error fetching data:', error);
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
        <span>Loading workouts...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Workouts</h5>
        <p className="mb-0">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">💪 Personalized Workouts</h2>
        <button className="btn btn-success btn-sm">
          <span>+ Add Workout</span>
        </button>
      </div>
      {workouts.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h5>No workouts available</h5>
          <p className="mb-0">Check back soon for personalized workout suggestions!</p>
        </div>
      ) : (
        <div className="row">
          {workouts.map(workout => {
            const difficultyConfig = {
              'Beginner': { bg: 'bg-success', icon: '🟢' },
              'Intermediate': { bg: 'bg-warning', icon: '🟡' },
              'Advanced': { bg: 'bg-danger', icon: '🔴' }
            };
            const config = difficultyConfig[workout.difficulty] || difficultyConfig['Beginner'];
            
            return (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-header bg-gradient text-white" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                    <h5 className="card-title mb-0">{workout.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">{workout.description}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><strong>🏃 Type</strong></span>
                      <span className="badge bg-info text-dark">{workout.workout_type}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><strong>⏱️ Duration</strong></span>
                      <strong className="text-primary">{workout.duration} min</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><strong>📊 Difficulty</strong></span>
                      <span className={`badge ${config.bg}`}>
                        {config.icon} {workout.difficulty}
                      </span>
                    </li>
                  </ul>
                  <div className="card-footer bg-transparent border-0">
                    <button className="btn btn-primary btn-sm w-100">Start Workout</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Workouts;
