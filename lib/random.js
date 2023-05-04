// Credit for snippet to @wesbos
export default function randomItemFromArray(array, not) {
  const item = array[Math.floor(Math.random() * array.length)];
  if (item === not) {
    console.log("gotta use another one");
    return randomItemFromArray(array, not);
  }

  return item;
}
