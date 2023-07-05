export const getStarWarsPlanets = async () => {
  const { results } = await fetch('https://swapi.dev/api/planets').then((r) => r.json());
  return results;
};
