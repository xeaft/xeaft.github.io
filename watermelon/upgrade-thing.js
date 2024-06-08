function createAnyUpgrade(name, description, cost, callback, delay, upgradeShopId, execOnceFunc, execOnceType) {
    let upgradeShop = document.getElementById(upgradeShopId);
    let button = document.createElement("div");
    let titleText = document.createElement("p");
    let costText = document.createElement("p");
    let titleCostContainer = document.createElement("div");
    let ownedText = document.createElement("p");
    let ownedAmt = 0;

    upgradeMultipliers[name] = 0;

    let existingUpgradeJson = localStorage.getItem(name);
    if (existingUpgradeJson != null) {
        existingUpgradeJson = JSON.parse(existingUpgradeJson);
        ownedAmt = existingUpgradeJson.owned;
        cost = existingUpgradeJson.cost;
    }

    let execOnce = typeof delay === 'string';
    
    if (execOnce) {
        for (let i = 0; i < ownedAmt; i++) {
            callback();
        }
    }

    titleText.innerText = name; 
    costText.innerText = Math.ceil(+cost);
    ownedText.innerText = ownedAmt;
    costText.className = "upgrade-cost";
    button.className = "upgrade-button";
    titleCostContainer.className = "upgrade-container";
    ownedText.className = "upgrade-owned";
    button.style.backgroundColor = "#232323";
    costText.style.marginLeft = "5%";
    button.id = `${name}-upgrade`;

    titleCostContainer.appendChild(titleText);
    titleCostContainer.appendChild(costText);
    button.appendChild(titleCostContainer);
    button.appendChild(ownedText);
    upgradeShop.appendChild(button);

    button.addEventListener("click", (ev) => {
        if (ev.button == 0) {
            let clicks = getClicks();
            let costNum = +cost;

            if (clicks >= costNum) {
                removeClicks(cost);
                let ownedAmt = +ownedText.innerHTML;
                cost = getNextCost(cost, ownedAmt);
                ownedAmt += 1;
                ownedText.innerHTML = ownedAmt;
                costText.innerHTML = Math.ceil(cost);

                let jsonObj = {
                    owned: ownedAmt,
                    cost: cost
                };

                localStorage.setItem(name, JSON.stringify(jsonObj));
                saveClicks();

                if (execOnce) {
                    callback();
                }

                if (typeof execOnceFunc == "function" && execOnceType == "onclick") {
                    execOnceFunc();
                }
            }
        }
    });

    let textSize = getTextSize(description);
    button.addEventListener("mouseenter", (ev) => {
        let mouseY = ev.clientY;

        let bgDiv = document.createElement("div");
        bgDiv.style.position = "absolute";
        bgDiv.style.right = "16vw";
        bgDiv.style.top = mouseY + "px";
        bgDiv.style.width = textSize.x + 10 + "px";
        bgDiv.style.height = textSize.y + 10 + "px";
        bgDiv.id = "upgrade-hover-text";
        bgDiv.style.border = "1px solid white";
        bgDiv.style.backgroundColor = "#000";

        let textObj = document.createElement("p");
        textObj.style.lineHeight = textSize.y + 10 + "px";
        textObj.innerText = description;
        textObj.style.padding = "0";
        textObj.style.margin = "5px";
        bgDiv.appendChild(textObj);
        document.body.appendChild(bgDiv);
    });

    button.addEventListener("mousemove", (ev) => {
        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.style.top = ev.clientY + "px";
        }
    })

    button.addEventListener("mouseleave", (ev) => {
        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.parentElement.removeChild(thing);
        }
    });

    if (!execOnce) {
        setInterval(() => {
            let ownedAmt = +ownedText.innerHTML;
            for (let i = 0; i < ownedAmt; i++) {
                callback();
            }
        }, delay);
    }

    if (typeof execOnceFunc == "function" && execOnceType != "onclick") {
        execOnceFunc();
    }
}

function createUpgrade(name, description, cost, callback, delay, execOnceFunc, execOnceType) {
    createAnyUpgrade(name, description, cost, callback, delay, "upgrade-shop-container", execOnceFunc, execOnceType);
}

function createOneTimeUpgrade(name, desc, cost, callback) {
    let owned = localStorage.getItem(name) != null ? true : false;
    if (owned) {
        callback();
        return;
    }

    let upgradeShop = document.getElementById("onetime-upgrade-shop-container");
    let button = document.createElement("div");
    let titleText = document.createElement("p");
    let costText = document.createElement("p");
    let titleCostContainer = document.createElement("div");

    let existingUpgradeJson = localStorage.getItem(name);
    if (existingUpgradeJson != null) {
        existingUpgradeJson = JSON.parse(existingUpgradeJson);
        ownedAmt = existingUpgradeJson.owned;
        cost = existingUpgradeJson.cost;
    }

    titleText.innerText = name; 
    costText.innerText = Math.ceil(+cost);
    button.className = "upgrade-button";
    costText.className = "upgrade-cost";
    titleCostContainer.className = "upgrade-container";
    button.style.backgroundColor = "#232323";
    costText.style.marginLeft = "5%";

    titleCostContainer.appendChild(titleText);
    titleCostContainer.appendChild(costText);
    button.appendChild(titleCostContainer);
    upgradeShop.appendChild(button);

    button.addEventListener("click", (ev) => {
        if (ev.button == 0) {
            let clicks = getClicks();
            let costNum = +cost;

            if (clicks >= costNum) {
                removeClicks(cost);
                callback();
                localStorage.setItem(name, true);
                button.parentElement.removeChild(button);
                saveClicks();
            }
        }
    });
}

function createClickerUpgrade(name, description, cost, callback, delay) {
    createAnyUpgrade(name, description, cost, callback, delay, "clicker-upgrade-shop-container");
}

function getNextCost(currentCost, ownedAmt) {
    // TODO: make a normal formula for this
    return currentCost + currentCost / 12;
}

function getTextSize(text) {
    let p = document.createElement("p");
    p.style.position = "absolute";
    p.style.visibility = "hidden";
    p.style.whiteSpace = "nowrap";
    p.textContent = text;

    document.body.appendChild(p);

    let size = {
        width: p.offsetWidth,
        height: p.offsetHeight
    };

    document.body.removeChild(p);
    return size;
}

function closenessLevel(x, y) {
    let difference = Math.abs(x - y);
    let maxDifference = Math.max(x, y);
    let closenessScore = 10 - (difference / maxDifference * 10);
    
    if (closenessScore < 1) closenessScore = 1;
    if (closenessScore > 10) closenessScore = 10;
    
    return closenessScore;
}