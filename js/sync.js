/**
 * Markdown Live Editor - Sync Module
 * Version: 0.1.0
 * Handles synchronized scrolling between editor and preview
 */

const Sync = {
    editor: null,
    preview: null,
    enabled: true,
    isScrolling: false,
    scrollTimeout: null,

    /**
     * Initialize sync functionality
     * @param {HTMLTextAreaElement} editorElement - Editor textarea
     * @param {HTMLElement} previewElement - Preview element
     */
    init(editorElement, previewElement) {
        this.editor = editorElement;
        this.preview = previewElement;

        if (!this.editor || !this.preview) {
            console.error('Editor or preview element not provided');
            return;
        }

        // Load sync preference
        this.enabled = Storage.loadSyncScroll();

        this.setupEventListeners();
        this.updateToggleButton();
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Toggle button
        const toggleBtn = document.getElementById('sync-scroll-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggle();
            });
        }

        // Editor scroll
        this.editor.addEventListener('scroll', Utils.throttle(() => {
            if (this.enabled && !this.isScrolling) {
                this.syncPreviewFromEditor();
            }
        }, 50));

        // Preview scroll
        this.preview.addEventListener('scroll', Utils.throttle(() => {
            if (this.enabled && !this.isScrolling) {
                this.syncEditorFromPreview();
            }
        }, 50));
    },

    /**
     * Sync preview scroll position from editor
     */
    syncPreviewFromEditor() {
        if (!this.enabled) return;

        this.isScrolling = true;

        const editorScrollPercentage = this.getEditorScrollPercentage();
        this.setPreviewScrollPercentage(editorScrollPercentage);

        // Reset scrolling flag after a short delay
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    },

    /**
     * Sync editor scroll position from preview
     */
    syncEditorFromPreview() {
        if (!this.enabled) return;

        this.isScrolling = true;

        const previewScrollPercentage = this.getPreviewScrollPercentage();
        this.setEditorScrollPercentage(previewScrollPercentage);

        // Reset scrolling flag after a short delay
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    },

    /**
     * Get editor scroll percentage
     * @returns {number} Scroll percentage (0-100)
     */
    getEditorScrollPercentage() {
        if (!this.editor) return 0;

        const scrollTop = this.editor.scrollTop;
        const scrollHeight = this.editor.scrollHeight;
        const clientHeight = this.editor.clientHeight;

        if (scrollHeight <= clientHeight) return 0;

        return (scrollTop / (scrollHeight - clientHeight)) * 100;
    },

    /**
     * Get preview scroll percentage
     * @returns {number} Scroll percentage (0-100)
     */
    getPreviewScrollPercentage() {
        if (!this.preview) return 0;

        const scrollTop = this.preview.scrollTop;
        const scrollHeight = this.preview.scrollHeight;
        const clientHeight = this.preview.clientHeight;

        if (scrollHeight <= clientHeight) return 0;

        return (scrollTop / (scrollHeight - clientHeight)) * 100;
    },

    /**
     * Set editor scroll percentage
     * @param {number} percentage - Scroll percentage (0-100)
     */
    setEditorScrollPercentage(percentage) {
        if (!this.editor) return;

        const scrollHeight = this.editor.scrollHeight;
        const clientHeight = this.editor.clientHeight;
        const maxScroll = scrollHeight - clientHeight;

        const scrollTop = (percentage / 100) * maxScroll;
        this.editor.scrollTop = scrollTop;
    },

    /**
     * Set preview scroll percentage
     * @param {number} percentage - Scroll percentage (0-100)
     */
    setPreviewScrollPercentage(percentage) {
        if (!this.preview) return;

        const scrollHeight = this.preview.scrollHeight;
        const clientHeight = this.preview.clientHeight;
        const maxScroll = scrollHeight - clientHeight;

        const scrollTop = (percentage / 100) * maxScroll;
        this.preview.scrollTop = scrollTop;
    },

    /**
     * Toggle sync on/off
     */
    toggle() {
        this.enabled = !this.enabled;
        Storage.saveSyncScroll(this.enabled);
        this.updateToggleButton();
        
        const status = this.enabled ? 'activada' : 'desactivada';
        Utils.showNotification(`Sincronización ${status}`, 1500);
    },

    /**
     * Enable sync
     */
    enable() {
        this.enabled = true;
        Storage.saveSyncScroll(true);
        this.updateToggleButton();
    },

    /**
     * Disable sync
     */
    disable() {
        this.enabled = false;
        Storage.saveSyncScroll(false);
        this.updateToggleButton();
    },

    /**
     * Update toggle button appearance
     */
    updateToggleButton() {
        const toggleBtn = document.getElementById('sync-scroll-toggle');
        if (toggleBtn) {
            toggleBtn.style.opacity = this.enabled ? '1' : '0.5';
            toggleBtn.title = this.enabled 
                ? 'Desactivar sincronización de scroll' 
                : 'Activar sincronización de scroll';
        }
    },

    /**
     * Check if sync is enabled
     * @returns {boolean} True if sync is enabled
     */
    isEnabled() {
        return this.enabled;
    },

    /**
     * Scroll both editor and preview to top
     */
    scrollToTop() {
        if (this.editor) this.editor.scrollTop = 0;
        if (this.preview) this.preview.scrollTop = 0;
    },

    /**
     * Scroll both editor and preview to bottom
     */
    scrollToBottom() {
        if (this.editor) {
            this.editor.scrollTop = this.editor.scrollHeight;
        }
        if (this.preview) {
            this.preview.scrollTop = this.preview.scrollHeight;
        }
    },

    /**
     * Scroll to specific line in editor and sync preview
     * @param {number} lineNumber - Line number (1-indexed)
     */
    scrollToLine(lineNumber) {
        if (!this.editor) return;

        const lines = this.editor.value.split('\n');
        let charCount = 0;

        for (let i = 0; i < Math.min(lineNumber - 1, lines.length); i++) {
            charCount += lines[i].length + 1;
        }

        // Calculate scroll position
        const lineHeight = parseInt(window.getComputedStyle(this.editor).lineHeight);
        const scrollTop = (lineNumber - 1) * lineHeight;

        this.editor.scrollTop = scrollTop;

        // Sync preview
        if (this.enabled) {
            this.syncPreviewFromEditor();
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sync;
}
