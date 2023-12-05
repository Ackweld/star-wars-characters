import { Characters, Character, Homeworld } from "../types";

const BASE_URL = "https://swapi.dev/api";

export const ApiService = {
  getCharacters: async (pageNr: number): Promise<Characters> => {
    const url = `${BASE_URL}/people/?page=${pageNr}`;
    return fetchDataWithCache(url);
  },

  getCharacter: async (id: number): Promise<Character> => {
    const url = `${BASE_URL}/people/${id}`;
    return fetchDataWithCache(url);
  },

  getHomeworld: async (url: string): Promise<Homeworld> => {
    return fetchDataWithCache(url);
  },
};

const fetchDataWithCache = async (url: string) => {
  try {
    const cachedData = localStorage.getItem(url);

    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error fetching data from ${url}: ${response.statusText}`
        );
      }
      const data = await response.json();
      localStorage.setItem(url, JSON.stringify(data));

      return data;
    }
  } catch (error) {
    console.error(`Error in fetchDataWithCache: ${(error as Error).message}`);
    throw error;
  }
};
