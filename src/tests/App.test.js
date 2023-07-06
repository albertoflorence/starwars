import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { mockFetch } from './mock';

import App from '../App';
import userEvent from '@testing-library/user-event';

describe('<App />', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  it('Deve renderizar as colunas da tabela corretamente', async () => {
    render(<App />);
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
  })
  it('Deve mostrar os planetas corretamente', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.getByText('304')).toBeInTheDocument();
    expect(screen.getByText('10465')).toBeInTheDocument();
    expect(screen.getByText('arid')).toBeInTheDocument();
    expect(screen.getByText('gravity_tatooine')).toBeInTheDocument();
    expect(screen.getByText('surface_water_tatooine')).toBeInTheDocument();
    expect(screen.getByText('desert')).toBeInTheDocument();
    expect(screen.getByText('200000')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(4)
  });
  it('Deve filtrar os planetas por nome', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    const inputName = screen.getByTestId('name-filter');
    userEvent.type(inputName, 'oo');
    expect(screen.getByText('Naboo')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3)
  })
  it('Deve filtrar os planetas por diameter', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('diameter', 'igual a', '12500')
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })
  it('Deve filtrar os planetas por population', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('population', 'menor que', '200001')
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })
  it('Deve filtrar os planetas por population', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('orbital_period', 'maior que', '363')
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })
  it('Deve mostrar o nome dos filmes', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    expect(screen.getAllByText('The Empire Strikes Back')).toHaveLength(2);
  })
  it('Deve deletar um filtro', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('rotation_period', 'igual a', '24')
    filterByColumn('surface_water', 'menor que', '2')
    const { queryByRole, getByRole } = within(screen.getByTestId('column-filter'));
    expect(queryByRole('option', { name: 'rotation_period' })).not.toBeInTheDocument();
    expect(queryByRole('option', { name: 'surface_water' })).not.toBeInTheDocument();
    const deleteButton = screen.getAllByRole('button', { name: 'deletar filtro' })[0]
    expect(screen.queryAllByTestId('filter')).toHaveLength(2)
    userEvent.click(deleteButton)
    expect(getByRole('option', { name: 'rotation_period' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'rotation_period' })).toBeInTheDocument();
  })
  it('Deve deletar todos os filtros', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    filterByColumn('rotation_period', 'igual a', '24')
    filterByColumn('surface_water', 'menor que', '2')
    const deleteButton = screen.getByTestId("button-remove-filters")
    userEvent.click(deleteButton)
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
  })
  it('Deve ordenar os planetas por population', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    const sortColumn = screen.getByTestId('column-sort');
    const orderByDesc = screen.getByTestId('column-sort-input-desc');
    const sortButton = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(sortColumn, 'population');
    userEvent.click(orderByDesc);
    userEvent.click(sortButton);
    const [first, second, third] = screen.getAllByTestId('planet-name')
    expect(first).toHaveTextContent('Naboo')
    expect(second).toHaveTextContent('Alderaan')
    expect(third).toHaveTextContent('Tatooine')
  });
});

const filterByColumn = (columnInput, comparisonInput, valueInput) => {
  const column = screen.getByTestId('column-filter');
  const comparison = screen.getByTestId('comparison-filter')
  const value = screen.getByTestId('value-filter')
  const filterButton = screen.getByTestId('button-filter')
  userEvent.selectOptions(column, columnInput);
  userEvent.selectOptions(comparison, comparisonInput);
  userEvent.type(value, valueInput)
  userEvent.click(filterButton)
}
