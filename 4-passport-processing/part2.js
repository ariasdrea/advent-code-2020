const fs = require("fs");

let allPassports = fs
    .readFileSync(__dirname + "/passports.txt", "utf8")
    .split("\n\n");

let validPassports = 0;
let maybePassports = 0;
let dataRequiringExtraValidation = [];

function countingPassports() {
    for (var i = 0; i < allPassports.length; i++) {
        let data = allPassports[i].replace(/\n/gi, " ");

        if (data.match(/:/g).length === 8) {
            dataRequiringExtraValidation.push(data);
            validPassports++;
        } else if (!data.match(/cid/g) && data.match(/:/g).length === 7) {
            dataRequiringExtraValidation.push(data);
            maybePassports++;
        }
    }

    return validPassports + maybePassports;
}

let numPotentialValidPassports = countingPassports();

let arr = [];
let eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
let numFinalValidPassports;

function validatePassports(data, num) {
    for (var i = 0; i < data.length; i++) {
        let arrOfPassports = data[i].split(" ");

        var obj = {};
        for (var j = 0; j < arrOfPassports.length; j++) {
            var split = arrOfPassports[j].split(":");
            obj[split[0].trim()] = split[1].trim();
        }

        arr.push(obj);
    }

    for (var k = 0; k < arr.length; k++) {
        let { byr, iyr, eyr, hgt, hcl, ecl, pid } = arr[k];

        let cm = hgt.substring(0, hgt.length - 2);
        let inches = hgt.substring(0, hgt.length - 2);

        if (byr.length === 4 && !(byr >= 1920 && byr <= 2002)) {
            num--;
        } else if (iyr.length == 4 && !(iyr >= 2010 && iyr <= 2020)) {
            num--;
        } else if (eyr.length == 4 && !(eyr >= 2020 && eyr <= 2030)) {
            num--;
        } else if (hgt.indexOf("cm") === -1 && hgt.indexOf("in") === -1) {
            num--;
        } else if (hgt.indexOf("cm") > 0 && !(cm >= 150 && cm <= 193)) {
            num--;
        } else if (hgt.indexOf("in") > 0 && !(inches >= 59 && inches <= 76)) {
            num--;
        } else if (hcl.indexOf("#") !== 0 || hcl.length != 7) {
            num--;
        } else if (!hcl.match(/#[a-f0-9]+/)) {
            num--;
        } else if (pid[0] === 0 || pid.length != 9) {
            num--;
        } else {
            if (eyeColors.indexOf(ecl) === -1) {
                num--;
            }
        }
    }

    return (numFinalValidPassports = num);
}

console.log(
    validatePassports(dataRequiringExtraValidation, numPotentialValidPassports)
);
