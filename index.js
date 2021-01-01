const rangeFontSize = document.getElementById('range-font-size');
const textFontSize = document.getElementById('text-font-size');
const buttonSwitchTheme = document.getElementById('button-switch-theme');
const selectPrimaryColor = document.getElementById('select-primary-color');

let darkMode = false;
let fontSize = 16;
let primaryColor = 'blue';

// AUTORUN

(function load() {
    darkMode = parseInt(localStorage.getItem('dark-mode')) == 1;
    fontSize = parseInt(localStorage.getItem('font-size')) || 16;
    primaryColor = localStorage.getItem('primary-color') || 'blue';
    loadConfig(defaultConfig);
    loadConfig(baseTheme);
    reloadFontSize();
    reloadPrimaryColor();
    reloadTheme();
})();

(function assignEvents() {
    rangeFontSize.addEventListener('change', changeFontSize);
    buttonSwitchTheme.addEventListener('click', switchTheme);
    selectPrimaryColor.addEventListener('change', changePrimaryColor);
})();

// INTERNAL

function reloadFontSize() {
    changeCSSVariable('--base-font-size', fontSize + 'px');
    rangeFontSize.value = fontSize;
    textFontSize.innerText = 'Base font size: ' + fontSize + 'px';
}

function reloadPrimaryColor() {
    modifyConfig(lightTheme, {
        '--base-color': 'var(--' + primaryColor + '-500)',
        '--base-color-1': 'var(--' + primaryColor + '-600)',
        '--base-color-2': 'var(--' + primaryColor + '-700)',
    });
    modifyConfig(darkTheme, {
        '--base-color': 'var(--' + primaryColor + '-500)',
        '--base-color-1': 'var(--' + primaryColor + '-400)',
        '--base-color-2': 'var(--' + primaryColor + '-300)',
    });
    const optionElems = document.querySelectorAll(
        '#' + selectPrimaryColor.id + ' > option');
    for (let i = 0; i < optionElems.length; i++)
        if (optionElems[i].value == primaryColor) {
            selectPrimaryColor.selectedIndex = i;
            break;
        }
}

function reloadTheme() {
    if (!darkMode)
        loadConfig(lightTheme);
    else
        loadConfig(darkTheme);
}

// EVENTS

function changeFontSize(event) {
    fontSize = event.target.value;
    localStorage.setItem('font-size', fontSize);
    reloadFontSize();
}

function switchTheme() {
    darkMode = !darkMode;
    localStorage.setItem('dark-mode', darkMode ? 1 : 0);
    reloadTheme();
}

function changePrimaryColor(event) {
    primaryColor = event.target.value;
    localStorage.setItem('primary-color', primaryColor);
    reloadPrimaryColor();
    reloadTheme();
}
