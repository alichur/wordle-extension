let initialResults = 'game results';
let wordle = "https://www.nytimes.com/games/wordle/index.html";
let durdle = "https://zaratustra.itch.io/dordle";
let qurodle = "Complete Quordle here: https://www.quordle.com/#/";
let octordle = "https://octordle.com/?mode=daily";

function getFormattedQuordle(fullQuordleString) {
    return fullQuordleString.includes('quordle.com') ? fullQuordleString.split('quordle.com')[0] : qurodle
};

chrome.runtime.onInstalled.addListener(() => {

    let results = `${initialResults} are`
    chrome.storage.sync.set({ results: results }, function () {
        console.log(`Storage API results are being set to: ${results}`);
    });
    chrome.storage.sync.get('results', function (value) {
        console.log(`Storage API results are: ${value['results']}`);
    });
});

chrome.storage.onChanged.addListener(function (changes) {
    if ("results" in changes) {
        console.log("Old value: " + changes.results.oldValue);
        console.log("New value: " + changes.results.newValue);
        console.log(getFormattedQuordle(changes.results.newValue));
    }
});

