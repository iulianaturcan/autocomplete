export const getCountriesByName = async (query: string) => {
    console.log(query);
  const response = await fetch(`http://localhost:3001/items?country_like=${query}`);
  return response.json();
}