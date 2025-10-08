import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Text } from './Text';

describe('Text Component', () => {
    it('renders the text content', () => {
        render(<Text content="Hello World" />);
        expect(screen.getByText('Hello World')).toBeVisible();
    });

    it('applies grey color when disabled', () => {
        render(<Text content="Disabled Text" disabled />);
        const textElement = screen.getByText('Disabled Text');
        expect(textElement).toHaveStyle('color: #aaa');
    });

    it('handles click event', () => {
        const handleClick = jest.fn();
        render(<Text content="Clickable" onClick={handleClick} />);
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
