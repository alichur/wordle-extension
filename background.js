let initialResults = 'game results';
let wordle = "https://www.nytimes.com/games/wordle/index.html";
let durdle = "https://zaratustra.itch.io/dordle";
let qurodle = "https://www.quordle.com/#/";
let octordle = "https://octordle.com/?mode=daily";

function getFormattedQuordle(fullQuordleString) {
    return fullQuordleString.includes('quordle.com') ? fullQuordleString.split('quordle.com')[0] : qurodle;
};
function getFormattedDurdle(fullDurdleString) {
    return fullDurdleString.includes('7') ? fullDurdleString.split('7')[0] : durdle;
};
function getFormattedOctordle(fullOctordleString) {
    return fullOctordleString.includes('octordle.com') ? fullOctordleString.split('octordle.com')[0] : octordle;
};

chrome.runtime.onInstalled.addListener(() => {
    let results = `${initialResults} are`;
    chrome.storage.sync.set({
        quordle: results,
        durdle: results,
        octordle: results,
        formatted: results
    }, function () {
        console.log(`4 vars set`);
    });
});

chrome.storage.onChanged.addListener(function (changes) {
    if ("quordle" in changes) {
        let quordle = getFormattedQuordle(changes.quordle.newValue);
        console.log(`quordle formmated is now ${quordle}`);
        //beware circlular.
        chrome.storage.sync.set({ formatted: quordle }, function () {
            console.log(`set formatted via quordle to ${quordle}`)
        });
    };
    if ("octordle" in changes) {
        let octordle = getFormattedOctordle(changes.octordle.newValue);
        console.log(`octordle formmated is now ${octordle}`);
        //beware circlular.
        chrome.storage.sync.get('formatted', function (value) {
            let formatted = value['formatted'] + "concat" + octordle;
            chrome.storage.sync.set({ formatted: formatted }, function () {
                console.log(`set formatted via octordle to ${formatted}`)
            });
        });
    };
    if ("durdle" in changes) {
        let durdle = getFormattedDurdle(changes.durdle.newValue);
        console.log(`durdle formmated is now ${durdle}`);
        //beware circlular.
        chrome.storage.sync.get('formatted', function (value) {
            let formatted = value['formatted'] + "concat" + durdle;
            chrome.storage.sync.set({ formatted: formatted }, function () {
                console.log(`set formatted via durdle to ${formatted}`)
            });
        });
    };
});

