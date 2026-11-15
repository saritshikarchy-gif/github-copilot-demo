import React from 'react';
import useFetch from '../useFetch';
import DataPage from './DataPage';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
export const USERS_API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { header: 'Username', render: user => user.username },
  {
    header: 'Email',
    render: user => <a className="link-primary" href={`mailto:${user.email}`}>{user.email}</a>,
  },
];

function Users() {
  const { data: users, loading, error } = useFetch(USERS_API_URL);

  return (
    <DataPage
      title="Users"
      columns={columns}
      rows={users}
      loading={loading}
      error={error}
      getKey={user => user._id}
      matches={(user, needle) => `${user.username} ${user.email}`.toLowerCase().includes(needle)}
      detailsTitle={user => user.username}
      renderDetails={user => (
        <dl className="row mb-0">
          <dt className="col-sm-4">Username</dt>
          <dd className="col-sm-8">{user.username}</dd>
          <dt className="col-sm-4">Email</dt>
          <dd className="col-sm-8">{user.email}</dd>
          <dt className="col-sm-4">User ID</dt>
          <dd className="col-sm-8 text-break">{user._id}</dd>
        </dl>
      )}
    />
  );
}

export default Users;
