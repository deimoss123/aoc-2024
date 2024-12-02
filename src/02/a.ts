const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim().split("\n");

let safeCount = 0;

outer: for (const line of input) {
  const split = line.split(" ");

  let direction: "inc" | "desc" | null = null;

  for (let i = 1; i < split.length; i++) {
    let num1 = +split[i - 1];
    let num2 = +split[i];

    if (Math.abs(num1 - num2) < 1 || Math.abs(num1 - num2) > 3) {
      continue outer;
    }

    if (i === 1) {
      direction = num1 > num2 ? "desc" : "inc";
    }

    if (
      (direction === "inc" && num1 > num2) ||
      (direction === "desc" && num1 < num2)
    ) {
      continue outer;
    }
  }

  safeCount++;
}

console.log(safeCount);
