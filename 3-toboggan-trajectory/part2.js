// Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:
// # are trees
// . are spaces

// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
// If you would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

// What do you get if you multiply together the number of trees encountered on each of the listed slopes?

const fs = require("fs");

const map = fs.readFileSync(__dirname + "/map.txt", "utf8");

const path = map.split("\n");

function extendStringBy(path, numOfRights) {
    let lineLength = path[0].length;
    let entirePathLength = path.length;
    let timesBeforeRunningOut = lineLength / numOfRights;

    return Math.ceil(entirePathLength / timesBeforeRunningOut, 1);
}

function repeatStrings(arrOfStrings, times) {
    if (times > 0) {
        return arrOfStrings.map((each) => each.repeat(times));
    }
}

let slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];

function countingTrees() {
    let treeCounter = 0;
    let arrOfTrees = [];
    let arrForRights = [];

    for (var i = 0; i < slopes.length; i++) {
        treeCounter = 0;
        let x = 0;
        let y = 0;

        let [rightMoves, downMoves] = slopes[i];

        const timesToExtendX = extendStringBy(path, rightMoves);
        arrForRights.push(timesToExtendX);

        // out of all options for right moves, it picks the highest number to extend the strings by that number.
        let maxExtensionX = Math.max(...arrForRights);

        // the extended revised path is provided
        const revisedPath = repeatStrings(path, maxExtensionX);

        for (var j = 0; j < revisedPath.length; j++) {
            if (y != undefined && y < revisedPath.length) {
                let currentPosition = revisedPath[y][x];

                if (currentPosition === "#") {
                    treeCounter++;
                }

                x += rightMoves;
                y += downMoves;
            }
        }
        arrOfTrees.push(treeCounter);
    }

    return arrOfTrees.reduce((a, b) => a * b, 1);
}

console.log(countingTrees());
