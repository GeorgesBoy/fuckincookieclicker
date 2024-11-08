let points = 0;
let pointsPerSecond = 0;
let upgrades = {
    cursor: {cost: 10, increment: 1, owned: 0},
    grandma: {cost: 100, increment: 10, owned: 0},
    factory: {cost: 1000, increment: 100, owned: 0}
};
let achievements = [
    {name: "First Click", condition: () => points >= 1, unlocked: false},
    {name: "100 Cookies", condition: () => points >= 100, unlocked: false},
    {name: "1,000 Cookies", condition: () => points >= 1000, unlocked: false},
    // Add more achievements as needed
];
let prestigeMultiplier = 1;

document.getElementById('cookie').addEventListener('click', () => {
    points += prestigeMultiplier;
    updatePointsDisplay();
});

function buyUpgrade(upgradeName, cost, increment) {
    let upgrade = upgrades[upgradeName];
    if (points >= upgrade.cost) {
        points -= upgrade.cost;
        upgrade.owned++;
        pointsPerSecond += upgrade.increment;
        upgrade.cost = Math.round(upgrade.cost * 1.15); // Upgrade cost increases
        updatePointsDisplay();
    }
}

function updatePointsDisplay() {
    document.getElementById('points').innerText = points;
    for (let upgradeName in upgrades) {
        let upgrade = upgrades[upgradeName];
        document.querySelector(`button[onclick="buyUpgrade('${upgradeName}', ${upgrade.cost - upgrade.increment}, ${upgrade.increment})"]`).innerText =
            `Buy ${capitalizeFirstLetter(upgradeName)} (${upgrade.cost} cookies) - ${upgrade.increment} cookies per second`;
    }
}

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!achievement.unlocked && achievement.condition()) {
            achievement.unlocked = true;
            let li = document.createElement("li");
            li.innerText = achievement.name;
            document.getElementById('achievementList').appendChild(li);
        }
    });
}

function prestige() {
    if (points >= 10000) { // Example condition for prestiging
        points = 0;
        pointsPerSecond = 0;
        prestigeMultiplier++;
        for (let upgradeName in upgrades) {
            upgrades[upgradeName].cost = upgrades[upgradeName].cost / Math.pow(1.15, upgrades[upgradeName].owned);
            upgrades[upgradeName].owned = 0;
        }
        updatePointsDisplay();
        alert('You have prestiged! Multiplier increased.');
    } else {
        alert('You need at least 10,000 cookies to prestige.');
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

setInterval(() => {
    points += pointsPerSecond * prestigeMultiplier;
    updatePointsDisplay();
    checkAchievements();
}, 1000);
