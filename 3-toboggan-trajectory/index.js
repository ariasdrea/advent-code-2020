// Starting at the top-left corner of your map and following a slope of right 3 and down 1
// how many trees would you encounter?

const fs = require("fs");

const map = fs.readFileSync(__dirname + "/map.txt", "utf8");

const path = map.split("\n");

function repeatStrings(arrOfStrings, times) {
    if (times > 0) {
        return arrOfStrings.map((each) => each.repeat(times));
    }
}

let treeCounter = 0;
let x = 0;
let y = 0;

let right = 3;
let down = 1;

(function countingTrees() {
    const revisedPath = repeatStrings(path, 32);
    for (var i = 0; i < revisedPath.length; i++) {
        let currentPosition = revisedPath[y][x];

        if (currentPosition === "#") {
            treeCounter++;
        }

        x += right;
        y += down;
    }

    console.log(treeCounter);
})();
