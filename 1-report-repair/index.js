// Find the two entries in entries.txt that sum to 2020 and then multiply those two numbers together. What is that number?

const fs = require("fs");

const refinedArr = fs
    .readFileSync(__dirname + "/entries.txt", "utf8")
    .split("\n")
    .map((num) => parseInt(num));

function findSum(num) {
    for (var i = 0; i < refinedArr.length; i++) {
        for (var j = 0; j < refinedArr.length; j++) {
            if (refinedArr[i] + refinedArr[j] === num) {
                return refinedArr[i] * refinedArr[j];
            }
        }
    }
}

console.log(findSum(2020));
