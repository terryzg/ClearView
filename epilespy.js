let epilepsySafeMode = true;

function disableFlashingContent() {
    if (epilepsySafeMode) {
        const flashingElements = document.querySelectorAll('.flashing, .flickering, .blink, [style*="animation"]');
        
        flashingElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';

            const inlineStyle = el.getAttribute('style');
            if (inlineStyle && /animation|transition|blink/.test(inlineStyle)) {
                el.setAttribute('style', inlineStyle.replace(/animation|transition|blink/g, 'none'));
            }
        });

        const animatedElements = document.querySelectorAll('*');
        animatedElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            const animationDuration = parseFloat(computedStyle.animationDuration);
            
            if (animationDuration > 0 && animationDuration < 0.5) {
                el.style.animation = 'none';
            }
        });
    }
}

chrome.storage.sync.get(['epilepsySafeMode'], result => {
    epilepsySafeMode = result.epilepsySafeMode ?? true;
    disableFlashingContent();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleEpilepsySafeMode') {
        epilepsySafeMode = request.epilepsySafeMode;
        disableFlashingContent();

        chrome.storage.sync.set({ epilepsySafeMode });
        sendResponse({ status: 'Epilepsy-safe mode updated' });
    }
});
