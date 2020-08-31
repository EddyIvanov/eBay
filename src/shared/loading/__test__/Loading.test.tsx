import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
    test('Test loading text is rendered', () => {
        render(<Loading />);
        const loading = screen.getByText(/Loading/i);

        expect(loading).toBeInTheDocument();
    });
});
