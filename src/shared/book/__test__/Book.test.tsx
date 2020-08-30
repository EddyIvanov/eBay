import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Book from '../Book';
import { booksResponseData } from '../../../services/book-search/sampleJSONResponse';

describe('Book', () => {
    test('Test Book content', () => {
        const bookProps = { ...booksResponseData.items[0] } as any;
        const { rerender } = render(<Book {...bookProps} />);
        const title = screen.getByText(/JavaScript & jQuery: The Missing Manual/i);
        const authors = screen.getByText(/David Sawyer McFarland/i);
        const publishData = screen.getByText(/Published 2014-09-18 by "O'Reilly Media, Inc."/i);
        const description = screen.getByText(/JavaScript lets you supercharge your HTML with animation, interactivity, and visual effects—but many web designers find the language hard to learn. This easy-to-read guide not only covers JavaScript basics, but also shows you how to save time and effort with the jQuery and jQuery UI libraries of prewritten JavaScript code. You’ll build web pages that feel and act like desktop programs—with little or no programming. The important stuff you need to know: Pull back the curtain on JavaScript. Learn how to build a basic program with this language. Get up to speed on jQuery. Quickly assemble JavaScript programs that work well on multiple web browsers. Transform your user interface. Learn jQuery UI, the JavaScript library for interface features like design themes and controls. Make your pages interactive. Create JavaScript events that react to visitor actions. Use animations and effects. Build drop-down navigation menus, pop-ups, automated slideshows, and more. Collect data with web forms. Create easy-to-use forms that ensure more accurate visitor responses. Practice with living examples. Get step-by-step tutorials for web projects you can build yourself./i);
        const addToWishlistButton = screen.getByText(/Add to Wishlist/i);

        expect(title).toBeInTheDocument();
        expect(authors).toBeInTheDocument();
        expect(publishData).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(addToWishlistButton).toBeInTheDocument();
        expect(screen.getByAltText("JavaScript & jQuery: The Missing Manual")).toBeTruthy();

        // when added to wishlist, check for "Already in Wishlist" button exist
        bookProps.isInWishlist = true;
        rerender(<Book {...bookProps} />);
        const alreadyInWishlistButton = screen.getByText(/Already in Wishlist/i);
        expect(alreadyInWishlistButton).toBeInTheDocument();
        expect(alreadyInWishlistButton).toBeDisabled();
    });

    test('Test Book missing image data', () => {
        const bookProps = { ...booksResponseData.items[0] } as any;
        bookProps.volumeInfo.imageLinks = null;

        render(<Book {...bookProps} />);
        expect(screen.queryByAltText("JavaScript & jQuery: The Missing Manual")).not.toBeInTheDocument();
    });

    test('Test Book missing publishing data', () => {
        const bookProps = { ...booksResponseData.items[0] } as any;
        bookProps.volumeInfo.publisher = undefined;
        bookProps.volumeInfo.publishedDate = undefined;

        render(<Book {...bookProps} />);
        expect(screen.queryByText(/Published 2014-09-18 by "O'Reilly Media, Inc."/i)).not.toBeInTheDocument();
    });

    test('Test Add to wishlist button call add to wishlist function', async () => {
        const bookProps = { ...booksResponseData.items[0] } as any;
        const onClick = jest.fn();

        render(<Book {...bookProps} onWishlistStatusChange={onClick} />);
        fireEvent.click(screen.getByText(/Add to Wishlist/i));
        expect(onClick).toHaveBeenCalled();
    });

    test('Test Already in wishlist button doesnt fire click event', async () => {
        const bookProps = { ...booksResponseData.items[0] } as any;
        const onClick = jest.fn();
        bookProps.isInWishlist = true;

        render(<Book {...bookProps} onWishlistStatusChange={onClick} />);
        fireEvent.click(screen.getByText(/Already in Wishlist/i));
        expect(onClick).not.toHaveBeenCalled();
    });
});