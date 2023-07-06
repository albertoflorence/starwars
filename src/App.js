import React, { useEffect, useState } from 'react';

import './App.css';
import Table from './components/Table';
import { usePlanets } from './hooks/usePlanets';

const getColumnOptions = (array) => [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'].filter(
  (item) => !array.find((el) => el.column === item),
);

function App() {
  const { filterByName, orderByColumn, addFilter, filters, removeFilter } = usePlanets();
  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: '0',
    orderColumn: 'population',
    orderBy: '',
  });

  useEffect(() => {
    filterByName(inputs.name);
  }, [inputs, filterByName]);

  useEffect(() => {
    const [firstOption] = getColumnOptions(filters);
    setInputs((s) => ({ ...s, column: firstOption }));
  }, [filters]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFilter = () => {
    const { column, comparison, value } = inputs;
    addFilter({ column, comparison, value });
  };

  const handleOrder = () => {
    const { orderColumn, orderBy } = inputs;
    orderByColumn(orderColumn, orderBy);
  };

  const { column, comparison, value, name, orderBy, orderColumn } = inputs;

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <section>
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
          {getColumnOptions(filters).map((item) => (
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
        <button data-testid="button-filter" onClick={ handleFilter }>
          Filtrar
        </button>
        <select
          data-testid="column-sort"
          value={ orderColumn }
          name="orderColumn"
          onChange={ handleInputChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="asc">ascendente</label>
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          id="asc"
          name="orderBy"
          value="ASC"
          checked={ orderBy === 'ASC' }
          onChange={ handleInputChange }
        />
        <label htmlFor="desc">descendente</label>
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          id="desc"
          name="orderBy"
          value="DESC"
          checked={ orderBy === 'DESC' }
          onChange={ handleInputChange }
        />
        <button data-testid="column-sort-button" onClick={ handleOrder }>Ordenar</button>
        <button
          data-testid="button-remove-filters"
          onClick={ () => removeFilter() }
        >
          remover filtros
        </button>
      </section>
      {filters.map((item) => (
        <div data-testid="filter" key={ item.column }>
          <span>{item.column}</span>
          <span>{item.comparison}</span>
          <span>{item.value}</span>
          <button aria-label="deletar filtro" onClick={ () => removeFilter(item.column) }>
            X
          </button>
        </div>
      ))}
      <Table />
    </div>
  );
}

export default App;
