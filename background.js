chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  let scriptContent;

  // Fetch script content based on the mode
  switch (request.mode) {
      case "adhd":
          scriptContent = await fetch(chrome.runtime.getURL("adhd.js")).then(res => res.text());
          break;
      case "dyslexia":
          scriptContent = await fetch(chrome.runtime.getURL("dyslexiafont.js")).then(res => res.text());
          break;
      case "eyestrain":
          scriptContent = await fetch(chrome.runtime.getURL("eyestrain.js")).then(res => res.text());
          break;
      case "magnify":
          scriptContent = await fetch(chrome.runtime.getURL("magnify.js")).then(res => res.text());
          break;
      case "colorblind":
          scriptContent = await fetch(chrome.runtime.getURL("colorblind.js")).then(res => res.text());
          break;
      default:
          console.error("Unknown mode:", request.mode);
          return;
  }

  // Inject the fetched script content as inline code
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
          chrome.tabs.executeScript(tabs[0].id, {
              code: scriptContent
          }, () => {
              if (chrome.runtime.lastError) {
                  console.error("Script injection failed:", chrome.runtime.lastError.message);
              } else {
                  console.log(`Script for mode "${request.mode}" injected successfully.`);
              }
          });
      }
  });
});
