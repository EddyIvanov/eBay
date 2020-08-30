import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchTips from '../SearchTips';

describe('Search Tips', () => {
    const onSearch = jest.fn();

    const SearchTipsProps = {
        text: "Try searching for a topic, for example",
        suggestion: "Javascript",
        onSearch: onSearch
    }

    test('Test Search Tips render data', () => {
        render(<SearchTips {...SearchTipsProps} />);
        const infoText = screen.getByText(`${SearchTipsProps.text}`);

        expect(infoText).toBeInTheDocument();
    });

    test('Test Add to wishlist button call add to wishlist function', async () => {
        const onSearch = jest.fn();

        render(<SearchTips {...SearchTipsProps} onSearch={onSearch} />);
        fireEvent.click(screen.getByRole('button', { name: `"${SearchTipsProps.suggestion}"` }));
        expect(onSearch).toHaveBeenCalled();
    });
});