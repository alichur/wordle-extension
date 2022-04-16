let initialResults = 'game results';

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
    }
});