import React from "react";
import { BookListProps } from "./types";
import Book from "../book";
import { IBook } from '../../services/book-search';

const BookList: React.FC<BookListProps> = ({ totalItems, items, onWishlistStatusChange }: BookListProps) => {
    return (
        <div className="book-list">
            {`Total Results: ${totalItems}`}

            {items.map((item: IBook) => {
                if (!item.volumeInfo) return null;

                return (
                    <Book key={item.id} {...item} onWishlistStatusChange={onWishlistStatusChange} />
                )
            })}
        </div>
    );
};

export default BookList;
