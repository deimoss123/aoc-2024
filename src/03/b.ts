const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim();

const pattern = /(do\(\))|(don't\(\))|mul\(([0-9]+),([0-9]+)\)/g;
const matches = input.matchAll(pattern);

let total = 0;
let allow = true;

for (const [str, _, _2, n1, n2] of matches) {
  if (str === "do()") {
    allow = true;
  } else if (str === "don't()") {
    allow = false;
  } else if (str.startsWith("mul") && allow) {
    total += +n1 * +n2;
  }
}

console.log(total);
