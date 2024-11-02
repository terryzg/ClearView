// Check for browser support
if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    alert('Speech Recognition is not supported in this browser.');
}

// Initialize Speech Recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const userSpeech = event.results[0][0].transcript;
    handleUserInput(userSpeech);
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};

// Start listening for user input
function startListening() {
    recognition.start();
}

// Handle user input from speech
async function handleUserInput(userSpeech) {
    console.log("User said:", userSpeech);
    
    // Option 1: Basic keyword matching
    if (userSpeech.includes("dyslexia")) {
        enableDyslexiaFeatures();
    } else if (userSpeech.includes("low vision")) {
        enableVisionImpairmentFeatures();
    } else {
        // Option 2: AI NLP handling (e.g., OpenAI API)
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer YOUR_API_KEY', // Replace with your actual API key
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [{ "role": "user", "content": userSpeech }]
                })
            });
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            const data = await response.json();
            console.log("AI response:", data); // Log AI response for debugging
            interpretResponse(data.choices[0].message.content);
        } catch (error) {
            console.error("Error handling user input:", error);
        }
    }
}

// Interpret response from AI and apply features
function interpretResponse(response) {
    if (response.includes("dyslexia")) {
        enableDyslexiaFeatures();
    } else if (response.includes("low vision")) {
        enableVisionImpairmentFeatures();
    }
    // Add more interpretations as necessary
}

// Example functions to enable specific accessibility features
function enableDyslexiaFeatures() {
    document.body.style.fontFamily = "OpenDyslexic, Arial, sans-serif"; // Example dyslexia-friendly font
    document.body.style.lineHeight = "1.5"; // Adjust line height for better readability
}

function enableVisionImpairmentFeatures() {
    document.body.style.filter = "contrast(150%)"; // High contrast mode
}

// Event listener to start voice recognition on button click
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startListening);
});
