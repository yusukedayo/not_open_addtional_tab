chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId !== 0) {
    return;
  }

  const tabId = details.tabId;
  const url = details.url;
  const tabs = await chrome.tabs.query({ url });

  if (tabs.length > 1) {
    const currentTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
    chrome.tabs.update(tabs[0].id, { active: true });
    chrome.tabs.remove(currentTab.id);
  }
});

