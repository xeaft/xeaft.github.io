let clicks = localStorage.getItem("clicks") != null ? +localStorage.getItem("clicks") : 0;

function getClicks() {
    return clicks;
}

function addClicks(amt) {
    let clickAmt = amt * melonMultiplier;
    clicks += clickAmt;
}

function removeClicks(amt) {
    clicks -= amt;
}

function saveClicks() {
    localStorage.setItem("clicks", clicks);
}

function getUpgradeCount(upgrade) {
    let upgradeButton = getUpgradeObject(upgrade);
    if (upgradeButton == null) {
        return 0;
    }
    return +upgradeButton.querySelector(".upgrade-owned").innerText;
}

function getUpgradeCost(upgrade) {
    let upgradeButton = getUpgradeObject(upgrade);
    if (upgradeButton == null) {
        return 0;
    }
    
    return +upgradeButton.querySelector(".upgrade-cost").innerText;
}

function buyUpgrade(upgrade, amt, force) {
    if (amt == null) {
        amt = 1;
    }
    
    let upgradeButton = getUpgradeObject(upgrade);
    if (upgradeButton) {
        if (force) {
            console.log(
                "%cu%cp%cg%cr%ca%cd%ce",
                "color: red; background-color: #222; font-weight: bold;",
                "color: green; background-color: #323232; font-weight: bold;",
                "color: red; background-color: #222; font-weight: bold;",
                "color: green; background-color: #323232; font-weight: bold;",
                "color: red; background-color: #222; font-weight: bold;",
                "color: green; background-color: #323232; font-weight: bold;",
                "color: red; background-color: #222; font-weight: bold;"
              );        
        }

        for (let i = 0; i < amt; i++) {
            let upgradePrice = getUpgradeCost(upgrade);
            if (force) {
                removeClicks(-upgradePrice);          
            }
            
            if (getClicks() >= upgradePrice) {
                upgradeButton.click();
            } else {
                return false;
            }
        }

        return true;
    }
}
 
function removeUpgradeButton(upgradeName) {
    let upgradeButton = document.getElementById(`${upgradeName}-upgrade`);
    if (upgradeButton) {
        upgradeButton.style.display = "none";
    }
}

function showUpgradeButton(upgradeName) {
    let upgradeButton = document.getElementById(`${upgradeName}-upgrade`);
    if (upgradeButton) {
        upgradeButton.style.display = "flex";
    }
}

function updateClicksText() {
    let costTexts = document.getElementsByClassName("upgrade-cost");
    for (let costText of costTexts) {
        if (costText.parentElement.parentElement.classList.contains("onetime-upgrade-purchased")) {
            continue;
        }

        let oldCost = costText.parentElement.parentElement.querySelector(".original-cost-text").innerText;
        let cost = oldCost * globalPriceMultiplier;
        costText.innerText = Math.ceil(cost);        
        if (cost <= clicks) {
            costText.style.color = getCSSVarValue("--melon-text-affordable");
        } else {
            costText.style.color = getCSSVarValue("--melon-text-not-affordable");
        }
    }

    document.getElementById("clicks-count").innerText = Math.floor(clicks);
}

function upgradeEverythingPossible(reverse) {
    let upgrades = Array.from(document.getElementsByClassName("upgrade-button"));
    if (reverse) {
        upgrades.reverse();
    }
    for (let i of upgrades) {
        if (i.style.display == "none") {
            continue;
        }

        let upgradeName = i.querySelector(".upgrade-container").querySelector("p").innerText;
        let canUpgrade = true;

        while (canUpgrade) {
            canUpgrade = buyUpgrade(upgradeName);
        }
    }
}

function rollXBuff() {
    let number = Math.round(Math.random() * 99);
    if (number > 30) {
        return;
    }

    let choice = Math.round(Math.random() * 100);
    if (choice < 40) {
        let debuffNames = Object.keys(debuffs);
        let debuffIndex = Math.round(Math.random() * (debuffNames.length - 1));
        let debuffName = debuffNames[debuffIndex];
        spawnDebuff(debuffName);
        return;
    }

    let buffNames = Object.keys(buffs);
    let buffIndex = Math.round(Math.random() * (buffNames.length - 1));
    let buffName = buffNames[buffIndex];
    spawnBuff(buffName);
}

function getUpgradeObject(upgradeName) {
    return document.getElementById(`${upgradeName}-upgrade`);
}

setInterval(saveClicks, 0.167 * 1000 * 60);
setInterval(updateClicksText, 60);
setInterval(rollXBuff, 30000);