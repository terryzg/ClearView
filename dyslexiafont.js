(() => {
    
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
    styleElement.id = 'custom-font-style';
    styleElement.textContent = fontStyles;
    document.head.appendChild(styleElement);

    const highlightText = (event) => {
        const target = event.target;
        if (target && target.nodeType === Node.TEXT_NODE) {
            target.parentElement.classList.add('highlight');
        } else if (target.nodeType === Node.ELEMENT_NODE) {
            target.classList.add('highlight');
        }
    };

    const removeHighlight = (event) => {
        const target = event.target;
        if (target && (target.nodeType === Node.TEXT_NODE || target.nodeType === Node.ELEMENT_NODE)) {
            target.classList.remove('highlight');
        }
    };

    document.body.addEventListener('mouseover', highlightText);
    document.body.addEventListener('mouseout', removeHighlight);

})();
