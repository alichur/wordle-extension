let copyButton = document.getElementById("copyButton");


// When the button is clicked, inject copyToClipboard into current page
copyButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyToClipboard,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function copyToClipboard() {
  alert('test')
  chrome.storage.sync.get("clipboardText", ({ clipboardText }) => {
    alert(`clipboard text is ${clipboardText}`);
  });

}
