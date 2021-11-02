let itemList = [
    { type: 5, name: "BeeHive Tree" },
    { type: 24, name: "Yellow Flower" },
    { type: 25, name: "Tulip" },
    { type: 33, name: "Wooden Box" },
    { type: 34, name: "Steel Box" },
    { type: 41, name: "Treasure Chest" },
    { type: 35, name: "Wooden Barrel" },
    { type: 36, name: "BeeHive" },
    { type: 57, name: "Green Apple" },
    { type: 58, name: "Red Apple" },
    { type: 59, name: "Banana" }
]

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function (message) {
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);

    if (typeof console.logs[console.logs.length - 1] === "object") {
        let msg = console.logs[console.logs.length - 1].toString()
        let filterMapStr = "Generate a new Wild Map"
        let filterMapRegex = new RegExp(filterMapStr, 'g')
        let filterActionStr = "Add\\saction\\sindex"
        let filterActionRegex = new RegExp(filterActionStr, 'g')

        if (filterMapRegex.test(msg)) {
            for (let i = 0; i < itemList.length; i++) {
                let findingType = `type: ${itemList[i].type} \\| position: (\\d*-\\d*)`
                let regexType = new RegExp(findingType, 'g')
                let msg2 = msg.match(regexType)
                if (msg2 != null) {
                    for (let j = 0; j < msg2.length; j++) {
                        let findingPosition = `type: ${itemList[i].type} \\| position: (\\d*-\\d*)`
                        let regexPos = new RegExp(findingPosition, 'g')
                        let posAt = regexPos.exec(msg2[j])
                        console.log(`#### Found Item : ${itemList[i].name} at [${posAt[1]}]`);
                    }
                }
            }
            console.log(`####################################`);
        } else if (filterActionRegex.test(msg)) {
            let findingPlayerPosition = `player_position":"(\\d*-\\d*)`
            let regexPlayerPosition = new RegExp(findingPlayerPosition, 'g')
            let playerPosition = regexPlayerPosition.exec(msg)
            if (playerPosition) {
                console.log(`######## Player Position [${playerPosition[1]}]`)
            }
        }

    }
    console.logs.length = 0
}
