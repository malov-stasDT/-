const STORAGE_KEY = 'questportal-settings';

const defaults = {
    theme: 'dark',
    font: 'm',
    accent: 'red'
};

function loadSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return { ...defaults, ...saved };
    } catch (e) {
        return { ...defaults };
    }
}

function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function applySettings(settings) {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-font', settings.font);
    root.setAttribute('data-accent', settings.accent);
}

function updateSelectedButtons(settings) {
    document.querySelectorAll('.option-row').forEach(row => {
        const settingName = row.dataset.setting;
        row.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.value === settings[settingName]);
        });
    });
}

let toastTimer;
function showToast() {
    const toast = document.getElementById('saved-toast');
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

let currentSettings = loadSettings();

function initSettings() {
    applySettings(currentSettings);
    updateSelectedButtons(currentSettings);

    document.querySelectorAll('.option-row').forEach(row => {
        const settingName = row.dataset.setting;

        row.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSettings[settingName] = btn.dataset.value;
                applySettings(currentSettings);
                saveSettings(currentSettings);
                updateSelectedButtons(currentSettings);
                showToast();
            });
        });
    });
}

function resetSettings() {
    currentSettings = { ...defaults };
    applySettings(currentSettings);
    saveSettings(currentSettings);
    updateSelectedButtons(currentSettings);
    showToast();
}

initSettings();