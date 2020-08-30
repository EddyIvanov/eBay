import React from 'react';
import { render } from '@testing-library/react';
import Authors from '../Authors';

describe('Authors', () => {
    test('Test authors are rendered', () => {
        const authors = ["Emily Clark", "Stephen King"];

        const { getByText } = render(<Authors authorList={authors} />);
        const firstAuthor = getByText(/Emily Clark,/i);
        const secondAuthor = getByText(/Stephen King/i);

        expect(firstAuthor).toBeInTheDocument();
        expect(secondAuthor).toBeInTheDocument();
    });
});