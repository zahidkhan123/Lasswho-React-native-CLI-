export const generateRandomCircle = () => {
  let rdmNumber = Math.floor(Math.random() * 100);
  const colors = ['bg-red-400', 'bg-green-300', 'bg-blue-400'];

  if (rdmNumber <= 33) {
    return colors[0];
  }
  if (rdmNumber >= 34 && rdmNumber <= 66) {
    return colors[1];
  }
  return colors[2];
};
