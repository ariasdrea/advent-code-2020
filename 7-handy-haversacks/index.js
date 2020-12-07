// How many bag colors can eventually contain at least one shiny gold bag?

const fs = require("fs");

let allBags = fs
    .readFileSync(__dirname + "/haversacks.txt", "utf8")
    .split("\n");

function cleanData(allBags) {
    let obj = {};
    for (let i = 0; i < allBags.length; i++) {
        let outerBag = allBags[i]
            .substring(0, allBags[i].indexOf("contain"))
            .replace("bags", "")
            .trim();

        let insideBags = allBags[i].split("contain").pop().split(",");

        let cleanInsideBags = [];
        for (let j = 0; j < insideBags.length; j++) {
            let cleanBags = insideBags[j]
                .replace("bags", "")
                .replace("bag", "")
                .slice(0, -1)
                .trim()
                .replace(/[0-9]+/, "")
                .trim();

            cleanInsideBags.push(cleanBags);
        }

        for (let k = 0; k < cleanInsideBags.length; k++) {
            if (!obj[cleanInsideBags[k]]) {
                obj[cleanInsideBags[k]] = [];
                obj[cleanInsideBags[k]].push(outerBag);
            } else {
                obj[cleanInsideBags[k]].push(outerBag);
            }
        }
    }
    return obj;
}

let cleanObj = cleanData(allBags);

function getPotentialParents(obj, bagToCheck) {
    let parents = obj[bagToCheck];
    for (let i = 0; i < parents.length; i++) {
        if (parents[i] in obj) {
            let newParents = getPotentialParents(obj, parents[i]);

            parents = [...parents, ...newParents];
        }
    }
    return parents;
}

let potentialParents = getPotentialParents(cleanObj, "shiny gold");

function getRidOfDuplicates(arr) {
    return [...new Set(arr)].length;
}

console.log(getRidOfDuplicates(potentialParents));
