export type Character = {
  name: string;
  height: number;
  gender: string;
  birth_year: string;
  homeworld: string;
  url: string;
};

export type Characters = {
  count: number;
  results: Character[];
};

export type Homeworld = {
  name: string;
};
