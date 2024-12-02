const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const input = inputRaw.trim().split("\n");

let safeCount = 0;

for (const line of input) {
  const split = line.split(" ").map((e) => +e);

  let hasValid = false;

  outer: for (let i = 0; i < split.length; i++) {
    let arr = split.filter((_, idx) => idx !== i);

    let direction: "inc" | "desc" | null = null;

    for (let j = 1; j < arr.length; j++) {
      let num1 = arr[j - 1];
      let num2 = arr[j];

      if (Math.abs(num1 - num2) < 1 || Math.abs(num1 - num2) > 3) {
        continue outer;
      }

      if (j === 1) {
        direction = num1 > num2 ? "desc" : "inc";
      }

      if (
        (direction === "inc" && num1 > num2) ||
        (direction === "desc" && num1 < num2)
      ) {
        continue outer;
      }
    }

    hasValid = true;
    break;
  }

  if (hasValid) {
    safeCount++;
  }
}

console.log(safeCount);
