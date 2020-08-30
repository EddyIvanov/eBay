import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe('Input', () => {
    test('Test input props are rendered', () => {
        const onChangeFn = jest.fn();
        const inputProps = {
            className: "full-width",
            autoFocus: true,
            name: "gsearch",
            type: "search",
            value: "Javascript",
            placeholder: "Search for books to add to your reading list and press Enter",
            onChange: onChangeFn
        }

        render(<Input {...inputProps} />);
        const input = screen.getByPlaceholderText(`${inputProps.placeholder}`);

        expect(input).toBeInTheDocument();
    });
});
