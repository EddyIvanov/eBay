import React from 'react';
import { render, screen } from '@testing-library/react';
import Published from '../Published';

describe('Published', () => {
    test('Test publish info is rendered', () => {
        const publisherInfo = {
            publisher: `"O'Reilly Media, Inc."`,
            publishedDate: "2006-08-17"
        }

        render(<Published {...publisherInfo} />);
        const published = screen.getByText(/Published 2006-08-17 by "O'Reilly Media, Inc."/i);

        expect(published).toBeInTheDocument();
    });
    test('Test missing publisher', () => {
        const publisherInfo = {
            publishedDate: "2006-08-17"
        }

        render(<Published {...publisherInfo} />);
        const published = screen.getByText(/Published 2006-08-17/i);

        expect(published).toBeInTheDocument();
    });
    test('Test missing published date', () => {
        const publisherInfo = {
            publisher: `"O'Reilly Media, Inc."`,
        }

        render(<Published {...publisherInfo} />);
        const published = screen.getByText(/Published by "O'Reilly Media, Inc."/i);

        expect(published).toBeInTheDocument();
    });
});
