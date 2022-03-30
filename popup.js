// Initialize butotn with users's prefered color
let copyToClipboard = document.getElementById("copyToClipboard");

chrome.storage.sync.get("color", ({ color }) => {
  copyToClipboard.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
copyToClipboard.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  alert('test')
  chrome.storage.sync.get("clipboardText", ({ clipboardText }) => {
    alert(`clipboard text is ${clipboardText}`);
  });
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
