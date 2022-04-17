let initialResults = 'game results';
let wordle = "https://www.nytimes.com/games/wordle/index.html";
let durdle = "https://zaratustra.itch.io/dordle";
let qurodle = "Complete Quordle here: https://www.quordle.com/#/";
let octordle = "https://octordle.com/?mode=daily";

function getFormattedQuordle(fullQuordleString) {
    return fullQuordleString.includes('quordle.com') ? fullQuordleString.split('quordle.com')[0] : qurodle
};

// async function getCurrentTab() {
//     let queryOptions = { active: true, currentWindow: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
//   }

chrome.runtime.onInstalled.addListener(() => {

    let results = `${initialResults} are`
    chrome.storage.sync.set({ quordle: results }, function () {
        console.log(`quordle starting value: ${results}`);
    });
    let formatted = 'Something went wrong, no results able to be copied'
    chrome.storage.sync.set({ formatted: formatted }, function () {
        console.log(`added formatted var`);
    });

});

chrome.storage.onChanged.addListener(function (changes) {
    if ("quordle" in changes) {
        let quordle = getFormattedQuordle(changes.quordle.newValue);
        console.log(`quordle formmated is now ${quordle}`);
        //beware circlular.
        chrome.storage.sync.set({ formatted: quordle }, function () {
            console.log(`set formatted var to ${quordle}`)
        });
    }

});

