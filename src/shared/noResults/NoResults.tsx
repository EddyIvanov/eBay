import React from "react";
import { NoResultsProps } from './types';

const NoResults: React.FC<NoResultsProps> = ({ text }: NoResultsProps) => {
    return (
        <div className="info">{text}</div>
    );
};

export default NoResults;
