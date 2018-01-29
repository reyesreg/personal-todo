import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import './styles/main.css';

ReactDOM.render(<Todo url="http://localhost:3001/api/tasks"/>, document.getElementById('root'));
