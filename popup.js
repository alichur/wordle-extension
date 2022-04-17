let copyButton = document.getElementById("copyButton");


// When the button is clicked, inject handleQurdle into current page
copyButton.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // let wordle = await chrome.tabs.create({ active: false, url: "https://www.nytimes.com/games/wordle/index.html" });
  // document.querySelector("game-app").shadowRoot.querySelector("game-stats").shadowRoot.querySelector("#share-button");

  let quordle = await chrome.tabs.create({ active: false, url: "https://www.quordle.com/#/" });
  let durdle = await chrome.tabs.create({ active: false, url: "https://zaratustra.itch.io/dordle" });
  //todo wait for page to load - this alert happens to fix this! Replace with await.
  alert("test")


  chrome.scripting.executeScript({
    target: { tabId: quordle.id },
    function: handleQurdle,
  });
  alert('waiting');
  chrome.scripting.executeScript({
    target: { tabId: durdle.id },
    function: handleDurdle,
  });

  //get values and add to clipboard via element.
  alert("wait until posting to clipboard")

  chrome.storage.sync.get('formatted', function (value) {
    let results = `${value['formatted']}`;
    let resultsTextArera = document.createElement("textarea");
    resultsTextArera.setAttribute("id", "results");
    document.body.appendChild(resultsTextArera);
    resultsTextArera.value = results
    resultsTextArera.focus();
    resultsTextArera.select();
    document.execCommand('copy');
  });
});

async function handleQurdle() {
  //copy quordle results to clipboard
  let quordleInnerButtonDiv = [...document.querySelectorAll('div')].filter(el => el.innerHTML === 'Copy to Clipboard');
  let quordleCopyButton = quordleInnerButtonDiv[0].closest("button");
  quordleCopyButton.click();

  // paste from clipboard and copy into storage
  let textArea = document.createElement("textarea");
  textArea.setAttribute("id", "pasteArea");
  document.body.appendChild(textArea);
  textArea.focus();
  document.execCommand('paste');
  text = document.getElementById("pasteArea").value;
  chrome.storage.sync.set({ quordle: text }, function () {
    textArea.remove()
  });
}

async function handleDurdle() {
  //copy durdle results to clipboard
  // document.getElementById("share").click()

  // paste from clipboard and copy into storage
  // let textArea = document.createElement("textarea");
  // textArea.setAttribute("id", "pasteArea2");
  // document.body.appendChild(textArea);
  // textArea.focus();
  // document.execCommand('paste');
  // text = document.getElementById("pasteArea2").value;
  chrome.storage.sync.set({ durdle: "durdle results here" }, function () {
    // textArea.remove()
  });
}
