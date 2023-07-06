import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

const getColumnOptions = (array) => [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'].filter(
  (item) => !array.find((el) => el.column === item),
);

function App() {
  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: '0',
    orderColumn: 'population',
    orderBy: '',
  });
  const [filter, setFilter] = useState({ name: '', filterArray: [] });
  const [sort, setSort] = useState({ column: '', orderBy: '' });

  useEffect(() => {
    if (inputs.name !== filter.name) {
      setFilter({ name: inputs.name, filterArray: [] });
    }
  }, [inputs, filter]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFilter = () => {
    const { name, ...rest } = inputs;
    const newFilterArray = [...filter.filterArray, rest];
    setFilter({ name, filterArray: newFilterArray });
    setInputs({ ...inputs, column: getColumnOptions(newFilterArray)[0] });
  };

  const handleOrder = () => {
    const { orderColumn, orderBy } = inputs;
    setSort({ column: orderColumn, orderBy });
  };

  const handleFilterDelete = (index) => {
    if (index === undefined) return setFilter({ ...filter, filterArray: [] });
    const { filterArray } = filter;
    const newFilterArray = filterArray.filter((_, i) => i !== index);
    setFilter({ ...filter, filterArray: newFilterArray });
  };

  const { column, comparison, value, name, orderBy, orderColumn } = inputs;
  const { filterArray } = filter;

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
          onClick={ () => handleFilterDelete() }
        >
          remover filtros
        </button>
      </section>
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
      <Table filter={ filter } sort={ sort } />
    </div>
  );
}

export default App;
