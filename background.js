let clipboardText = 'RESULTS: my wordle results are';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ clipboardText });
    console.log(`Clipboard text will be set to: ${clipboardText}`);
});

