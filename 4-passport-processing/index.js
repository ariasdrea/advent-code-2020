const fs = require("fs");

let passports = fs
    .readFileSync(__dirname + "/passports.txt", "utf8")
    .split("\n\n");

let validPassports = 0;
let maybePassports = 0;
function countingPassports() {
    for (var i = 0; i < passports.length; i++) {
        let data = passports[i].replace(/\n/gi, " ");
        if (data.match(/:/g).length === 8) {
            validPassports++;
        } else if (!data.match(/cid/g) && data.match(/:/g).length === 7) {
            maybePassports++;
        }
    }

    return validPassports + maybePassports;
}

console.log(countingPassports());
