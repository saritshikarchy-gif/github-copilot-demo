import React from 'react';
import useFetch from '../useFetch';
import DataPage from './DataPage';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const WORKOUTS_API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const columns = [
  { header: 'Workout', render: workout => workout.name },
  { header: 'Description', render: workout => workout.description },
];

function Workouts() {
  const { data: workouts, loading, error } = useFetch(WORKOUTS_API_URL);

  return (
    <DataPage
      title="Workouts"
      columns={columns}
      rows={workouts}
      loading={loading}
      error={error}
      getKey={workout => workout._id}
      matches={(workout, needle) => `${workout.name} ${workout.description}`.toLowerCase().includes(needle)}
      detailsTitle={workout => workout.name}
      renderDetails={workout => <p className="mb-0">{workout.description}</p>}
    />
  );
}

export default Workouts;
