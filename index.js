// Elements
const rangeFontSize = document.getElementById('range-font-size');
const textFontSize = document.getElementById('text-font-size');
const selectPrimaryColor = document.getElementById('select-primary-color');
const selectTheme = document.getElementById('select-theme');

// Properties
const config = {
    fontSize: 16,
    primaryColor: 'blue',
    theme: 'system'
};

// Tasks
loadConfig(defaultConfig);
loadConfig(baseTheme);
loadPreviousSettings();
reloadFontSize();
reloadPrimaryColor();
reloadTheme();
setSystemThemeListener(reloadTheme);  // Track system theme change
assignEvents();

/**
 * General functions
 */

function loadPreviousSettings() {
    config.fontSize = parseInt(localStorage.getItem('font-size')) || 16;
    config.primaryColor = localStorage.getItem('primary-color') || 'blue';
    config.theme = localStorage.getItem('theme') || 'system';
}

function assignEvents() {
    rangeFontSize.addEventListener('change', changeFontSize);
    selectPrimaryColor.addEventListener('change', changePrimaryColor);
    selectTheme.addEventListener('change', changeTheme);
}

/**
 * Event handlers
 * - Update config to match element values
 * - Save new config to localStorage
 * - Reload UI
 */

function changeFontSize(event) {
    config.fontSize = event.target.value;
    localStorage.setItem('font-size', config.fontSize);
    reloadFontSize();
}

function changePrimaryColor(event) {
    config.primaryColor = event.target.value;
    localStorage.setItem('primary-color', config.primaryColor);
    reloadPrimaryColor();
    reloadTheme();  // Because active theme are modified, reload needed
}

function changeTheme(event) {
    config.theme = event.target.value;
    localStorage.setItem('theme', config.theme);
    reloadTheme();
}

/**
 * Update UI using config values
 * - Reload your-css internal
 * - Update on elements
 */

function reloadFontSize() {
    changeCSSVariable('--base-font-size', config.fontSize + 'px');
    rangeFontSize.value = config.fontSize;
    textFontSize.innerText = 'Base font size: ' + config.fontSize + 'px';
}

function reloadPrimaryColor() {
    setPrimaryColor(lightTheme, config.primaryColor);
    setPrimaryColor(darkTheme, config.primaryColor);
    selectOptionByValue(selectPrimaryColor, config.primaryColor);
}

function reloadTheme() {
    if (config.theme == 'light')
        loadConfig(lightTheme);
    else if (config.theme == 'dark')
        loadConfig(darkTheme);
    else
        loadConfig(isSystemThemeDark() ? darkTheme : lightTheme);
    selectOptionByValue(selectTheme, config.theme);
}

/**
 * Utils functions
 */

function selectOptionByValue(selectElem, optionValue) {
    const optionElems = document.querySelectorAll('#' + selectElem.id + ' > option');
    for (let i = 0; i < optionElems.length; i++)
        if (optionElems[i].value == optionValue) {
            selectElem.selectedIndex = i;
            break;
        }
}
