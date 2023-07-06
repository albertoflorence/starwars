import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { getStarWarsPlanets } from '../services';

export const handleComparison = (planet, value, comparison) => {
  if (comparison === 'maior que') return Number(planet) > Number(value);
  if (comparison === 'igual a') return Number(planet) === Number(value);
  if (comparison === 'menor que') return Number(planet) < Number(value);

  return false;
};

const applyFilters = (planets, filters) => filters
  .reduce((data, filter) => data.filter(filter), planets);

export const PlanetsContext = createContext();

export function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({ name: '', array: [] });
  const [order, setOrder] = useState({ column: '', sortBy: '' });

  useEffect(() => {
    getStarWarsPlanets().then((result) => {
      setPlanets(result);
    });
  }, []);

  const filterByName = useCallback((name) => {
    setFilters(({ array }) => ({ name, array }));
  }, []);

  const addFilter = (filter) => {
    setFilters({
      ...filters,
      array: [...filters.array, filter],
    });
  };

  const removeFilter = (column) => {
    setFilters({
      ...filters,
      array: column ? filters.array.filter((item) => item.column !== column) : [],
    });
  };

  const orderByColumn = (column, sortBy) => setOrder({ column, sortBy });

  const filteredPlanets = useMemo(() => {
    const { name, array } = filters;
    return applyFilters(planets, [
      (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
      ...array.map(
        ({ column, value, comparison }) => (planet) => handleComparison(
          planet[column],
          value,
          comparison,
        ),
      ),
    ]);
  }, [filters, planets]);

  if (order.column) {
    filteredPlanets
      .sort((a, b) => {
        console.log('b[order.column]: ', b[order.column]);
        const negative = -1;
        if (a[order.column] === 'unknown') return 1;
        if (b[order.column] === 'unknown') return negative;
        const aValue = Number(a[order.column]);
        const bValue = Number(b[order.column]);
        return (order.sortBy === 'ASC'
          ? aValue - bValue : bValue - aValue);
      });
  }

  return (
    <PlanetsContext.Provider
      value={ {
        planets: filteredPlanets,
        filters: filters.array,
        filterByName,
        addFilter,
        removeFilter,
        orderByColumn,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export function usePlanets() {
  return useContext(PlanetsContext);
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
