let activeModes = {
  colorblind: false,
  dyslexia: false,
  adhd: false,
  eyestrain: false,
  magnify: false,
};

document.getElementById('colorblindButton').addEventListener('click', toggleColorblindMode);
document.getElementById('dyslexiaButton').addEventListener('click', toggleDyslexiaMode);
document.getElementById('adhdButton').addEventListener('click', toggleADHDMode);
document.getElementById('eyestrainButton').addEventListener('click', toggleEyestrainMode);
document.getElementById('magnifyButton').addEventListener('click', toggleMagnifyMode);

function toggleColorblindMode() {
  activeModes.colorblind = !activeModes.colorblind;
  applyColorblindMode(activeModes.colorblind);
  updateButtonState('colorblindButton', activeModes.colorblind);
}

function updateButtonState(buttonId, isActive) {
  const button = document.getElementById(buttonId);
  if (isActive) {
    button.classList.add('active-button');
    button.classList.remove('inactive-button');
  } else {
    button.classList.remove('active-button');
    button.classList.add('inactive-button');
  }
}

function toggleDyslexiaMode() {
  activeModes.dyslexia = !activeModes.dyslexia;
  applyDyslexiaMode(activeModes.dyslexia);
  updateButtonState('dyslexiaButton', activeModes.dyslexia);
}

function toggleADHDMode() {
  activeModes.adhd = !activeModes.adhd;
  applyADHDMode(activeModes.adhd);
  updateButtonState('adhdButton', activeModes.adhd);
}

function toggleEyestrainMode() {
  activeModes.eyestrain = !activeModes.eyestrain;
  applyEyestrainMode(activeModes.eyestrain);
  updateButtonState('eyestrainButton', activeModes.eyestrain);
}

function toggleMagnifyMode() {
  activeModes.magnify = !activeModes.magnify;
  applyMagnifyMode(activeModes.magnify);
  updateButtonState('magnifyButton', activeModes.magnify); 
}

function applyColorblindMode(isActive) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (isActive) => {
        const existingStyle = document.getElementById('colorblindStyles');
        
        if (isActive) {
          if (!existingStyle) {
            const styles = `
              body {
                background-color: #FDF6E3 !important; /* Light beige background for better readability */
                color: #000000 !important; /* Black text for high contrast */
              }
              a {
                color: #005FCC !important; /* High-contrast blue for links */
                text-decoration: underline; /* Underline links for additional differentiation */
              }
              h1, h2, h3, h4, h5, h6, p, span, li {
                color: #2E3440 !important; /* Very dark color for main text */
                filter: contrast(1.5) brightness(1.1) !important; /* Enhance readability */
              }
              button, input, select {
                background-color: #FFFFFF !important; /* White background for buttons */
                color: #333333 !important; /* Dark text */
                border: 2px solid #005FCC !important; /* High-contrast blue border */
              }
              /* Additional styling for specific elements to ensure better accessibility */
              .alert, .error, .warning {
                color: #D7263D !important; /* High-contrast red for alerts */
                font-weight: bold !important;
              }
              .success {
                color: #4CAF50 !important; /* High-contrast green for success messages */
                font-weight: bold !important;
              }
            `;

            // Create and inject the style element
            const styleElement = document.createElement('style');
            styleElement.id = 'colorblindStyles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
            console.log("Applying Colorblind mode styles");
          }
        } else {
          if (existingStyle) {
            existingStyle.remove();
            console.log("Removing Colorblind mode styles");
          }
        }
      },
      args: [isActive],
    });
  });
}


