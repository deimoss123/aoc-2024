const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim();

// mul\(([0-9]+),([0-9]+)\)

let total = 0;

for (const [_, n1, n2] of input.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)) {
  total += +n1 * +n2;
}

console.log(total);
