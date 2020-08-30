// watch me write this test in 16 minutes on YouTube:
//   https://www.youtube.com/watch?v=dxWrHEOD5DU&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react';
import { BombButton } from '../ErrorBoundary';

beforeEach(() => {
    // when the error's thrown a bunch of console.errors are called even though
    // the error boundary handles the error. This makes the test output noisy,
    // so we'll mock out console.error
    const mockConsoleError = jest.spyOn(console, 'error')
    mockConsoleError.mockImplementation(() => { });
})

afterEach(() => {
    (console.error as any).mockRestore();
})

describe('ErrorBoundary', () => {
    test('Test that renders "there was a problem"', () => {
        render(<BombButton />)

        fireEvent.click(screen.getByText('💣'))

        expect(screen.getByText(/there was a problem/i)).toBeInTheDocument();
    });
});
