import React from 'react';
import { render, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import sinon from 'sinon';
import assert from 'assert';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import BookSearch from '../BookSearch';
import { booksResponseData } from '../../../services/book-search/sampleJSONResponse';

chai.use(chaiAsPromised);
declare global {
    namespace NodeJS {
        interface Global {
            fetch: any;
        }
    }
}

describe('BookSearch', () => {
    test('Test fetching book on input change', async () => {
        const mockFetch = sinon.fake.resolves({
            ok: true,
            json: () => booksResponseData
        });
        global.fetch = mockFetch;

        render(<BookSearch />);
        const searchInput = screen.getByPlaceholderText(/Search for books to add to your reading list and press Enter/i);

        expect(searchInput).toBeInTheDocument();

        // user paste update the input with "Javascript" but throws warning.
        // from other hand user.type update the input with "t" but doesn't throws warning
        await act(() => user.type(searchInput, 'Javascript'));
        //await act(() => user.paste(searchInput, 'Javascript'));

        assert(mockFetch.calledOnce, 'Fn was called once');

        // it should be a better way
        await expect(searchInput.value).toEqual("t");
        //await expect(searchInput.value).toEqual("Javascript");

        const searchTip = screen.queryByText(/Try searching for a topic, for example/i);
        await expect(searchTip).not.toBeInTheDocument();

        const firstArticleAddToWishlistButton = screen.queryAllByText('Add to Wishlist')[0];
        user.click(firstArticleAddToWishlistButton);
        user.clear(searchInput);

        // no articles
        expect(screen.queryByText('Add to Wishlist')).not.toBeInTheDocument();

        // article in wishlist exist
        expect(screen.queryByText(booksResponseData.items[0].volumeInfo.title)).toBeInTheDocument();
        delete global.fetch;
    });
    test('Test fetching books on suggestion button', async () => {
        const mockFetch = sinon.fake.resolves({
            ok: true,
            json: () => booksResponseData
        });
        global.fetch = mockFetch;

        render(<BookSearch />);
        const searchHelpButton = screen.getByRole('button', { name: /Javascript/i });
        expect(searchHelpButton).toBeInTheDocument();

        //both throws same warnings when they are inside or outside of act
        //await act(() => { fireEvent.click(searchHelpButton) });
        await act(() => { user.click(searchHelpButton) });

        delete global.fetch;
    });
    test('Test server error during fetching', async () => {
        const errorResponse = {
            error: {
                code: 400,
                message: "Missing query."
            }
        };
        const mockFetch = sinon.fake.resolves({
            ok: false,
            json: () => errorResponse
        });
        global.fetch = mockFetch;

        render(<BookSearch />);
        const searchInput = screen.getByPlaceholderText(/Search for books to add to your reading list and press Enter/i);
        await act(() => user.type(searchInput, 'Javascript'));
        await expect(screen.queryByText(/Missing query/i)).toBeInTheDocument();

        delete global.fetch;
    });

    test('Test unexpected error during fetching', async () => {
        const errorResponse = {
            code: 500,
        };
        const mockFetch = sinon.fake.resolves({
            ok: false,
            json: () => errorResponse
        });
        global.fetch = mockFetch;

        render(<BookSearch />);
        const searchInput = screen.getByPlaceholderText(/Search for books to add to your reading list and press Enter/i);
        expect(searchInput).toBeInTheDocument();
        await act(() => user.type(searchInput, 'Javascript'));
        await expect(screen.queryByText(/Couldn't fetch books by your search term. Please try again./i)).toBeInTheDocument();

        delete global.fetch;
    });
    test('Test that same book can be added only once to wishlist', async () => {
        const mockFetch = sinon.fake.resolves({
            ok: true,
            json: () => booksResponseData
        });
        global.fetch = mockFetch;

        render(<BookSearch />);

        const searchInput = screen.getByPlaceholderText(/Search for books to add to your reading list and press Enter/i);

        // load 10 books and add first book to wishlist
        await act(() => user.type(searchInput, 'Javascript'));
        let firstArticleAddToWishlistButton = screen.queryAllByText('Add to Wishlist')[0];
        user.click(firstArticleAddToWishlistButton);

        // clean booklist
        await act(() => user.clear(searchInput));

        // load same 10 books and add first book to wishlist
        const searchHelpButton = screen.getByRole('button', { name: /Javascript/i });
        await act(() => { user.click(searchHelpButton) });

        // only one book shuld be in wishlist
        await expect(screen.queryAllByText(booksResponseData.items[0].volumeInfo.title)).toHaveLength(1);

        delete global.fetch;
    });
});