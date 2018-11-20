import React from 'react';
import ReactDOM from 'react-dom';
import HooksCalendar from './HooksCalendar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HooksCalendar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
