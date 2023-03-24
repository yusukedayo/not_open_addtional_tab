document.getElementById("switch").addEventListener("click", switchToExistingTab);
document.getElementById("open").addEventListener("click", openInNewTab);

async function getCurrentTabUrl() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.url;
}

async function switchToExistingTab() {
  const url = await getCurrentTabUrl();
  const tabs = await chrome.tabs.query({ url });
  if (tabs.length > 1) {
    const currentTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
    chrome.tabs.update(tabs[0].id, { active: true });
    chrome.tabs.remove(currentTab.id);
    window.close();
  }
}

async function openInNewTab() {
  const url = await getCurrentTabUrl();
  chrome.tabs.create({ url });
  window.close();
}

