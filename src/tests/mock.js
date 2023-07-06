export const mockFetch = () => {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          {
            name: 'Tatooine',
            rotation_period: '23',
            orbital_period: '304',
            diameter: '10465',
            climate: 'arid',
            gravity: '18',
            terrain: 'desert',
            surface_water: '10',
            population: '200000',
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/4/',
              'https://swapi.dev/api/films/5/',
              'https://swapi.dev/api/films/6/',
            ],
          },
          {
            name: 'Alderaan',
            rotation_period: '24',
            orbital_period: '364',
            diameter: '12500',
            climate: 'temperate',
            gravity: '17',
            terrain: 'grasslands, mountains',
            surface_water: '12',
            population: '2000000000',
            films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
          },
          {
            name: 'Naboo',
            rotation_period: '26',
            orbital_period: '312',
            diameter: '12120',
            climate: 'temperate',
            gravity: '16',
            terrain: 'grassy hills, swamps, forests, mountains',
            surface_water: 'unknown',
            population: '4500000000',
            films: [
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/4/',
              'https://swapi.dev/api/films/5/',
              'https://swapi.dev/api/films/6/',
            ],
          },
          {
            name: 'Coruscant',
            rotation_period: '24',
            orbital_period: '368',
            diameter: '12240',
            climate: 'temperate',
            gravity: '1 standard',
            terrain: 'cityscape, mountains',
            surface_water: 'unknown',
            population: '1000000000000',
            residents: [
              'https://swapi.dev/api/people/34/',
              'https://swapi.dev/api/people/55/',
              'https://swapi.dev/api/people/74/',
            ],
            films: [
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/4/',
              'https://swapi.dev/api/films/5/',
              'https://swapi.dev/api/films/6/',
            ],
          },
        ],
      }),
  });
};
