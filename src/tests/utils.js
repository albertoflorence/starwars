import { render } from '@testing-library/react';
import { PlanetsProvider } from '../hooks/usePlanets';

export const customRender = (component) => {
  return render(<PlanetsProvider>{component}</PlanetsProvider>);
};
