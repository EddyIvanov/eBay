import React from "react";
import { WishlistProps } from "./types";
import { IBook } from "../../services/book-search";
import './Wishlist.scss';

const Wishlist: React.FC<WishlistProps> = ({ items }: WishlistProps) => {
    return (
        <aside className="wishlist sidebar">
            <div className="wishlist-sumary">{`My reading wishlist (${items.length})`}</div>
            <div className="wishlist-content">
                {items.map((item: IBook) => {
                    const { volumeInfo } = item;

                    return (
                        <div key={item.id} className="wishlist-book">
                            <img src={volumeInfo.imageLinks.smallThumbnail} alt={volumeInfo.title} />
                            <span>{volumeInfo.title}</span>
                        </div>
                    )
                })}
            </div>
        </aside>
    );
};

export default Wishlist;
