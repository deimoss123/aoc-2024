const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim().split("\n");

// letters
const l: string[][] = input.map((line) => line.split(""));

let count = 0;

for (let y = 1; y < l.length - 1; y++) {
  for (let x = 1; x < l[y].length - 1; x++) {
    if (
      l[y][x] === "A" &&
      ["MS", "SM"].includes(l[y - 1][x - 1] + l[y + 1][x + 1]) &&
      ["MS", "SM"].includes(l[y - 1][x + 1] + l[y + 1][x - 1])
    ) {
      count++;
    }
  }
}

console.log(count);
