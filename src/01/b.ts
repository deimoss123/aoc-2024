const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim().split("\n");

const nums: Record<string, number> = {};

for (const row of input) {
  const [_, right] = row.split(/\s+/g);
  nums[right] = nums[right] ? nums[right] + 1 : 1;
}

let sum = 0;

for (const row of input) {
  const [left, _] = row.split(/\s+/g);

  if (nums[left]) {
    sum += +left * nums[left];
  }
}

console.log(sum);
