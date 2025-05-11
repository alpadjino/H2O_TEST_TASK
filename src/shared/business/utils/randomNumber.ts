export const randomNumber = ({ min = -100, max = 100 }: { min?: number, max?: number }) => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  return random
};
