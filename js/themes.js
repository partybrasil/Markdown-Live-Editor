/**
 * Markdown Live Editor - Themes Module
 * Version: 0.1.0
 * Handles theme switching and text color cycling
 */

const Themes = {
    // Available themes
    themes: [
        'light', 'dark', 'solarized-light', 'solarized-dark',
        'nord', 'dracula', 'one-dark', 'atom-light', 'monokai',
        'gruvbox-light', 'gruvbox-dark', 'ocean', 'forest',
        'sunset', 'cyberpunk', 'minimal', 'pastel',
        'high-contrast', 'terminal', 'twilight', 'github'
    ],

    // Text color cycle
    textColors: [
        'text-color-black',
        'text-color-gray',
        'text-color-blue',
        'text-color-green',
        'text-color-red'
    ],

    currentTheme: 'light',
    currentTextColorIndex: 0,

    /**
     * Initialize themes module
     */
    init() {
        // Load saved theme
        const savedTheme = Storage.loadTheme();
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.applyTheme(savedTheme);
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.applyTheme('dark');
            }
        }

        // Load saved text color
        const savedColor = Storage.loadTextColor();
        if (savedColor && this.textColors.includes(savedColor)) {
            const index = this.textColors.indexOf(savedColor);
            this.currentTextColorIndex = index;
            this.applyTextColor(savedColor);
        }

        // Setup event listeners
        this.setupEventListeners();

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if no theme is explicitly set
                if (!Storage.loadTheme()) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    },

    /**
     * Setup event listeners for theme controls
     */
    setupEventListeners() {
        const themeSelector = document.getElementById('theme-selector');
        const colorCycleBtn = document.getElementById('color-cycle');

        if (themeSelector) {
            themeSelector.value = this.currentTheme;
            themeSelector.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
            });
        }

        if (colorCycleBtn) {
            colorCycleBtn.addEventListener('click', () => {
                this.cycleTextColor();
            });
        }
    },

    /**
     * Apply theme to the page
     * @param {string} theme - Theme name
     */
    applyTheme(theme) {
        if (!this.themes.includes(theme)) {
            console.warn(`Theme "${theme}" not found. Using default.`);
            theme = 'light';
        }

        const html = document.documentElement;
        
        // Remove all theme classes
        this.themes.forEach(t => {
            html.classList.remove(`theme-${t}`);
        });

        // Apply new theme
        if (theme !== 'light') {
            html.classList.add(`theme-${theme}`);
        }

        this.currentTheme = theme;

        // Update selector
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.value = theme;
        }

        // Save preference
        Storage.saveTheme(theme);

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme } 
        }));
    },

    /**
     * Get current theme
     * @returns {string} Current theme name
     */
    getCurrentTheme() {
        return this.currentTheme;
    },

    /**
     * Cycle to next text color
     */
    cycleTextColor() {
        this.currentTextColorIndex = (this.currentTextColorIndex + 1) % this.textColors.length;
        const color = this.textColors[this.currentTextColorIndex];
        this.applyTextColor(color);
    },

    /**
     * Apply text color class
     * @param {string} colorClass - Color class name
     */
    applyTextColor(colorClass) {
        const html = document.documentElement;

        // Remove all text color classes
        this.textColors.forEach(c => {
            html.classList.remove(c);
        });

        // Apply new color
        html.classList.add(colorClass);

        // Save preference
        Storage.saveTextColor(colorClass);

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('textColorChanged', { 
            detail: { color: colorClass } 
        }));
    },

    /**
     * Get current text color
     * @returns {string} Current text color class
     */
    getCurrentTextColor() {
        return this.textColors[this.currentTextColorIndex];
    },

    /**
     * Reset to default theme
     */
    resetTheme() {
        this.applyTheme('light');
        this.currentTextColorIndex = 0;
        this.applyTextColor(this.textColors[0]);
    },

    /**
     * Get theme list for UI
     * @returns {Array} Array of theme objects with name and display name
     */
    getThemeList() {
        return this.themes.map(theme => ({
            value: theme,
            label: this.formatThemeName(theme)
        }));
    },

    /**
     * Format theme name for display
     * @param {string} theme - Theme name
     * @returns {string} Formatted display name
     */
    formatThemeName(theme) {
        return theme
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    /**
     * Check if theme is dark
     * @param {string} theme - Theme name (optional, uses current if not provided)
     * @returns {boolean} True if theme is dark
     */
    isDark(theme = this.currentTheme) {
        const darkThemes = [
            'dark', 'solarized-dark', 'nord', 'dracula', 'one-dark',
            'monokai', 'gruvbox-dark', 'ocean', 'forest', 'sunset',
            'cyberpunk', 'high-contrast', 'terminal', 'twilight'
        ];
        return darkThemes.includes(theme);
    },

    /**
     * Get recommended text color for theme
     * @param {string} theme - Theme name
     * @returns {string} Recommended color class
     */
    getRecommendedTextColor(theme) {
        if (this.isDark(theme)) {
            return 'text-color-gray';
        }
        return 'text-color-black';
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Themes;
}
