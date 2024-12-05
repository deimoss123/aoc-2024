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

const incorrectSequences: number[][] = [];

outer: for (const seq of sequences) {
  for (const order of orderArr) {
    const idx1 = seq.indexOf(order[0]);
    const idx2 = seq.indexOf(order[1]);

    if (idx1 === -1 || idx2 === -1) continue;
    if (idx2 < idx1) {
      incorrectSequences.push(seq);
      continue outer;
    }
  }
}

let total = 0;

for (const seq of incorrectSequences) {
  seq.sort((a, b) => {
    if (orderArr.find((o) => o[1] === a && o[0] === b)) return 1;
    if (orderArr.find((o) => o[0] === a && o[1] === b)) return -1;
    return 0;
  });

  total += seq[Math.floor(seq.length / 2)];
}

console.log(total);
