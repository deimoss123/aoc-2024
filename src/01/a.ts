const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim().split("\n");

const leftArr = [];
const rightArr = [];

for (const row of input) {
  const [left, right] = row.split(/\s+/g);
  leftArr.push(left);
  rightArr.push(right);
}

leftArr.sort();
rightArr.sort();

let sum = 0;

for (let i = 0; i < leftArr.length; i++) {
  sum += Math.abs(+leftArr[i] - +rightArr[i]);
}

console.log(sum);
