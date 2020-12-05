const fs = require("fs");

let boardingPasses = fs
    .readFileSync(__dirname + "/boarding.txt", "utf8")
    .split("\n");

let obj = {
    F: 0,
    B: 1,
    L: 0,
    R: 1
};

function halveSections(section) {
    let firstHalf = section.slice(0, section.length / 2);
    let secondHalf = section.slice(section.length / 2, section.length);

    return [firstHalf, secondHalf];
}

function getSeatId(boardingPass) {
    let row = [...Array(128).keys()];
    let column = [...Array(8).keys()];

    for (let i = 0; i < boardingPass.length; i++) {
        let letter = boardingPass[i];
        let halfIWant = obj[letter];

        i < 7
            ? (row = halveSections(row)[halfIWant])
            : (column = halveSections(column)[halfIWant]);
    }

    return row[0] * 8 + column[0];
}

let allSeatIds = [];
function checkBoadingPasses(data) {
    for (let i = 0; i < data.length; i++) {
        allSeatIds.push(getSeatId(data[i]));
    }
}

checkBoadingPasses(boardingPasses);

let maxSeatId = Math.max(...allSeatIds);

console.log("whoa that's a high seat id!", maxSeatId);
