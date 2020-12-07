// How many individual bags are required inside your single shiny gold bag?

const fs = require("fs");

let allBags = fs
    .readFileSync(__dirname + "/haversacks.txt", "utf8")
    .split("\n");

function cleanData(allBags) {
    let obj = {};
    let outerBag, insideBags, cleanInsideBags;

    for (let i = 0; i < allBags.length; i++) {
        outerBag = allBags[i]
            .substring(0, allBags[i].indexOf("contain"))
            .replace("bags", "")
            .trim();

        insideBags = allBags[i].split("contain").pop().split(",");

        cleanInsideBags = [];
        for (let j = 0; j < insideBags.length; j++) {
            let cleanBags = insideBags[j]
                .replace("bags", "")
                .replace("bag", "")
                .slice(0, -1)
                .trim();

            cleanInsideBags.push(cleanBags);
        }

        for (let k = 0; k < cleanInsideBags.length; k++) {
            obj[outerBag] = cleanInsideBags;
        }
    }
    return obj;
}

let cleanObj = cleanData(allBags);

function getChildrenCount(obj, bagToCheck) {
    let count = 0;
    let child, newCount, num;
    let children = obj[bagToCheck];

    for (let i = 0; i < children.length; i++) {
        child = children[i].substring(2);
        num = children[i].slice(0, 1);

        if (num === "n") {
            num = 0;
        } else {
            num = parseInt(num);
            newCount = num + num * getChildrenCount(obj, child);
            count += newCount;
        }
    }
    return count;
}

console.log(getChildrenCount(cleanObj, "shiny gold"));
