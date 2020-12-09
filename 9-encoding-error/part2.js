const fs = require("fs");

const numbers = fs
    .readFileSync(__dirname + "/numbers.txt", "utf8")
    .split("\n")
    .map((num) => parseInt(num));

function findSum(numbers) {
    let min, max, movingRange, movingSum;
    let invalidNum = 144381670;

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < i + 1; j++) {
            movingRange = numbers.slice(j, i);

            if (movingRange.length) {
                movingSum = movingRange.reduce((a, b) => a + b);

                if (movingSum === invalidNum && movingRange.length > 1) {
                    min = Math.min(...movingRange);
                    max = Math.max(...movingRange);
                    return min + max;
                }
            }
        }
    }
}

console.log(findSum(numbers));
