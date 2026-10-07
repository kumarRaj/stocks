import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home route', () => {
  window.history.pushState({}, '', '/home');
  render(<App />);
  expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
});
