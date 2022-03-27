/*----- Onclick Show  -----*/

chrome.action.onClicked.addListener(injectBackground);

function injectBackground() {
  chrome.tabs.executeScript(
    null,
    { file: "vendor/js/jquery.min.js" },
    function() {
      chrome.tabs.executeScript(null, { file: "popup.js" });
    }
  );
}
