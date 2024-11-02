let config = {
    darkMode: false   
};

function toggleDarkMode() {
    config.darkMode = !config.darkMode;
    if (config.darkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');  
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled'); 
    }
}

window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        config.darkMode = true;
        document.body.classList.add('dark-mode');
    }
});

document.querySelector('#dark-mode-toggle').addEventListener('click', toggleDarkMode);