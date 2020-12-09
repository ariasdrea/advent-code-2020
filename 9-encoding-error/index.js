const fs = require("fs");

const numbers = fs
    .readFileSync(__dirname + "/numbers.txt", "utf8")
    .split("\n")
    .map((num) => parseInt(num));

function findNum(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        let range = numbers.slice(i - 25, i);

        if (range.length) {
            let result = testingNumbers(range, num);

            if (!result) return num;
        }
    }
}

findNum(numbers);

function testingNumbers(range, num) {
    let numbers = [];
    for (var i = 0; i < range.length; i++) {
        for (var j = 0; j < range.length; j++) {
            if (range[i] + range[j] === num) {
                numbers.push(range[i], range[j]);
            }
        }
    }

    return !numbers.length ? false : true;
}
