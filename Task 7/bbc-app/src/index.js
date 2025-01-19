import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css'; // For base or global styles

// Rendering the App component into the root div
const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root instance to render the app into the root div element
root.render( // Render the App component into the root div element
  // StrictMode is a tool for highlighting potential problems in an application
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
