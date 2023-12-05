export const extractNumberFromString = (input: string): number | null => {
  const match = input.match(/(\d+)\/?$/);

  if (match) {
    return parseInt(match[1], 10);
  }

  return null;
};
