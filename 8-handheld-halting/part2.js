const fs = require("fs");

let instructions = fs
    .readFileSync(__dirname + "/instructions.txt", "utf8")
    .split("\n");

function cleanData(data) {
    let i = 0;
    let acc = 0;
    let move, entireNum;
    let executedMoves = [];
    let infiniteLoop = false;

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
            infiniteLoop = true;
            break;
        }

        if (i >= data.length) {
            break;
        }
    }

    return [acc, infiniteLoop];
}

function attempts(data) {
    for (var i = 0; i < data.length; i++) {
        let copy = [...data];

        if (data[i].includes("jmp")) {
            copy[i] = copy[i].replace("jmp", "nop");
        }

        if (data[i].includes("nop")) {
            copy[i] = copy[i].replace("nop", "jmp");
        }

        let [acc, infiniteLoop] = cleanData(copy);

        if (!infiniteLoop) return acc;
    }
}

console.log(attempts(instructions));
