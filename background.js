let initialResults = 'game results';

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
    // console.log(`${Object.keys(changes)[0]} storage value updated`)
    if ("quordle" in changes) {
        console.log(changes.quordle.newValue);
    };
    if ("octordle" in changes) {
        console.log(changes.octordle.newValue);
    };
    if ("durdle" in changes) {
        console.log(changes.durdle.newValue);
    };
});

