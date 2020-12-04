const fs = require("fs");

let passports = fs
    .readFileSync(__dirname + "/passports.txt", "utf8")
    .split("\n\n");

let validPassports = 0;
let maybePassports = 0;
let requiresExtraValidation = [];
function countingPassports() {
    for (var i = 0; i < passports.length; i++) {
        let data = passports[i].replace(/\n/gi, " ");
        if (data.match(/:/g).length === 8) {
            requiresExtraValidation.push(data);
            validPassports++;
        } else if (!data.match(/cid/g) && data.match(/:/g).length === 7) {
            requiresExtraValidation.push(data);
            maybePassports++;
        }
    }

    return validPassports + maybePassports;
}

let passportsToValidate = countingPassports();

let arr = [];
let eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

function validatePassports(data, passportsToValidate) {
    for (var i = 0; i < data.length; i++) {
        let arrOfPasswords = data[i].split(" ");

        var obj = {};
        for (var j = 0; j < arrOfPasswords.length; j++) {
            var split = arrOfPasswords[j].split(":");
            obj[split[0].trim()] = split[1].trim();
        }

        arr.push(obj);
    }

    for (var k = 0; k < arr.length; k++) {
        let { byr, iyr, eyr, hgt, hcl, ecl, pid } = arr[k];

        let cm = hgt.substring(0, hgt.length - 2);
        let inches = hgt.substring(0, hgt.length - 2);

        if (byr.length === 4 && !(byr >= 1920 && byr <= 2002)) {
            passportsToValidate--;
        } else if (iyr.length == 4 && !(iyr >= 2010 && iyr <= 2020)) {
            passportsToValidate--;
        } else if (eyr.length == 4 && !(eyr >= 2020 && eyr <= 2030)) {
            passportsToValidate--;
        } else if (hgt.indexOf("cm") === -1 && hgt.indexOf("in") === -1) {
            passportsToValidate--;
        } else if (hgt.indexOf("cm") > 0 && !(cm >= 150 && cm <= 193)) {
            passportsToValidate--;
        } else if (hgt.indexOf("in") > 0 && !(inches >= 59 && inches <= 76)) {
            passportsToValidate--;
        } else if (hcl.indexOf("#") !== 0 || hcl.length != 7) {
            passportsToValidate--;
        } else if (!hcl.match(/#[a-f0-9]+/)) {
            passportsToValidate--;
        } else if (pid[0] === 0 || pid.length != 9) {
            passportsToValidate--;
        } else {
            if (eyeColors.indexOf(ecl) === -1) {
                passportsToValidate--;
            }
        }
    }

    return passportsToValidate;
}

console.log(validatePassports(requiresExtraValidation, passportsToValidate));
