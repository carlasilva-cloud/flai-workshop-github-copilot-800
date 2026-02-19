import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to OctoFit Tracker! 🎯</h1>
        <p className="lead">Your comprehensive fitness tracking and team competition platform</p>
        <hr className="my-4" />
        <p className="mb-4">Track your activities, compete with teams, and get personalized workout suggestions.</p>
        
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card text-center border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="mb-3" style={{fontSize: '3rem'}}>📊</div>
                <h5 className="card-title">Track Activities</h5>
                <p className="card-text text-muted">Log your workouts and monitor your progress over time</p>
                <Link to="/activities" className="btn btn-primary">View Activities</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="mb-3" style={{fontSize: '3rem'}}>🏆</div>
                <h5 className="card-title">Compete</h5>
                <p className="card-text text-muted">Join teams and climb the leaderboard</p>
                <Link to="/leaderboard" className="btn btn-success">View Leaderboard</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="mb-3" style={{fontSize: '3rem'}}>💪</div>
                <h5 className="card-title">Get Fit</h5>
                <p className="card-text text-muted">Access personalized workout recommendations</p>
                <Link to="/workouts" className="btn btn-info">View Workouts</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">👥 Join a Team</h5>
                <p className="card-text text-muted">Connect with like-minded fitness enthusiasts</p>
                <Link to="/teams" className="btn btn-outline-primary btn-sm">Browse Teams</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">👤 View Community</h5>
                <p className="card-text text-muted">See who's crushing their fitness goals</p>
                <Link to="/users" className="btn btn-outline-secondary btn-sm">View Users</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/octofitapp-small.svg" alt="OctoFit Logo" className="me-2" style={{width: '40px', height: '40px'}} />
              <strong>OctoFit Tracker</strong>
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👤 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">📊 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">👥 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
