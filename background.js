let initialResults = 'game results:';

chrome.runtime.onInstalled.addListener(() => {
    let results = `${initialResults} 1234`
    chrome.storage.sync.set({ results: results }, function () {
        console.log(`Storage API results are being set to: ${results}`);
    });
    chrome.storage.sync.get('results', function (value) {
        console.log(`Storage API results are: ${value['results']}`);
    });
});

