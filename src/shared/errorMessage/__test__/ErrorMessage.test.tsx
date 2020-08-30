import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
    test('Test error message is rendered', () => {
        const message = "Something went wrong. please refresh the page."

        render(<ErrorMessage message={message} />);
        const published = screen.getByText(/Something went wrong. please refresh the page./i);

        expect(published).toBeInTheDocument();
    });
});
