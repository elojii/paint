export const checkForValidSize = (value: number) => {
  if (value < 0) return 1;
  return isNaN(value) ? 0 : parseInt(value.toString());
};
