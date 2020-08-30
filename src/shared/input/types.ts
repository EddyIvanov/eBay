import { ChangeEvent } from "react";

export interface InputProps {
    name: string,
    value: any,
    type: string,
    placeholder: string,
    autoFocus: boolean,
    className: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}