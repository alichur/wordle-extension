let copyButton = document.getElementById("copyButton");


// When the button is clicked, inject appendToResults into current page
copyButton.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // let wordle = await chrome.tabs.create({ active: false, url: "https://www.nytimes.com/games/wordle/index.html" });
  let quordle = await chrome.tabs.create({ active: false, url: "https://www.quordle.com/#/" });
  //todo wait for page to load - this alert happens to fix this! Replace with await.
  alert("test")


  chrome.scripting.executeScript({
    target: { tabId: quordle.id },
    function: appendToResults,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
async function appendToResults() {
  //copy quordle results to clipboard
  let quordleInnerButtonDiv = [...document.querySelectorAll('div')].filter(el => el.innerHTML === 'Copy to Clipboard');
  let quordleCopyButton = quordleInnerButtonDiv[0].closest("button");
  quordleCopyButton.click();

  // create text area and paste from clipboard
  let textArea = document.createElement("textarea");
  textArea.setAttribute("id", "pasteArea");
  document.body.appendChild(textArea);
  textArea.focus();
  document.execCommand('paste');

  // Read value from text area and add to storage
  text = document.getElementById("pasteArea").value;
  chrome.storage.sync.set({ results: text }, function () {
    textArea.remove()
  });

  // get formatted results from storage and append to element and add to clipboard
  // todo - retrieve from storage.
  results = "my new results";
  let resultsTextArera = document.createElement("textarea");
  resultsTextArera.setAttribute("id", "results");
  document.body.appendChild(resultsTextArera);
  resultsTextArera.value = results
  resultsTextArera.focus();
  resultsTextArera.select();
  document.execCommand('copy');
}
// only background can access clipboard.
// only content scrpt can access tabs.
