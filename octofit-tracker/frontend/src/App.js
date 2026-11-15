import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofit-logo.png';
import './App.css';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_ROOT = codespace ? `https://${codespace}-8000.app.github.dev/` : 'http://localhost:8000/';

const navItems = [
  { to: '/activities', label: 'Activities', text: 'Every workout logged by Mergington students.' },
  { to: '/leaderboard', label: 'Leaderboard', text: 'See who is leading the competition.' },
  { to: '/teams', label: 'Teams', text: 'Browse teams and their members.' },
  { to: '/users', label: 'Users', text: 'Everyone taking part in OctoFit.' },
  { to: '/workouts', label: 'Workouts', text: 'Training plans to get you moving.' },
];

function Home() {
  return (
    <div>
      <div className="p-4 mb-4 bg-white rounded-3 shadow-sm">
        <h1 className="display-5 octofit-heading">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-0">Mergington High School's fitness tracker for activities, teams and leaderboards.</p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {navItems.map(item => (
          <div className="col" key={item.to}>
            <div className="card octofit-card octofit-home-card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h2 className="card-title h5 octofit-heading">{item.label}</h2>
                <p className="card-text">{item.text}</p>
                <Link className="btn btn-primary mt-auto align-self-start" to={item.to}>
                  Open {item.label}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="container py-3">
        <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
              <img src={logo} alt="" width="44" height="44" className="octofit-logo me-2" />
              OctoFit Tracker
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
              <ul className="navbar-nav">
                {navItems.map(item => (
                  <li className="nav-item" key={item.to}>
                    <NavLink className="nav-link" to={item.to}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div className="mt-4">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <footer className="mt-5 text-center text-secondary">
          Data served by the{' '}
          <a className="link-primary" href={API_ROOT} target="_blank" rel="noopener noreferrer">
            OctoFit REST API
          </a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
