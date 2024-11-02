let config = {
    minWordLength: 4,
    minTextLength: 20,
    boldRatio: 0.4,
    doAdhd: true,
    fontSize: '1em',                  
};

function setFontSize(size) {
    document.body.style.fontSize = size;
}

function toggleAdhdBackground() {
    if (config.adhdBackground) {
        document.body.classList.add('adhd-background');
    } else {
        document.body.classList.remove('adhd-background');
    }
}

const insertTextBefore = (text, node, bold) => {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(text));

    if (bold) {
        span.className = 'bread';
    }
    node.parentNode.insertBefore(span, node);
};

const processNode = root => {
    let walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
            return (
                node.parentNode.nodeName !== 'INPUT' &&
                node.parentNode.nodeName !== 'NOSCRIPT' &&
                node.parentNode.nodeName !== 'SCRIPT' &&
                node.parentNode.nodeName !== 'STYLE' &&
                node.parentNode.nodeName !== 'TEXTAREA' &&
                node.parentNode.nodeName !== 'TITLE' &&
                node.parentNode.nodeName !== 'OPTION' &&
                (node.parentNode.nodeName === 'A' ||
                node.parentNode.nodeName === 'EM' ||
                node.parentNode.nodeName === 'STRONG' ||
                node.nodeValue.length >= config.minTextLength)
            ) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });

    let node;
    while (node = walker.nextNode()) {
        let text = node.nodeValue;
        let wStart = -1, wLen = 0, eng = null;

        for (let i = 0; i <= text.length; i++) {
            let cEng = i < text.length ? /[\p{Letter}\p{Mark}]/u.test(text[i]) : false;

            if (i === text.length || eng !== cEng) {
                if (eng && wLen >= config.minWordLength) {
                    let word = text.substring(wStart, wStart + wLen);
                    let numBold = Math.ceil(word.length * config.boldRatio);
                    insertTextBefore(word.substring(0, numBold), node, true);
                    insertTextBefore(word.substring(numBold), node, false);
                } else if (wLen > 0) {
                    insertTextBefore(text.substring(wStart, wStart + wLen), node, false);
                }
                wStart = i;
                wLen = 1;
                eng = cEng;
            } else {
                wLen++;
            }
        }

        node.nodeValue = '';
    }
};

function applyAccessibilitySettings() {
    setFontSize(config.fontSize);
    toggleColorblindMode();
    toggleDyslexiaFont();

    if (config.doAdhd) {
        let node = document.querySelector('body');
        processNode(node);
    }
}

document.head.appendChild(document.createElement('style')).textContent = `
    .bread {
        display: contents !important;
        font-weight: bold !important;
    }
    .colorblind-friendly {
        background-color: #EAEAEA;
        color: #000000;
    }
`;

applyAccessibilitySettings();