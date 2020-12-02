const fs = require("fs");

const file = fs.readFileSync(__dirname + "/entries.txt", "utf8");

const arr = file.split("\n");

const refinedArr = arr.map((num) => parseInt(num));

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
