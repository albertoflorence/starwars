import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

const getColumnOptions = (array) => [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water']
  .filter(
    (item) => !array.find((el) => el.column === item),
  );

function App() {
  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [filter, setFilter] = useState({ name: '', filterArray: [] });

  useEffect(() => {
    if (inputs.name !== filter.name) {
      setFilter({ name: inputs.name, filterArray: [] });
    }
  }, [inputs, filter]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, ...rest } = inputs;
    const newFilterArray = [...filter.filterArray, rest];
    setFilter({ name, filterArray: newFilterArray });
    setInputs({ ...inputs, column: getColumnOptions(newFilterArray)[0] });
  };

  const handleFilterDelete = (index) => {
    if (index === undefined) return setFilter({ ...filter, filterArray: [] });
    const { filterArray } = filter;
    const newFilterArray = filterArray.filter((_, i) => i !== index);
    setFilter({ ...filter, filterArray: newFilterArray });
  };

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
          name="column"
          value={ column }
          onChange={ handleInputChange }
        >
          {getColumnOptions(filterArray).map((item) => (
            <option key={ item } value={ item }>
              {item}
            </option>
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
      {filterArray.map((item, index) => (
        <div data-testid="filter" key={ item.column }>
          <span>{item.column}</span>
          <span>{item.comparison}</span>
          <span>{item.value}</span>
          <button aria-label="deletar filtro" onClick={ () => handleFilterDelete(index) }>
            X
          </button>
        </div>
      ))}
      <button data-testid="button-remove-filters" onClick={ () => handleFilterDelete() }>
        remover filtros
      </button>
      <Table filter={ filter } />
    </div>
  );
}

export default App;
