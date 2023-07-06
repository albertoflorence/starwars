import React from 'react';

import { usePlanets } from '../hooks/usePlanets';

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

function Table() {
  const { planets } = usePlanets();
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
        {planets.map((planet) => (
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
