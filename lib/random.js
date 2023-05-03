// Credit for snippet to @wesbos
export default function randomItemFromArray(array, not) {
  const item = array[Math.floor(Math.random() * array.length)];
  if (item === not) {
    console.log(not);
    return randomItemFromArray(array, not);
  }

  return item;
}
