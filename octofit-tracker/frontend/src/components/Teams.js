import React from 'react';
import useFetch from '../useFetch';
import DataPage from './DataPage';
import { USERS_API_URL } from './Users';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const TEAMS_API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const { data: teams, loading, error } = useFetch(TEAMS_API_URL);
  const { data: users } = useFetch(USERS_API_URL);
  const usernames = Object.fromEntries(users.map(user => [user._id, user.username]));
  const memberNames = team => team.members.map(id => usernames[id] || id);

  const columns = [
    { header: 'Team', render: team => team.name },
    { header: 'Members', render: team => memberNames(team).join(', ') },
  ];

  return (
    <DataPage
      title="Teams"
      columns={columns}
      rows={teams}
      loading={loading}
      error={error}
      getKey={team => team._id}
      matches={(team, needle) => `${team.name} ${memberNames(team).join(' ')}`.toLowerCase().includes(needle)}
      detailsTitle={team => team.name}
      renderDetails={team => (
        <ul className="list-group">
          {memberNames(team).map(name => (
            <li className="list-group-item" key={name}>{name}</li>
          ))}
        </ul>
      )}
    />
  );
}

export default Teams;
