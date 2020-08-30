import React from "react";
import { PublishedProps } from './types';

const Published: React.FC<PublishedProps> = ({ publisher, publishedDate }: PublishedProps) => {
    return (
        <div className="book-published">
            {`Published ${publishedDate ? publishedDate : ''}${publisher ? ` by ${publisher}` : ''}`}
        </div>
    );
};

export default Published;
