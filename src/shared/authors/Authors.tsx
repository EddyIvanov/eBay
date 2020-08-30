import React from "react";
import { AuthorsProps } from './types';

const Authors: React.FC<AuthorsProps> = ({ authorList }: AuthorsProps) => {
    return (
        <div className="book-authors">
            by
            {authorList.map((author: string, index: number, array: string[]) => {
                return (
                    <span className="book-author" key={author}>
                        {`${author}${array.length - 1 !== index ? ", " : ""}`}
                    </span>
                )
            })}
        </div>
    );
};

export default Authors;
