let copyButton = document.getElementById("copyButton");


// When the button is clicked, inject copyToClipboard into current page
copyButton.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // let wordle = await chrome.tabs.create({ active: false, url: "https://www.nytimes.com/games/wordle/index.html" });
  let quordle = await chrome.tabs.create({ active: false, url: "https://www.quordle.com/#/" });
  //todo wait for page to load - this alert happens to fix this! Replace with await.
  alert("test")


  chrome.scripting.executeScript({
    target: { tabId: quordle.id },
    function: copyToClipboard,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function copyToClipboard() {
  let quordleInnerButtonDiv = [...document.querySelectorAll('div')].filter(el => el.innerHTML === 'Copy to Clipboard');
  let quordleCopyButton = quordleInnerButtonDiv[0].closest("button");
  quordleCopyButton.click();

  chrome.storage.sync.get('results', function (value) {
    let newValue = `${value['results']} (qurodle results will be here)`;
    chrome.storage.sync.set({ results: newValue }, function () {
      console.log(`Storage API results are being set to: ${newValue}`);
    });
  });
}
