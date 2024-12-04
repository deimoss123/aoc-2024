const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim().split("\n");

// letters
const l: string[][] = input.map((line) => line.split(""));

const WIDTH = l[0].length;
const HEIGHT = l.length;

// search in all directions, return count
function search(x: number, y: number) {
  const strings: string[] = [];

  // horizontal right
  if (WIDTH - x >= 4) {
    strings.push(l[y][x + 1] + l[y][x + 2] + l[y][x + 3]);
  }

  // horizontal left
  if (x >= 3) {
    strings.push(l[y][x - 1] + l[y][x - 2] + l[y][x - 3]);
  }

  // vertical bottom
  if (HEIGHT - y >= 4) {
    strings.push(l[y + 1][x] + l[y + 2][x] + l[y + 3][x]);
  }

  // vertical top
  if (y >= 3) {
    strings.push(l[y - 1][x] + l[y - 2][x] + l[y - 3][x]);
  }

  // diagonal bottom-right
  if (HEIGHT - y >= 4 && WIDTH - x >= 4) {
    strings.push(l[y + 1][x + 1] + l[y + 2][x + 2] + l[y + 3][x + 3]);
  }

  // diagonal bottom-left
  if (HEIGHT - y >= 4 && x >= 3) {
    strings.push(l[y + 1][x - 1] + l[y + 2][x - 2] + l[y + 3][x - 3]);
  }

  // diagonal top-left
  if (y >= 3 && x >= 3) {
    strings.push(l[y - 1][x - 1] + l[y - 2][x - 2] + l[y - 3][x - 3]);
  }

  // diagonal top-right
  if (y >= 3 && WIDTH - x >= 4) {
    strings.push(l[y - 1][x + 1] + l[y - 2][x + 2] + l[y - 3][x + 3]);
  }

  return strings.filter((s) => s === "MAS").length;
}

let count = 0;

for (let y = 0; y < l.length; y++) {
  for (let x = 0; x < l[y].length; x++) {
    if (l[y][x] === "X") {
      count += search(x, y);
    }
  }
}
console.log(count);

