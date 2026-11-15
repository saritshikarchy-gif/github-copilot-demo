import React from 'react';
import useFetch from '../useFetch';
import DataPage from './DataPage';
import { USERS_API_URL } from './Users';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const ACTIVITIES_API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const { data: activities, loading, error } = useFetch(ACTIVITIES_API_URL);
  const { data: users } = useFetch(USERS_API_URL);
  const usernames = Object.fromEntries(users.map(user => [user._id, user.username]));
  const usernameOf = activity => usernames[activity.user] || activity.user;

  const columns = [
    { header: 'User', render: usernameOf },
    { header: 'Activity', render: activity => <span className="badge text-bg-primary">{activity.activity_type}</span> },
    { header: 'Duration', render: activity => activity.duration },
  ];

  return (
    <DataPage
      title="Activities"
      columns={columns}
      rows={activities}
      loading={loading}
      error={error}
      getKey={activity => activity._id}
      matches={(activity, needle) =>
        `${usernameOf(activity)} ${activity.activity_type}`.toLowerCase().includes(needle)
      }
    />
  );
}

export default Activities;
