// In your expense report, what is the product of the three entries that sum to 2020?

const fs = require("fs");

const refinedArr = fs
    .readFileSync(__dirname + "/entries.txt", "utf8")
    .split("\n")
    .map((num) => parseInt(num));

function findSum(num) {
    for (var i = 0; i < refinedArr.length; i++) {
        for (var j = 0; j < refinedArr.length; j++) {
            for (var k = 0; k < refinedArr.length; k++) {
                if (refinedArr[i] + refinedArr[j] + refinedArr[k] === num) {
                    return refinedArr[i] * refinedArr[j] * refinedArr[k];
                }
            }
        }
    }
}

console.log(findSum(2020));