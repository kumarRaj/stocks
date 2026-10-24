import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the seed button on the stock list', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(screen.getByRole('button', { name: 'Seed data' })).toBeInTheDocument();
});
