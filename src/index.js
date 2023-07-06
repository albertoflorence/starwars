import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PlanetsProvider } from './hooks/usePlanets';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PlanetsProvider>
    <App />
  </PlanetsProvider>,
);
