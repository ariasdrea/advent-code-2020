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
    const password = halves[1].substring(1);
    const numbers = halves[0].split(" ")[0];
    const min = parseInt(numbers.split("-")[0]);
    const max = parseInt(numbers.split("-")[1]);

    if (
        (letterToCheck == password[min - 1] &&
            letterToCheck != password[max - 1]) ||
        (letterToCheck != password[min - 1] &&
            letterToCheck == password[max - 1])
    ) {
        counter++;
    }
});

console.log(counter);
