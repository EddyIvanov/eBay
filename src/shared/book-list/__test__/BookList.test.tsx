import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from '../BookList';
import { booksResponseData } from '../../../services/book-search/sampleJSONResponse';

describe('Book List', () => {
    test('Test Books List content', () => {
        const bookListProps = {
            ...booksResponseData as any,
            onWishlistStatusChange: jest.fn()
        }

        render(<BookList {...bookListProps} />);

        const total = screen.getByText(/Total Results: 1691/i);
        const firstBook = screen.getByText(/JavaScript & jQuery: The Missing Manual/i);
        const lastBook = screen.getByText(/ JavaScript: The Missing Manual/i);
        const articles = screen.getAllByRole("article");

        expect(total).toBeInTheDocument();
        expect(firstBook).toBeInTheDocument();
        expect(lastBook).toBeInTheDocument();
        expect(articles).toHaveLength(bookListProps.items.length);
    });

    test('Test Books List for Book with missing volumeInfo', () => {
        const bookListProps = {
            ...booksResponseData as any,
            onWishlistStatusChange: jest.fn()
        }
        bookListProps.items[1].volumeInfo = null;

        render(<BookList {...bookListProps} />);

        let articles = screen.getAllByRole("article");

        expect(articles).toHaveLength(bookListProps.items.length - 1);
    });
});