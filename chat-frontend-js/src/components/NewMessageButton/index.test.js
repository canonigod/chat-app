import  { NewMessageButton } from './index';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('New message button clicked', () => {
    test('Click', () => {
        global.window = { location: { pathname: null } };
        const {container} = render(
            <Router>
                <NewMessageButton />
            </Router>
        );
        fireEvent.click(container);
        expect(global.window.location.pathname).toEqual('/');
    })
})