window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin) return;
  if (event.data && event.data.type === 'saveToken') {
    console.log('contentScript received token:', event.data.token); // Debug log
    chrome.runtime.sendMessage({
      type: 'saveToken',
      token: event.data.token
    });
  }
});