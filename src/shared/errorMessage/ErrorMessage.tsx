import React from "react";
import { ErrorMessageProps } from './types';
import './ErrorMessage.scss';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }: ErrorMessageProps) => {
    return (
        <div className="error-message">
            {message}
        </div>
    );
};

export default ErrorMessage;
