import React, { useState, useCallback } from "react";
import { fetchBooks, IBooksAPI, IBook } from "../../services/book-search";
import BookList from "../../shared/book-list";
import Wishlist from "../../shared/wishlist";
import { updateItemInArray } from "../../utils/updateItemInArray";
import { throttle } from 'lodash-es';
import ErrorMessage from "../../shared/errorMessage";
import Input from "../../shared/input";
import SearchTip from "../../shared/searchTips/SearchTips";
import Loading from "../../shared/loading";
import NoResults from "../../shared/noResults";

const THROTTLE_DELAY = 500;

const BookSearch = () => {
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoding] = useState(false);
    const [allAvailableBooks, setAllAvailableBooks] = useState<IBooksAPI>({ totalItems: 0, items: [] });
    const [whishlist, setWishlist] = useState<IBook[]>([]);

    const getAllBooksThrottled = useCallback(throttle(getAllBooks, THROTTLE_DELAY), []);

    async function getAllBooks(value: string) {
        try {
            setLoding(true);
            const allBooksResponse = await fetchBooks(value);
            setError("");
            setLoding(false);
            setAllAvailableBooks(allBooksResponse);
        } catch (e) {
            setError(e.error && e.error.message ? e.error.message : "Couldn't fetch books by your search term. Please try again.");
            setLoding(false);
        }
    }

    const handSearch = (e: any) => {
        const value = typeof e === "string" ? e : e.target.value;

        updateBookTypeToSearch(value);

        if (value === "") {
            setAllAvailableBooks({ totalItems: 0, items: [] });
        } else {
            getAllBooksThrottled(value);
        }
    };

    const handleWishlistStatusChange = (bookId: string, isInWishlist: boolean) => {
        const bookInWishlist = findById(whishlist, bookId);
        const book = findById(allAvailableBooks.items, bookId);
        const updatedBookList = updateItemInArray(allAvailableBooks.items, bookId, { isInWishlist: isInWishlist });

        setAllAvailableBooks({
            ...allAvailableBooks,
            items: updatedBookList
        });

        if (!bookInWishlist && book) {
            setWishlist(whishlist => [...whishlist, book]);
        }
    }

    function findById(array: any[], itemId: string) {
        return array.find(item => item.id === itemId);
    }

    return (
        <div className="book--container">
            <div className="search-params">
                {error !== "" &&
                    <ErrorMessage message={error} />
                }
                <Input
                    className="full-width"
                    autoFocus
                    name="gsearch"
                    type="search"
                    value={bookTypeToSearch}
                    placeholder="Search for books to add to your reading list and press Enter"
                    onChange={handSearch}
                />
                {bookTypeToSearch === "" && (
                    <SearchTip text="Try searching for a topic, for example" suggestion="Javascript" onSearch={handSearch} />
                )}
                {loading &&
                    <Loading />
                }
                {!loading && bookTypeToSearch !== "" && allAvailableBooks.totalItems === 0 &&
                    <NoResults text="No search results" />
                }
                {allAvailableBooks && allAvailableBooks.totalItems > 0 &&
                    <BookList
                        items={allAvailableBooks.items}
                        totalItems={allAvailableBooks.totalItems}
                        onWishlistStatusChange={handleWishlistStatusChange}
                    />
                }
            </div>
            <Wishlist items={whishlist} />
        </div>
    );
};

export default BookSearch;
