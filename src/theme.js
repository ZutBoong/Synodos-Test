// Theme Configuration
const themes = {
    light: {
        name: 'Light',
        background: '#ffffff',
        text: '#1e293b',
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#8b5cf6',
        border: '#e2e8f0'
    },
    dark: {
        name: 'Dark',
        background: '#0f172a',
        text: '#f8fafc',
        primary: '#60a5fa',
        secondary: '#94a3b8',
        accent: '#a78bfa',
        border: '#334155'
    }
};

let currentTheme = 'light';

function setTheme(themeName) {
    if (themes[themeName]) {
        currentTheme = themeName;
        applyTheme(themes[themeName]);
        localStorage.setItem('theme', themeName);
    }
}

function getTheme() {
    return themes[currentTheme];
}

function applyTheme(theme) {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
        if (key !== 'name') {
            root.style.setProperty('--color-' + key, value);
        }
    });
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved && themes[saved]) {
        setTheme(saved);
    }
}

module.exports = { themes, setTheme, getTheme, initTheme };
