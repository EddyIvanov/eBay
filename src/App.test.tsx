import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/Search for books to add to your reading list and press Enter/)).toBeInTheDocument();
  });
});
