import React from "react";
import { BookProps } from "./types";
import Authors from "../authors";
import Published from "../published";
import './Book.scss';

const Book: React.FC<BookProps> = ({ id, volumeInfo, isInWishlist, onWishlistStatusChange }: BookProps) => {
    function handleAddToWishlist() {
        onWishlistStatusChange(id, true);
    }

    return (
        <article className="book">
            <div className="book-image-content">
                {volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail &&
                    <img className="book-image" src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
                }
                {isInWishlist &&
                    <button data-testid="button" className="btn" disabled>Already in Wishlist</button>
                }
                {!isInWishlist &&
                    <button data-testid="button" className="btn btn--primary" onClick={handleAddToWishlist}>Add to Wishlist</button>
                }
            </div>
            <div className="book-details">
                <h1 className="book-title">{volumeInfo.title}</h1>
                {volumeInfo.authors && volumeInfo.authors.length > 0 &&
                    <Authors authorList={volumeInfo.authors} />
                }
                {(volumeInfo.publisher || volumeInfo.publishedDate) &&
                    <Published publisher={volumeInfo.publisher} publishedDate={volumeInfo.publishedDate} />
                }
                <p className="book-description">{volumeInfo.description}</p>
            </div>
        </article>
    );
};

export default Book;
