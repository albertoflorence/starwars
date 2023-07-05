import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [filter, setFilter] = useState('');
  const handleInputChange = ({ target }) => {
    setFilter(target.value);
  };

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <input
        data-testid="name-filter"
        type="text"
        value={ filter }
        onChange={ handleInputChange }
      />
      <Table filter={ filter } />
    </div>
  );
}

export default App;
