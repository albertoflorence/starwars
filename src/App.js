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
      setFilter({ name: inputs.name, filterArray: [] });
    }
  }, [inputs, filter]);

  const { column, comparison, value, name } = inputs;
  const { filterArray } = filter;

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ].filter((item) => !filterArray.find((el) => el.column === item));

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
          {columnOptions.map((item) => (
            <option key={ item } value={ item }>{item}</option>
          ))}
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
