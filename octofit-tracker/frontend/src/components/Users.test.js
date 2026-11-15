import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Users from './Users';

const users = [
  { _id: '1', username: 'thundergod', email: 'thundergod@mhigh.edu' },
  { _id: '2', username: 'metalgeek', email: 'metalgeek@mhigh.edu' },
];

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(users) });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('shows users in a Bootstrap table with a filter form and details buttons', async () => {
  render(<Users />);

  const table = await screen.findByRole('table');
  expect(table).toHaveClass('table');
  expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
  expect(screen.getByText('thundergod')).toBeInTheDocument();
  expect(screen.getByText('metalgeek')).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'View' })).toHaveLength(2);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'metal' } });

  await waitFor(() => expect(screen.queryByText('thundergod')).not.toBeInTheDocument());
  expect(screen.getByText('metalgeek')).toBeInTheDocument();
});

test('shows an alert when the API request fails', async () => {
  global.fetch.mockResolvedValue({ ok: false, status: 500 });

  render(<Users />);

  expect(await screen.findByRole('alert')).toHaveTextContent('Request failed with status 500');
});
