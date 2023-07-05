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
            gravity: 'gravity_tatooine',
            terrain: 'desert',
            surface_water: 'surface_water_tatooine',
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
            gravity: 'gravity_aldebaran',
            terrain: 'grasslands, mountains',
            surface_water: 'surface_water_Alderaan',
            population: '2000000000',
            films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
          },
          {
            name: 'Naboo',
            rotation_period: '26',
            orbital_period: '312',
            diameter: '12120',
            climate: 'temperate',
            gravity: 'gravity_Naboo',
            terrain: 'grassy hills, swamps, forests, mountains',
            surface_water: 'surface_water_Naboo',
            population: '4500000000',
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
