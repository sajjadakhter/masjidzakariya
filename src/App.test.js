import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard1920 from './components/App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard1920/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
