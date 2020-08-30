import React from "react";
import { SearchTipsProps } from './types';

const SearchTips: React.FC<SearchTipsProps> = ({ text, suggestion, onSearch }: SearchTipsProps) => {
    function onClick() {
        onSearch(suggestion)
    }

    return (
        <div className="empty">
            <p>
                {text}
                <button className="btn btn--asLink" onClick={onClick}>
                    {` "${suggestion}"`}
                </button>
            </p>
        </div>
    );
};

export default SearchTips;
