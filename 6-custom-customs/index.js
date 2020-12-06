const fs = require("fs");

let answers = fs.readFileSync(__dirname + "/answers.txt", "utf8").split("\n\n");

let arr = [];
function countingYes(input) {
    for (var i = 0; i < input.length; i++) {
        let data = input[i].replace(/\n/gi, "");
        data = Array.from(new Set(data));
        arr.push(data.length);
    }

    return arr.reduce((a, b) => a + b, 0);
}

console.log(countingYes(answers));
