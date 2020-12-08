const fs = require("fs");

let instructions = fs
    .readFileSync(__dirname + "/instructions.txt", "utf8")
    .split("\n");

function cleanData(data) {
    let acc = 0;
    let i = 0;
    let executedMoves = [];
    let move, entireNum;

    while (true) {
        move = data[i].slice(0, 3);
        entireNum = parseInt(data[i].substring(4));
        executedMoves.push(i);

        if (move == "acc") {
            acc += entireNum;
            i++;
        }

        if (move == "jmp") {
            i += entireNum;
        }

        if (move == "nop") {
            i++;
        }

        if (executedMoves.indexOf(i) !== -1) {
            return acc;
        }
    }
}

console.log(cleanData(instructions));
