// ✅ background.js (Manifest V3)

let currentTabId = null;
let currentUrl = null;
let startTime = null;

// Get token from chrome storage
const getToken = () =>
  new Promise((resolve) => {
    chrome.storage.local.get(['jwtToken'], (result) => {
      if (result.jwtToken) {
        resolve(result.jwtToken);
      } else {
        console.warn('⚠️ No token found in chrome.storage.local');
        resolve(null);
      }
    });
  });

const sendActivityToBackend = async (url, timeSpent, category = 'Uncategorized') => {
  const token = await getToken();
  console.log('Token used for activity:', token); // Add this line
  if (!token) return;

  try {
    await fetch('http://localhost:5000/api/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url, timeSpent, category })
    });
    console.log('✅ Activity sent:', url, timeSpent);
  } catch (error) {
    console.error('❌ Error sending activity:', error);
  }
};

const handleTabChange = async (tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    const endTime = Date.now();
    if (currentUrl && startTime) {
      const timeSpent = Math.floor((endTime - startTime) / 1000);
      await sendActivityToBackend(currentUrl, timeSpent);
    }
    currentUrl = changeInfo.url;
    startTime = Date.now();
  }
};

chrome.tabs.onUpdated.addListener(handleTabChange);

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  const endTime = Date.now();
  if (currentUrl && startTime) {
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    await sendActivityToBackend(currentUrl, timeSpent);
  }
  currentUrl = tab.url;
  startTime = Date.now();
});

// ✅ Listen for token from frontend
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'saveToken') {
    console.log('background.js received token:', message.token); // <-- Add this line
    chrome.storage.local.set({ jwtToken: message.token }, () => {
      console.log('✅ Token saved in chrome.storage.local');
      sendResponse({ status: 'ok' });
    });
    return true;
  }
});
