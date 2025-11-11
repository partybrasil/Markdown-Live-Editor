/**
 * Markdown Live Editor - Storage Module
 * Version: 0.1.0
 * Handles localStorage operations for auto-save and settings
 */

const Storage = {
    // Storage keys
    keys: {
        CONTENT: 'markdown-editor-content',
        THEME: 'markdown-editor-theme',
        TEXT_COLOR: 'markdown-editor-text-color',
        SYNC_SCROLL: 'markdown-editor-sync-scroll'
    },

    /**
     * Check if localStorage is available
     * @returns {boolean} True if localStorage is supported
     */
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Save content to localStorage
     * @param {string} content - Content to save
     * @returns {boolean} Success status
     */
    saveContent(content) {
        if (!this.isAvailable()) return false;
        
        try {
            localStorage.setItem(this.keys.CONTENT, content);
            return true;
        } catch (e) {
            console.error('Failed to save content:', e);
            return false;
        }
    },

    /**
     * Load content from localStorage
     * @returns {string|null} Saved content or null
     */
    loadContent() {
        if (!this.isAvailable()) return null;
        
        try {
            return localStorage.getItem(this.keys.CONTENT);
        } catch (e) {
            console.error('Failed to load content:', e);
            return null;
        }
    },

    /**
     * Clear saved content
     * @returns {boolean} Success status
     */
    clearContent() {
        if (!this.isAvailable()) return false;
        
        try {
            localStorage.removeItem(this.keys.CONTENT);
            return true;
        } catch (e) {
            console.error('Failed to clear content:', e);
            return false;
        }
    },

    /**
     * Save theme preference
     * @param {string} theme - Theme name
     * @returns {boolean} Success status
     */
    saveTheme(theme) {
        if (!this.isAvailable()) return false;
        
        try {
            localStorage.setItem(this.keys.THEME, theme);
            return true;
        } catch (e) {
            console.error('Failed to save theme:', e);
            return false;
        }
    },

    /**
     * Load theme preference
     * @returns {string|null} Saved theme or null
     */
    loadTheme() {
        if (!this.isAvailable()) return null;
        
        try {
            return localStorage.getItem(this.keys.THEME);
        } catch (e) {
            console.error('Failed to load theme:', e);
            return null;
        }
    },

    /**
     * Save text color preference
     * @param {string} color - Color class name
     * @returns {boolean} Success status
     */
    saveTextColor(color) {
        if (!this.isAvailable()) return false;
        
        try {
            localStorage.setItem(this.keys.TEXT_COLOR, color);
            return true;
        } catch (e) {
            console.error('Failed to save text color:', e);
            return false;
        }
    },

    /**
     * Load text color preference
     * @returns {string|null} Saved color or null
     */
    loadTextColor() {
        if (!this.isAvailable()) return null;
        
        try {
            return localStorage.getItem(this.keys.TEXT_COLOR);
        } catch (e) {
            console.error('Failed to load text color:', e);
            return null;
        }
    },

    /**
     * Save sync scroll preference
     * @param {boolean} enabled - Sync scroll enabled state
     * @returns {boolean} Success status
     */
    saveSyncScroll(enabled) {
        if (!this.isAvailable()) return false;
        
        try {
            localStorage.setItem(this.keys.SYNC_SCROLL, enabled.toString());
            return true;
        } catch (e) {
            console.error('Failed to save sync scroll:', e);
            return false;
        }
    },

    /**
     * Load sync scroll preference
     * @returns {boolean} Saved preference or true (default)
     */
    loadSyncScroll() {
        if (!this.isAvailable()) return true;
        
        try {
            const value = localStorage.getItem(this.keys.SYNC_SCROLL);
            return value === null ? true : value === 'true';
        } catch (e) {
            console.error('Failed to load sync scroll:', e);
            return true;
        }
    },

    /**
     * Clear all stored data
     * @returns {boolean} Success status
     */
    clearAll() {
        if (!this.isAvailable()) return false;
        
        try {
            Object.values(this.keys).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (e) {
            console.error('Failed to clear all data:', e);
            return false;
        }
    },

    /**
     * Get storage usage information
     * @returns {Object} Storage info {used, total, available}
     */
    getStorageInfo() {
        if (!this.isAvailable()) {
            return { used: 0, total: 0, available: 0 };
        }

        try {
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length + key.length;
                }
            }

            return {
                used: total,
                // Most browsers allow ~5-10MB
                total: 5 * 1024 * 1024, // 5MB estimate
                available: (5 * 1024 * 1024) - total
            };
        } catch (e) {
            console.error('Failed to get storage info:', e);
            return { used: 0, total: 0, available: 0 };
        }
    },

    /**
     * Export all settings as JSON
     * @returns {string} JSON string of all settings
     */
    exportSettings() {
        const settings = {
            theme: this.loadTheme(),
            textColor: this.loadTextColor(),
            syncScroll: this.loadSyncScroll()
        };
        return JSON.stringify(settings, null, 2);
    },

    /**
     * Import settings from JSON
     * @param {string} jsonString - JSON string of settings
     * @returns {boolean} Success status
     */
    importSettings(jsonString) {
        try {
            const settings = JSON.parse(jsonString);
            
            if (settings.theme) this.saveTheme(settings.theme);
            if (settings.textColor) this.saveTextColor(settings.textColor);
            if (typeof settings.syncScroll === 'boolean') {
                this.saveSyncScroll(settings.syncScroll);
            }
            
            return true;
        } catch (e) {
            console.error('Failed to import settings:', e);
            return false;
        }
    }
};

// Auto-save functionality
let autoSaveTimeout = null;

/**
 * Schedule auto-save with debouncing
 * @param {string} content - Content to save
 * @param {number} delay - Delay in milliseconds (default 1000ms)
 */
function scheduleAutoSave(content, delay = 1000) {
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    autoSaveTimeout = setTimeout(() => {
        if (Storage.saveContent(content)) {
            Utils.showNotification('✓ Guardado', 1500);
        }
    }, delay);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Storage, scheduleAutoSave };
}
