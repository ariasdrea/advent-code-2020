const fs = require("fs");

let answers = fs.readFileSync(__dirname + "/answers.txt", "utf8").split("\n\n");

let nums = [];
function countingAnswers(input) {
    for (var i = 0; i < input.length; i++) {
        let data = input[i].replace(/\n/gi, " ").split(" ");

        if (data.length == 1) {
            nums.push(data[0].length);
        } else {
            let arrOfArrs = [];
            for (let j = 0; j < data.length; j++) {
                let stringArr = data[j].split("");

                arrOfArrs.push(stringArr);
            }
            nums.push(intersectMany(arrOfArrs).length);
        }
    }

    return nums.reduce((a, b) => a + b, 0);
}

console.log(countingAnswers(answers));

function findIntersection(arr1, arr2) {
    return arr1.filter((val) => arr2.includes(val));
}

function intersectMany(arrOfArrs) {
    let result = arrOfArrs[0].slice();
    for (let i = 1; i < arrOfArrs.length; i++) {
        result = findIntersection(result, arrOfArrs[i]);
    }
    return result;
}
