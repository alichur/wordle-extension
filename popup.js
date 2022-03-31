let copyButton = document.getElementById("copyButton");


// When the button is clicked, inject copyToClipboard into current page
copyButton.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // let wordle = await chrome.tabs.create({ active: false, url: "https://www.nytimes.com/games/wordle/index.html" });
  let quordle = await chrome.tabs.create({ active: false, url: "https://www.quordle.com/#/" });
  alert("test")

  chrome.scripting.executeScript({
    target: { tabId: quordle.id },
    function: copyToClipboard,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function copyToClipboard() {
  alert('testing');

  chrome.storage.sync.get("clipboardText", ({ clipboardText }) => {
    alert(`clipboard text updated is ${clipboardText}`);
    let quordleInnerButtonDiv = [...document.querySelectorAll('div')].filter(el => el.innerHTML === 'Copy to Clipboard');
    let quordleCopyButton = quordleInnerButtonDiv[0].closest("button");
    quordleCopyButton.click();
    alert("clicked quordle test");

  });

}
