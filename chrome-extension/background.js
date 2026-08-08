// Makes the toolbar icon (and the Ctrl+Shift+S shortcut, via _execute_action)
// open the full-height side panel instead of a classic dropdown popup.
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error('DCPROSENS: failed to set side panel behavior', error));
