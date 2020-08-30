import React from 'react';
import { render, screen } from '@testing-library/react';
import Wishlist from '../Wishlist';
import { booksResponseData } from '../../../services/book-search/sampleJSONResponse';

describe('WIshlist', () => {
    test('Test wishlist content', () => {
        const items = booksResponseData.items as any;

        render(<Wishlist items={items} />);
        const wishlistTitle = screen.getByText(`My reading wishlist (${items.length})`);
        const title = screen.getByText(/JavaScript & jQuery: The Missing Manual/i);
        const image = screen.getByAltText("JavaScript & jQuery: The Missing Manual");

        expect(wishlistTitle).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });
});