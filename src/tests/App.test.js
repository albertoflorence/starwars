import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { mockFetch } from './mock';
import { customRender } from './utils';
import { handleComparison } from '../hooks/usePlanets';

describe('<App />', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  it('Deve customRenderizar as colunas da tabela corretamente', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Rotation Period')).toBeInTheDocument();
    expect(screen.getByText('Orbital Period')).toBeInTheDocument();
    expect(screen.getByText('Diameter')).toBeInTheDocument();
    expect(screen.getByText('Climate')).toBeInTheDocument();
    expect(screen.getByText('Gravity')).toBeInTheDocument();
    expect(screen.getByText('Terrain')).toBeInTheDocument();
    expect(screen.getByText('Surface Water')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
  });
  it('Deve mostrar os planetas corretamente', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.getByText('304')).toBeInTheDocument();
    expect(screen.getByText('10465')).toBeInTheDocument();
    expect(screen.getByText('arid')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('desert')).toBeInTheDocument();
    expect(screen.getByText('200000')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(5);
  });
  it('Deve filtrar os planetas por nome', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 'oo');
    expect(screen.getByText('Naboo')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });
  it('Deve filtrar os planetas por orbital_period', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('orbital_period', 'maior que', '363');
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });
   it('Deve filtrar os planetas por orbital_period', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('orbital_period', 'menor que', '363');
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Naboo')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });
  it('Deve mostrar o nome dos filmes', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    expect(screen.getAllByText('The Empire Strikes Back')).toHaveLength(2);
  });
  it('Deve deletar um filtro', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('rotation_period', 'igual a', '24');
    filterByColumn('surface_water', 'menor que', '2');
    const { queryByRole, getByRole } = within(screen.getByTestId('column-filter'));
    expect(queryByRole('option', { name: 'rotation_period' })).not.toBeInTheDocument();
    expect(queryByRole('option', { name: 'surface_water' })).not.toBeInTheDocument();
    const deleteButton = screen.getAllByRole('button', { name: 'deletar filtro' })[0];
    expect(screen.queryAllByTestId('filter')).toHaveLength(2);
    userEvent.click(deleteButton);
    expect(getByRole('option', { name: 'rotation_period' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'rotation_period' })).toBeInTheDocument();
  });
  it('Deve deletar todos os filtros', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('rotation_period', 'igual a', '24');
    filterByColumn('surface_water', 'menor que', '2');
    const deleteButton = screen.getByTestId('button-remove-filters');
    userEvent.click(deleteButton);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
  });
  it('Deve ordenar os planetas por coluna', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    orderByColumn('population', 'desc');
    const [first, second, third, fourth] = screen.getAllByTestId('planet-name');
    expect(first).toHaveTextContent('Coruscant');
    expect(second).toHaveTextContent('Naboo');
    expect(third).toHaveTextContent('Alderaan');
    expect(fourth).toHaveTextContent('Tatooine');
  });
  it('Deve deixar valores unknown sempre ordenados por último', async () => {
    customRender(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    orderByColumn('surface_water', 'asc');
    let [first, second, third, fourth] = screen.getAllByTestId('planet-name');
    expect(first).toHaveTextContent('Tatooine');
    expect(second).toHaveTextContent('Alderaan');
    expect(third).toHaveTextContent('Naboo');
    expect(fourth).toHaveTextContent('Coruscant');
    orderByColumn('surface_water', 'desc');
    [first, second, third, fourth] = screen.getAllByTestId('planet-name');
    expect(first).toHaveTextContent('Alderaan');
    expect(second).toHaveTextContent('Tatooine');
    expect(third).toHaveTextContent('Naboo');
    expect(fourth).toHaveTextContent('Coruscant');
  });
  it('handleComparison deve retornar false se for fornecido uma comparação inválida', () => {
    expect(handleComparison('1', '1', 'invalida')).toBe(false);
  })
});

const orderByColumn = (columnInput, sortBy) => {
  const sortColumn = screen.getByTestId('column-sort');
  const orderBy = screen.getByTestId(`column-sort-input-${sortBy}`);
  const sortButton = screen.getByTestId('column-sort-button');
  userEvent.selectOptions(sortColumn, columnInput);
  userEvent.click(orderBy);
  userEvent.click(sortButton);
};

const filterByColumn = (columnInput, comparisonInput, valueInput) => {
  const column = screen.getByTestId('column-filter');
  const comparison = screen.getByTestId('comparison-filter');
  const value = screen.getByTestId('value-filter');
  const filterButton = screen.getByTestId('button-filter');
  userEvent.selectOptions(column, columnInput);
  userEvent.selectOptions(comparison, comparisonInput);
  userEvent.type(value, valueInput);
  userEvent.click(filterButton);
};
