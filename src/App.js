import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [filter, setFilter] = useState({ name: '', filterArray: [] });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, ...rest } = inputs;
    setFilter({ name, filterArray: [...filter.filterArray, rest] });
  };

  useEffect(() => {
    if (inputs.name !== filter.name) {
      setFilter({ name: inputs.name });
    }
  }, [inputs, filter]);

  const { column, comparison, value, name } = inputs;
  const { filterArray } = filter;

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="name-filter"
          type="text"
          value={ name }
          name="name"
          onChange={ handleInputChange }
        />
        <select
          data-testid="column-filter"
          value={ column }
          name="column"
          onChange={ handleInputChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparison }
          name="comparison"
          onChange={ handleInputChange }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ value }
          name="value"
          onChange={ handleInputChange }
        />
        <button data-testid="button-filter" type="submit">
          Filtrar
        </button>
      </form>
      {filterArray.map((item) => (
        <div key={ item.column }>
          <span>{item.column}</span>
          <span>{item.comparison}</span>
          <span>{item.value}</span>
        </div>
      ))}
      <Table filter={ filter } />
    </div>
  );
}

export default App;
