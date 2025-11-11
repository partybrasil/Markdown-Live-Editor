/**
 * Markdown Live Editor - Main Application
 * Version: 0.1.0
 * Main initialization and orchestration
 */

// Main application object
const App = {
    version: '0.1.0',
    initialized: false,

    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) {
            console.warn('App already initialized');
            return;
        }

        console.log(`Initializing Markdown Live Editor v${this.version}`);

        // Check browser compatibility
        if (!this.checkCompatibility()) {
            this.showCompatibilityError();
            return;
        }

        // Initialize modules in order
        this.initializeModules();

        // Setup global event listeners
        this.setupGlobalListeners();

        // Mark as initialized
        this.initialized = true;

        console.log('Markdown Live Editor initialized successfully');
    },

    /**
     * Check browser compatibility
     * @returns {boolean} True if browser is compatible
     */
    checkCompatibility() {
        // Check for required APIs
        const required = [
            'localStorage' in window,
            'FileReader' in window,
            'Blob' in window,
            'URL' in window && 'createObjectURL' in URL,
            typeof marked !== 'undefined',
            typeof DOMPurify !== 'undefined'
        ];

        return required.every(check => check);
    },

    /**
     * Show compatibility error message
     */
    showCompatibilityError() {
        const message = `
            <div style="padding: 2rem; text-align: center; max-width: 600px; margin: 2rem auto;">
                <h2>⚠️ Navegador no compatible</h2>
                <p style="margin: 1rem 0;">
                    Tu navegador no soporta todas las características necesarias para ejecutar esta aplicación.
                </p>
                <p style="margin: 1rem 0;">
                    Por favor, utiliza una versión reciente de:
                </p>
                <ul style="list-style: none; padding: 0;">
                    <li>• Google Chrome (versión 90+)</li>
                    <li>• Mozilla Firefox (versión 88+)</li>
                    <li>• Microsoft Edge (versión 90+)</li>
                    <li>• Safari (versión 14+)</li>
                </ul>
            </div>
        `;
        document.body.innerHTML = message;
    },

    /**
     * Initialize all modules
     */
    initializeModules() {
        // 1. Initialize themes (applies saved theme)
        Themes.init();

        // 2. Initialize preview
        Preview.init('markdown-preview');

        // 3. Initialize editor with preview update callback
        Editor.init('markdown-input', (content) => {
            Preview.update(content);
        });

        // 4. Initialize toolbar with editor
        Toolbar.init(Editor.getElement());

        // 5. Initialize export functionality
        Export.init();

        // 6. Initialize image handler
        ImageHandler.init(Editor.getElement());

        // 7. Initialize scroll sync
        Sync.init(Editor.getElement(), Preview.getElement());

        // 8. Initialize panel toggle
        PanelToggle.init();

        // 9. Setup clear button
        this.setupClearButton();
    },

    /**
     * Setup clear content button
     */
    setupClearButton() {
        const clearBtn = document.getElementById('clear-content');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que quieres limpiar todo el contenido?')) {
                    Editor.clear();
                    Preview.clear();
                }
            });
        }
    },

    /**
     * Setup global event listeners
     */
    setupGlobalListeners() {
        // Listen for theme changes
        window.addEventListener('themeChanged', (e) => {
            console.log('Theme changed to:', e.detail.theme);
        });

        // Listen for preview updates
        window.addEventListener('previewUpdated', (e) => {
            // Can add analytics or other tracking here
        });

        // Handle visibility change (page hidden/visible)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Page became visible - could refresh content or check for updates
                console.log('Page visible');
            } else {
                // Page hidden - good time to save
                const content = Editor.getContent();
                if (content) {
                    Storage.saveContent(content);
                }
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            Utils.showNotification('✓ Conexión restaurada', 2000);
        });

        window.addEventListener('offline', () => {
            Utils.showNotification('⚠ Sin conexión - trabajando offline', 3000);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S to save/export
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                Export.exportAsMarkdown();
            }

            // Ctrl/Cmd + P to export as HTML
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                Export.exportAsHTML();
            }

            // Esc to clear selection
            if (e.key === 'Escape') {
                const editor = Editor.getElement();
                if (editor && document.activeElement === editor) {
                    editor.selectionStart = editor.selectionEnd;
                }
            }
        });
    },

    /**
     * Get app information
     * @returns {Object} App info
     */
    getInfo() {
        return {
            version: this.version,
            initialized: this.initialized,
            modules: {
                storage: Storage.isAvailable(),
                themes: Themes.themes.length,
                editor: !!Editor.getElement(),
                preview: !!Preview.getElement()
            },
            storage: Storage.getStorageInfo()
        };
    },

    /**
     * Reset application to default state
     */
    reset() {
        if (confirm('¿Estás seguro de que quieres restablecer la aplicación? Se perderán todos los datos.')) {
            Storage.clearAll();
            Editor.clear();
            Preview.clear();
            Themes.resetTheme();
            Sync.enable();
            Utils.showNotification('✓ Aplicación restablecida', 2000);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    },

    /**
     * Show about dialog
     */
    showAbout() {
        alert(`Markdown Live Editor v${this.version}

Un editor Markdown moderno con vista previa en tiempo real.

Características:
• Vista previa sincronizada en tiempo real
• 21 temas personalizables
• Exportación MD/HTML
• Auto-guardado local
• Drag & drop de imágenes
• Atajos de teclado

Desarrollado con ❤️ para la comunidad

GitHub: github.com/partybrasil/Markdown-Live-Editor`);
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    // DOM already loaded
    App.init();
}

// Expose App object globally for debugging
window.MarkdownLiveEditor = App;

// Add console message
console.log('%cMarkdown Live Editor', 'font-size: 20px; font-weight: bold; color: #3498db;');
console.log('%cv' + App.version, 'font-size: 14px; color: #666;');
console.log('%cDesarrollado para la comunidad', 'font-size: 12px; color: #999;');
console.log('%cGitHub: https://github.com/partybrasil/Markdown-Live-Editor', 'font-size: 12px; color: #3498db;');

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
