
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        quordle: "https://www.quordle.com",
        durdle: "https://zaratustra.itch.io/dordle",
        octordle: "https://octordle.com123",
        formatted: "placeholder"
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
