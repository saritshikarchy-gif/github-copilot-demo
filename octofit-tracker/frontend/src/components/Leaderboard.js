import React from 'react';
import useFetch from '../useFetch';
import DataPage from './DataPage';
import { USERS_API_URL } from './Users';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const LEADERBOARD_API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const { data: entries, loading, error } = useFetch(LEADERBOARD_API_URL);
  const { data: users } = useFetch(USERS_API_URL);
  const usernames = Object.fromEntries(users.map(user => [user._id, user.username]));

  const ranked = [...entries]
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1, username: usernames[entry.user] || entry.user }));

  const columns = [
    { header: 'Rank', render: entry => <span className="badge text-bg-primary">{entry.rank}</span> },
    { header: 'Username', render: entry => entry.username },
    { header: 'Score', render: entry => entry.score },
  ];

  return (
    <DataPage
      title="Leaderboard"
      columns={columns}
      rows={ranked}
      loading={loading}
      error={error}
      getKey={entry => entry._id}
      matches={(entry, needle) => entry.username.toLowerCase().includes(needle)}
    />
  );
}

export default Leaderboard;
