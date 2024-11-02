if (!window.zoomLevel) {
    window.zoomLevel = 100;
}

function updateZoom(level) {
    window.zoomLevel = level;
    document.body.style.zoom = window.zoomLevel + '%';
    
    const msg = new SpeechSynthesisUtterance(`Zoom level is now ${window.zoomLevel} percent.`);
    window.speechSynthesis.speak(msg);
}

function increaseZoom() {
    if (window.zoomLevel < 200) {
        updateZoom(window.zoomLevel + 25);
    }
}

function decreaseZoom() {
    if (window.zoomLevel > 25) {
        updateZoom(window.zoomLevel - 25);
    }
}

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;

function startListening() {
    recognition.start();

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();

        if (command.includes('zoom in')) {
            increaseZoom();
        } else if (command.includes('zoom out')) {
            decreaseZoom();
        } else {
            const msg = new SpeechSynthesisUtterance("I didn't understand that command. Please say 'zoom in' or 'zoom out'.");
            window.speechSynthesis.speak(msg);
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        const msg = new SpeechSynthesisUtterance("There was an error with the speech recognition. Please try again.");
        window.speechSynthesis.speak(msg);
    };
}

window.addEventListener('load', () => {
    startListening();
});

increaseZoom();