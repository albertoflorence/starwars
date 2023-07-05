import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mockFetch } from './mock';

import App from '../App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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
    testByColumn('diameter', 'igual a', '12500')
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })
  it('Deve filtrar os planetas por population', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    testByColumn('population', 'menor que', '200001')
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })
  it('Deve filtrar os planetas por population', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    testByColumn('orbital_period', 'maior que', '363')
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2)
  })
  it('Deve mostrar o nome dos filmes', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('Tatooine'));
    expect(screen.getAllByText('The Empire Strikes Back')).toHaveLength(2);
  })
});

const testByColumn = (columnInput, comparisonInput, valueInput) => {
  const column = screen.getByTestId('column-filter');
  const comparison = screen.getByTestId('comparison-filter')
  const value = screen.getByTestId('value-filter')
  const filterButton = screen.getByTestId('button-filter')
  userEvent.selectOptions(column, columnInput);
  userEvent.selectOptions(comparison, comparisonInput);
  userEvent.type(value, valueInput)
  userEvent.click(filterButton)

}
