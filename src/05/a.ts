const USE_TEST_INPUT = false;

const inputRaw = await Bun.file(
  USE_TEST_INPUT ? "test.txt" : "input.txt",
).text();

const [orderRaw, sequencesRaw] = inputRaw
  .trim()
  .split("\n\n")
  .map((a) => a.split("\n"));

const orderArr = orderRaw.map((o) => o.split("|").map((n) => +n));
const sequences = sequencesRaw.map((o) => o.split(",").map((n) => +n));

let total = 0;

outer: for (const seq of sequences) {
  for (const order of orderArr) {
    const idx1 = seq.indexOf(order[0]);
    const idx2 = seq.indexOf(order[1]);

    if (idx1 === -1 || idx2 === -1) continue;
    if (idx2 < idx1) continue outer;
  }

  total += seq[Math.floor(seq.length / 2)];
}

console.log(total);
