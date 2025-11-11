/**
 * Markdown Live Editor - Panel Toggle Module
 * Version: 0.1.0
 * Handles collapsing and expanding editor and preview panels
 */

const PanelToggle = {
    editorPanel: null,
    previewPanel: null,
    editorToggleBtn: null,
    previewToggleBtn: null,
    editorCollapsed: false,
    previewCollapsed: false,

    /**
     * Initialize panel toggle functionality
     */
    init() {
        // Get DOM elements
        this.editorPanel = document.querySelector('.editor-panel');
        this.previewPanel = document.querySelector('.preview-panel');
        this.editorToggleBtn = document.getElementById('toggle-editor');
        this.previewToggleBtn = document.getElementById('toggle-preview');

        if (!this.editorPanel || !this.previewPanel) {
            console.error('Editor or preview panel not found');
            return;
        }

        if (!this.editorToggleBtn || !this.previewToggleBtn) {
            console.error('Toggle buttons not found');
            return;
        }

        // Load saved state from localStorage
        this.loadState();

        // Setup event listeners
        this.setupEventListeners();

        // Apply initial state
        this.applyState();

        console.log('PanelToggle initialized');
    },

    /**
     * Setup event listeners for toggle buttons
     */
    setupEventListeners() {
        // Editor toggle button
        this.editorToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleEditor();
        });

        // Preview toggle button
        this.previewToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePreview();
        });

        // Click on collapsed panel header to expand it
        this.editorPanel.querySelector('.panel-header').addEventListener('click', (e) => {
            if (this.editorCollapsed && e.target !== this.editorToggleBtn) {
                this.toggleEditor();
            }
        });

        this.previewPanel.querySelector('.panel-header').addEventListener('click', (e) => {
            if (this.previewCollapsed && e.target !== this.previewToggleBtn) {
                this.togglePreview();
            }
        });
    },

    /**
     * Toggle editor panel collapsed/expanded state
     */
    toggleEditor() {
        // Prevent both panels from being collapsed
        if (this.previewCollapsed && !this.editorCollapsed) {
            Utils.showNotification('⚠ Al menos un panel debe estar visible', 2000);
            return;
        }

        this.editorCollapsed = !this.editorCollapsed;
        
        if (this.editorCollapsed) {
            this.editorPanel.classList.add('collapsed');
            this.previewPanel.classList.add('expanded');
            this.editorToggleBtn.innerHTML = '▼';
            this.editorToggleBtn.title = 'Expandir editor';
            this.previewCollapsed = false; // Ensure preview is not collapsed
        } else {
            this.editorPanel.classList.remove('collapsed');
            this.previewPanel.classList.remove('expanded');
            this.editorToggleBtn.innerHTML = '▲';
            this.editorToggleBtn.title = 'Colapsar editor';
        }

        // Save state
        this.saveState();

        // Sync scroll position if sync is enabled
        setTimeout(() => {
            if (Sync && Sync.isEnabled()) {
                Sync.syncPreviewFromEditor();
            }
        }, 300); // Wait for transition to complete

        // Dispatch event
        window.dispatchEvent(new CustomEvent('panelToggled', {
            detail: { 
                panel: 'editor', 
                collapsed: this.editorCollapsed 
            }
        }));
    },

    /**
     * Toggle preview panel collapsed/expanded state
     */
    togglePreview() {
        // Prevent both panels from being collapsed
        if (this.editorCollapsed && !this.previewCollapsed) {
            Utils.showNotification('⚠ Al menos un panel debe estar visible', 2000);
            return;
        }

        this.previewCollapsed = !this.previewCollapsed;
        
        if (this.previewCollapsed) {
            this.previewPanel.classList.add('collapsed');
            this.editorPanel.classList.add('expanded');
            this.previewToggleBtn.innerHTML = '▲';
            this.previewToggleBtn.title = 'Expandir vista previa';
            this.editorCollapsed = false; // Ensure editor is not collapsed
        } else {
            this.previewPanel.classList.remove('collapsed');
            this.editorPanel.classList.remove('expanded');
            this.previewToggleBtn.innerHTML = '▼';
            this.previewToggleBtn.title = 'Colapsar vista previa';
        }

        // Save state
        this.saveState();

        // Sync scroll position if sync is enabled
        setTimeout(() => {
            if (Sync && Sync.isEnabled()) {
                Sync.syncPreviewFromEditor();
            }
        }, 300); // Wait for transition to complete

        // Dispatch event
        window.dispatchEvent(new CustomEvent('panelToggled', {
            detail: { 
                panel: 'preview', 
                collapsed: this.previewCollapsed 
            }
        }));
    },

    /**
     * Expand editor panel
     */
    expandEditor() {
        if (this.editorCollapsed) {
            this.toggleEditor();
        }
    },

    /**
     * Expand preview panel
     */
    expandPreview() {
        if (this.previewCollapsed) {
            this.togglePreview();
        }
    },

    /**
     * Collapse editor panel
     */
    collapseEditor() {
        if (!this.editorCollapsed) {
            this.toggleEditor();
        }
    },

    /**
     * Collapse preview panel
     */
    collapsePreview() {
        if (!this.previewCollapsed) {
            this.togglePreview();
        }
    },

    /**
     * Save current state to localStorage
     */
    saveState() {
        try {
            const state = {
                editorCollapsed: this.editorCollapsed,
                previewCollapsed: this.previewCollapsed
            };
            localStorage.setItem('panelToggleState', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving panel toggle state:', error);
        }
    },

    /**
     * Load state from localStorage
     */
    loadState() {
        try {
            const saved = localStorage.getItem('panelToggleState');
            if (saved) {
                const state = JSON.parse(saved);
                this.editorCollapsed = state.editorCollapsed || false;
                this.previewCollapsed = state.previewCollapsed || false;
                
                // Prevent both from being collapsed
                if (this.editorCollapsed && this.previewCollapsed) {
                    this.editorCollapsed = false;
                    this.previewCollapsed = false;
                }
            }
        } catch (error) {
            console.error('Error loading panel toggle state:', error);
            this.editorCollapsed = false;
            this.previewCollapsed = false;
        }
    },

    /**
     * Apply current state to panels
     */
    applyState() {
        // Remove all classes first
        this.editorPanel.classList.remove('collapsed', 'expanded');
        this.previewPanel.classList.remove('collapsed', 'expanded');

        if (this.editorCollapsed) {
            this.editorPanel.classList.add('collapsed');
            this.previewPanel.classList.add('expanded');
            this.editorToggleBtn.innerHTML = '▼';
            this.editorToggleBtn.title = 'Expandir editor';
        } else {
            this.editorToggleBtn.innerHTML = '▲';
            this.editorToggleBtn.title = 'Colapsar editor';
        }

        if (this.previewCollapsed) {
            this.previewPanel.classList.add('collapsed');
            this.editorPanel.classList.add('expanded');
            this.previewToggleBtn.innerHTML = '▲';
            this.previewToggleBtn.title = 'Expandir vista previa';
        } else {
            this.previewToggleBtn.innerHTML = '▼';
            this.previewToggleBtn.title = 'Colapsar vista previa';
        }
    },

    /**
     * Reset to default state (both panels visible)
     */
    reset() {
        this.editorCollapsed = false;
        this.previewCollapsed = false;
        this.applyState();
        this.saveState();
    },

    /**
     * Get current state
     * @returns {Object} Current state
     */
    getState() {
        return {
            editorCollapsed: this.editorCollapsed,
            previewCollapsed: this.previewCollapsed,
            editorVisible: !this.editorCollapsed,
            previewVisible: !this.previewCollapsed
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PanelToggle;
}
