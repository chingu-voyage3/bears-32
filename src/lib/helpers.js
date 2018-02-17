/**
 * Returns a random number from 0 (inclusive) to `n` (exclusive)
 * @param {number} n
 */
function getRandom(n) {
  return Math.floor(Math.random() * n);
}

/**
 * Returns a random element from `arr`
 * @param {*[]} arr
 */
export function getRandomElement(arr) {
  return arr[getRandom(arr.length)];
}
