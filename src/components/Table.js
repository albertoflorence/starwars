import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getStarWarsPlanets } from '../services';

const getFilms = (url) => {
  const films = [
    'A New Hope',
    'The Empire Strikes Back',
    'Return of the Jedi',
    'The Phantom Menace',
    'Attack of the Clones',
    'Revenge of the Sith',
  ];
  const index = url.match(/\d/)[0];
  return films[index];
};

const handleComparison = (planet, value, comparison) => {
  if (!planet) return true;
  if (comparison === 'maior que') return Number(planet) > Number(value);
  if (comparison === 'igual a') return Number(planet) === Number(value);
  if (comparison === 'menor que') return Number(planet) < Number(value);
};

const applyFilters = (planets, filters) => filters.reduce((data, filter) => data
  .filter(filter), planets);

function Table({ filter, sort }) {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    getStarWarsPlanets().then(setPlanets);
  }, []);

  const { name, filterArray } = filter;

  const filteredPlanets = applyFilters(planets, [
    (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
    ...filterArray.map(
      ({ column, value, comparison }) => (planet) => handleComparison(
        planet[column],
        value,
        comparison,
      ),
    ),
  ]);

  if (sort.column) {
    filteredPlanets
      .sort((a, b) => {
        const negative = -1;
        if (a[sort.column] === 'unknown') return 1;
        if (b[sort.column] === 'unknown') return negative;
        const aValue = Number(a[sort.column]);
        const bValue = Number(b[sort.column]);
        return (sort.orderBy === 'ASC'
          ? aValue - bValue : bValue - aValue);
      });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th> </th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>
              {planet.films.map((url) => (
                <div key={ url }>{getFilms(url)}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

Table.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string,
    filterArray: PropTypes.arrayOf(PropTypes.shape({
      column: PropTypes.string,
      comparison: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
  sort: PropTypes.shape({
    column: PropTypes.string,
    orderBy: PropTypes.string,
  }).isRequired,
};
