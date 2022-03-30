// let clipboardText = 'RESULTS: my wordle results are';

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({ clipboardText });
//     console.log(`Clipboard text will be set to: ${clipboardText}`);
// });

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});
