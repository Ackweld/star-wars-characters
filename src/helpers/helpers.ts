// Used for getting the final digits of the character url so that it can be used
// as an id... Since SWAPI characters don't have an id for some reason..
export const extractNumberFromString = (input: string): number | null => {
  const match = input.match(/(\d+)\/?$/);

  if (match) {
    return parseInt(match[1], 10);
  }

  return null;
};
