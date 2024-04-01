import { TimezoneOption } from "../types";

export const getCountriesByName = async (query: string): Promise<TimezoneOption[]> => {
  const response = await fetch(
    `http://localhost:3001/items?country_like=${query}`
  );
  return response.json();
};
