// Find the two entries that sum to 2020 and then multiply those two numbers together.
// Provide what that number is.

const fs = require("fs");

const file = fs.readFileSync(__dirname + "/entries.txt", "utf8");

const arr = file.split("\n");

const refinedArr = arr.map((num) => parseInt(num));

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
