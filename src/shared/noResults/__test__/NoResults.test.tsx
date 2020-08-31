import React from 'react';
import { render, screen } from '@testing-library/react';
import NoResults from '../NoResults';

describe('NoResults', () => {
    test('Test no results rendered corectly', () => {
        const text = "No search results"
        render(<NoResults text={text} />);
        expect(screen.getByText(text)).toBeInTheDocument();
    });
});
