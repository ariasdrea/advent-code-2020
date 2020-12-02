// Each line gives the password policy and then the password.
// The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid.
// How many passwords are valid according to their policies?

const fs = require("fs");

const file = fs.readFileSync(__dirname + "/passwords.txt", "utf8");

const lines = file.split("\n");

let counter = 0;

lines.map((line) => {
    const halves = line.split(":");
    const letterToCheck = halves[0].slice(-1);
    const password = halves[1];
    const allNums = halves[0].split(" ")[0];
    const min = parseInt(allNums.split("-")[0]);
    const max = parseInt(allNums.split("-")[1]);

    const occurrences = password.split(letterToCheck).length - 1;

    if (occurrences >= min && occurrences <= max) {
        counter += 1;
    }
});

console.log(counter);