function applyDyslexiaMode(isActive) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (isActive) => {
        if (isActive) {
          const fontStyles = `
              @font-face {
                  font-family: 'OpenDyslexic3';
                  src: url(${chrome.runtime.getURL('./assets/fonts/OpenDyslexic3-Bold.ttf')});
                  font-weight: bold;
              }
              @font-face {
                  font-family: 'OpenDyslexic3';
                  src: url(${chrome.runtime.getURL('./assets/fonts/OpenDyslexic3-Regular.ttf')});
                  font-weight: normal;
              }
              * {
                  font-family: 'OpenDyslexic3', Arial, sans-serif !important; 
                  font-size: 16px;
              }
              .highlight {
                  background-color: yellow;
              }
          `;
          const styleElement = document.createElement('style');
          styleElement.id = 'dyslexiaStyles';
          styleElement.textContent = fontStyles;
          document.head.appendChild(styleElement);

          const highlightText = (event) => {
            const target = event.target;
            
            if (target.nodeType === Node.ELEMENT_NODE && 
                (target.tagName === 'P' || target.tagName === 'SPAN' || 
                 target.tagName === 'H1' || target.tagName === 'H2' || 
                 target.tagName === 'H3' || target.tagName === 'H4' || 
                 target.tagName === 'H5' || target.tagName === 'H6' || 
                 target.tagName === 'LI')) {
              target.classList.add('highlight'); 
            }
          };

          const removeHighlight = (event) => {
            const target = event.target;
            if (target.classList.contains('highlight')) {
              target.classList.remove('highlight'); 
            }
          };

          document.body.addEventListener('mouseover', highlightText);
          document.body.addEventListener('mouseout', removeHighlight);
        } else {
          const existingStyle = document.getElementById('dyslexiaStyles');
          if (existingStyle) {
            existingStyle.remove();
          }
          document.body.removeEventListener('mouseover', highlightText);
          document.body.removeEventListener('mouseout', removeHighlight);
        }
      },
      args: [isActive],
    });
  });
}

function applyADHDMode(isActive) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (isActive) => {
              if (isActive) {
                  document.body.style.backgroundColor = '#E6E6FA';
                  document.body.style.color = '#000000';
                  const styleElement = document.createElement('style');
                  styleElement.id = 'adhdStyles';
                  styleElement.textContent = `
                      * {
                          font-family: Arial, sans-serif !important; 
                          line-height: 1.5 !important; 
                      }
                      .highlight {
                          background-color: #FFFFE0; 
                      }
                  `;
                  document.head.appendChild(styleElement);
                  highlightEveryThirdSentence();
              } else {
                  document.body.style.backgroundColor = '';
                  document.body.style.color = '';
                  const existingStyle = document.getElementById('adhdStyles');
                  if (existingStyle) {
                      existingStyle.remove();
                  }
                  const highlightedElements = document.querySelectorAll('.highlight');
                  highlightedElements.forEach(element => {
                      const parent = element.parentNode;
                      parent.replaceChild(document.createTextNode(element.innerText), element);
                  });
              }
          },
          args: [isActive],
      });
  });
}

function applyEyestrainMode(isActive) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (isActive) => {
        const applySofterDarkMode = () => {
          document.body.style.backgroundColor = '#A9A9A9'; 
          document.body.style.color = '#000000'; 
          const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li');
          allTextElements.forEach((element) => {
            element.style.color = '#000000'; 
            element.style.backgroundColor = 'transparent'; 
          });
        };
        const resetStyles = () => {
          document.body.style.backgroundColor = ''; 
          document.body.style.color = ''; 

          const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li');
          allTextElements.forEach((element) => {
            element.style.color = ''; 
            element.style.backgroundColor = ''; 
          });
        };
        if (isActive) {
          applySofterDarkMode();
          console.log("Applying softer Eyestrain mode styles");
        } else {
          resetStyles();
          console.log("Removing Eyestrain mode styles");
        }
      },
      args: [isActive],
    });
  });
}

function applyMagnifyMode(isActive) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (isActive) => {
        const existingStyle = document.getElementById('magnifyStyles');
        
        if (isActive) {
          if (!existingStyle) {
            const styles = `
              body {
                transform: scale(1.2); /* Scale the body to 120% */
                transform-origin: top left; /* Adjust origin for scaling */
                overflow: hidden; /* Prevent scrollbars from appearing */
              }
              
              /* Add styles for the actual scrolling area */
              html {
                overflow: auto; /* Allow the html element to scroll normally */
                height: auto; /* Ensure the height adjusts correctly */
              }
            `;
            const styleElement = document.createElement('style');
            styleElement.id = 'magnifyStyles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
          }
        } else {
          if (existingStyle) {
            existingStyle.remove();
          }
        }
      },
      args: [isActive],
    });
  });
}
