// early upgrades

createOneTimeUpgrade("melon basement", "a large space for workers and melons", 400, () => {
    basementOwned = true;
});

createOneTimeUpgrade("strong melons", "clicking produces more melons", 800, () => {
    extraClickMultiplier += 0.5;
});

createOneTimeUpgrade("juicy melons", "they have larger melon value. thats a thing", 1600, () => {
    melonMultiplier += 0.2;
});

createOneTimeUpgrade("kvejp nutrition", "extra nutritious melons", 4000, () => {
    melonMultiplier += 0.4;
});

createOneTimeUpgrade("efficient pressers", "pressers press twice as much", 4500, () => {
    upgradeMultipliers["presser"] += 1;
});

createOneTimeUpgrade("kvejpls wisdom", "kvejpls remember how to farm 60% more melons", 4500, () => {
    upgradeMultipliers["grandpa kvejpl"] += 0.6;
});

createOneTimeUpgrade("smaller farms", "farms only need 4 farmers", 4500, () => {
    farmersPerFarm = 4;
});

createOneTimeUpgrade("melon fertilizer", "farms produce 20% more melons", 4500, () => {
    upgradeMultipliers["melon farm"] += 0.2;
});

createOneTimeUpgrade("RATs", "every click has a 5% chance to give extra melons", 8000, () => {
    showUpgradeButton("RAT food")
    showUpgradeButton("RATnip")
    ratOwned = true;
});

// level 100 upgrades

createOneTimeUpgrade("golden pressers", "pressers are made out of gold", 80_000, () => {
    upgradeMultipliers["presser"] += 2;
});

createOneTimeUpgrade("worker raise", "paying your workers more will make them work harder, right?", 400_000, () => {
    upgradeMultipliers["worker"] += 2;
});

createOneTimeUpgrade("legacy tools", "everyone knows the eldery works better with the things they know", 1_000_000, () => {
    upgradeMultipliers["grandpa kvejpl"] += 2;
});

createOneTimeUpgrade("modern tractors", "tractors and farmers go hand in hand, hopefully", 4_000_000, () => {
    upgradeMultipliers["farmer"] += 2;
});

createOneTimeUpgrade("soil soaker", "makes your soil wet, and thats good. just dont make it too wet", 12_000_000, () => {
    upgradeMultipliers["melon farm"] += 2;
});

createOneTimeUpgrade("mecha arm", "experience...? actually, they might just be robots afterall", 60_000_000, () => {
    upgradeMultipliers["experienced farmer"] += 2;
});

createOneTimeUpgrade("fortunate miners", "your miners are really fortunate.", 150_000_000, () => {
    upgradeMultipliers["melon mine"] += 2;
});

createOneTimeUpgrade("melonpad calculator", "theres a calculator now, congrats", 1_000_000_000, () => {
    upgradeMultipliers["melon intelligence"] += 2;
});

createOneTimeUpgrade("electricity overflow", "lot of volatge, thats for sure", 10_000_000_000, () => {
    upgradeMultipliers["melon factory"] += 2;
});

createOneTimeUpgrade("brownfields", "they might just do more harm than good, but thats fine", 25_000_000_000, () => {
    upgradeMultipliers["melon plantation"] += 2;
});

createOneTimeUpgrade("overthrow", "the people will overthrow the king as hes a tyrant", 200_000_000_000, () => {
    upgradeMultipliers["melon empire"] += 2;
});

createOneTimeUpgrade("advanced bottles", "throwing bottles is what they do. or atleast in the movies.", 10_000_000_000_000, () => {
    upgradeMultipliers["melon scientiest"] += 2;
});

createOneTimeUpgrade("melons 11 debloat", "debloats your melons 11 operating system so it can run faster.", 35_000_000_000_000, () => {
    upgradeMultipliers["comelon minus pc"] += 2;
});

createOneTimeUpgrade("gpt premium", "just a premium version of the melon-generating ai", 100_000_000_000_000, () => {
    upgradeMultipliers["melon gpt"] += 2;
});

createOneTimeUpgrade("fast borbs", "theyre fast.", 10_000_000, () => {
    extraClickMultiplier += 3.8;
});

// other

createOneTimeUpgrade("more melons", "even more melons, globally", 5_000_000, () => {
    melonMultiplier += 0.5;
});

function refreshBorbs() {
    clickMultiplier = 1;
    let num = getUpgradeCount("borb");
    for (let i = 0; i < num; i++) {
        upgradeObjects["borb"].callback();
    }
}

createOneTimeUpgrade("strong borbs", "makes borbs very strong", 500000, () => {
    borbMultiplier += 2;
    refreshBorbs();
});

createOneTimeUpgrade("big borbs",  "makes borbs very big", 200_000_000, () => {
    borbMultiplier += 3;
    refreshBorbs();
});

createOneTimeUpgrade("superior borbs",  "makes borbs.. superior?", 15_000_000_000, () => {
    borbMultiplier += 4;
    refreshBorbs();
});

createOneTimeUpgrade("godlike borbs",  "because superior isnt enough", 1_000_000_000_000, () => {
    borbMultiplier += 5;
    refreshBorbs();
});

createOneTimeUpgrade("epic RATs",  "rat.", 500000, () => {
    ratClickMultiplier += 5;
});

createOneTimeUpgrade("diamond RATs", "100% chance for a golden RAT click. adds a 5% chance for a diamond RAT click.", 5_500_000, () => {
    ratClickChance = 5;
    diamondRatsOwned = true;
    showUpgradeButton("diamond powder");
    showUpgradeButton("diamond purifier");
});


for (let i of Array.from(document.getElementById("onetime-upgrade-shop-container").children)) {
    let text = i.id.split("-upgrade")[0];
    if (getUpgradeCount(text)) {
        markOneTimeUpgradeAsPurchased(text);
    }
}
