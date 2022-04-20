// For each game, open a new tab and click the share button.
// Paste from the clipboard into a temporary element, then save the value from this element into chrome storage.
// Finally, results from storage are formatted into a single string, added to another temporary element, then copied into the user's clipboard.

let copyButton = document.getElementById("copyButton");



copyButton.addEventListener("click", async () => {
  let wordle = "https://www.nytimes.com/games/wordle/index.html";
  let quordle = await chrome.tabs.create({ active: false, url: "https://www.quordle.com/#/" });
  let durdle = await chrome.tabs.create({ active: false, url: "https://zaratustra.itch.io/dordle" });
  let octordle = await chrome.tabs.create({ active: false, url: "https://octordle.com/?mode=daily" });

  // wait for page to load. Can't look for share button we can't tell between dialog not loading due to time, or due to puzzle being incomplete.
  await new Promise(resolve => setTimeout(resolve, 1000));

  chrome.scripting.executeScript({
    target: { tabId: quordle.id },
    function: handleQurdle,
  });

  chrome.scripting.executeScript({
    target: { tabId: durdle.id },
    function: handleDurdle,
  });

  chrome.scripting.executeScript({
    target: { tabId: octordle.id },
    function: handleOctordle,
  });

  await new Promise(resolve => setTimeout(resolve, 1000));

  chrome.storage.sync.get(['quordle', 'octordle'], function (resultArray) {
    let summary = resultArray['octordle'] + resultArray['quordle'];
    let resultsTextArera = document.createElement("textarea");
    resultsTextArera.setAttribute("id", "results");
    document.body.appendChild(resultsTextArera);
    resultsTextArera.value = summary;
    resultsTextArera.focus();
    resultsTextArera.select();
    document.execCommand('copy');

    chrome.tabs.remove([octordle.id, quordle.id, durdle.id]);
    window.close();
  });
});

async function handleQurdle() {
  let qurodle = "https://www.quordle.com/#/";

  function getFormattedQuordle(fullQuordleString) {
    return fullQuordleString.includes('quordle.com') ? fullQuordleString.split('quordle.com')[0] : qurodle;
  };

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
  let updatedText = getFormattedQuordle(text);
  chrome.storage.sync.set({ quordle: updatedText }, function () {
    textArea.remove()
  });
}

async function handleDurdle() {
  let durdle = "https://zaratustra.itch.io/dordle";
  function getFormattedDurdle(fullDurdleString) {
    return fullDurdleString.includes('7') ? fullDurdleString.split('7')[0] : durdle;
  };

  // document.getElementById("game_drop").contentWindow.document
  //copy durdle results to clipboard
  let button = document.getElementById("share");
  // document.getElementById("game_drop")
  button.click();

  // paste from clipboard and copy into storage
  let textArea = document.createElement("textarea");
  textArea.setAttribute("id", "pasteArea2");
  document.body.appendChild(textArea);
  textArea.focus();
  document.execCommand('paste');
  text = document.getElementById("pasteArea2").value;
  text = getFormattedDurdle(text);
  chrome.storage.sync.set({ durdle: text }, function () {
    textArea.remove()
  });
}

async function handleOctordle() {
  let octordle = "https://octordle.com/?mode=daily";
  function getFormattedOctordle(fullOctordleString) {
    return fullOctordleString.includes('octordle.com') ? fullOctordleString.split('octordle.com')[0] : octordle;
  };

  document.getElementById("share_clipboard").click();

  // paste from clipboard and copy into storage
  let textArea = document.createElement("textarea");
  textArea.setAttribute("id", "pasteArea3");
  document.body.appendChild(textArea);
  textArea.focus();
  document.execCommand('paste');
  text = document.getElementById("pasteArea3").value;
  text = getFormattedOctordle(text);
  chrome.storage.sync.set({ octordle: text }, function () {
    textArea.remove()
  });
}