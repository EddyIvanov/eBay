import React from "react";
import { InputProps } from './types';
import './Input.scss';

const Input: React.FC<InputProps> = (props: InputProps) => {
    return (
        <input {...props} />
    );
};

export default Input;
