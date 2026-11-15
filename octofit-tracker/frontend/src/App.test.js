import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navigation menu with a link for each component', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: 'OctoFit Tracker' })).toBeInTheDocument();
  ['Activities', 'Leaderboard', 'Teams', 'Users', 'Workouts'].forEach(label => {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
  });
  expect(screen.getByRole('heading', { name: /welcome to octofit tracker/i })).toBeInTheDocument();
});
