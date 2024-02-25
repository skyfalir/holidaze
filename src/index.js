import React from 'react';
import ReactDOM  from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(


      <AuthProvider>
    <App />
    </AuthProvider>);

