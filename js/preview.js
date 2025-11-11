/**
 * Markdown Live Editor - Preview Module
 * Version: 0.1.0
 * Handles markdown rendering and preview display
 */

const Preview = {
    previewElement: null,
    lastRenderedContent: '',

    /**
     * Initialize preview
     * @param {string} previewId - ID of the preview element
     */
    init(previewId) {
        this.previewElement = document.getElementById(previewId);

        if (!this.previewElement) {
            console.error(`Preview element with ID "${previewId}" not found`);
            return;
        }

        this.setupMarked();
    },

    /**
     * Configure marked.js options
     */
    setupMarked() {
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,           // Convert \n to <br>
                gfm: true,             // GitHub Flavored Markdown
                headerIds: true,        // Add IDs to headers
                mangle: false,         // Don't escape email addresses
                pedantic: false,       // Don't use original markdown.pl quirks
                sanitize: false,       // Don't sanitize (we use DOMPurify)
                smartLists: true,      // Use smarter list behavior
                smartypants: false,    // Don't use "smart" typography
                xhtml: false           // Don't use XHTML tags
            });
        }
    },

    /**
     * Update preview with markdown content
     * @param {string} markdown - Markdown content to render
     */
    update(markdown) {
        if (!this.previewElement) return;

        // Skip if content hasn't changed
        if (markdown === this.lastRenderedContent) {
            return;
        }

        this.lastRenderedContent = markdown;

        // Render markdown to HTML
        let html = '';
        
        if (markdown && markdown.trim().length > 0) {
            try {
                if (typeof marked !== 'undefined') {
                    html = marked.parse(markdown);
                    
                    // Sanitize HTML
                    html = Utils.sanitizeHTML(html);
                } else {
                    console.error('marked.js library not loaded');
                    html = '<p class="text-muted">Error: Librería Markdown no cargada</p>';
                }
            } catch (error) {
                console.error('Error rendering markdown:', error);
                html = `<p class="text-muted">Error al renderizar: ${error.message}</p>`;
            }
        } else {
            html = this.getPlaceholderHTML();
        }

        // Update preview
        this.previewElement.innerHTML = html;

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('previewUpdated', {
            detail: { markdown, html }
        }));
    },

    /**
     * Get placeholder HTML for empty preview
     * @returns {string} Placeholder HTML
     */
    getPlaceholderHTML() {
        return `
            <div class="text-center text-muted" style="padding: 2rem;">
                <h3>👋 ¡Bienvenido!</h3>
                <p>Empieza a escribir Markdown en el editor...</p>
                <p style="font-size: 0.9em; margin-top: 1rem;">
                    <strong>Sugerencias:</strong><br>
                    • Usa los botones de la barra de herramientas<br>
                    • Arrastra imágenes directamente al editor<br>
                    • Atajos de teclado disponibles (Ctrl+B, Ctrl+I, etc.)
                </p>
            </div>
        `;
    },

    /**
     * Get rendered HTML
     * @returns {string} Current preview HTML
     */
    getHTML() {
        return this.previewElement ? this.previewElement.innerHTML : '';
    },

    /**
     * Clear preview
     */
    clear() {
        if (this.previewElement) {
            this.previewElement.innerHTML = this.getPlaceholderHTML();
            this.lastRenderedContent = '';
        }
    },

    /**
     * Get preview element
     * @returns {HTMLElement} Preview element
     */
    getElement() {
        return this.previewElement;
    },

    /**
     * Scroll preview to position
     * @param {number} scrollTop - Scroll position
     */
    scrollTo(scrollTop) {
        if (this.previewElement) {
            this.previewElement.scrollTop = scrollTop;
        }
    },

    /**
     * Get current scroll position
     * @returns {number} Current scroll position
     */
    getScrollTop() {
        return this.previewElement ? this.previewElement.scrollTop : 0;
    },

    /**
     * Get scroll height
     * @returns {number} Total scroll height
     */
    getScrollHeight() {
        return this.previewElement ? this.previewElement.scrollHeight : 0;
    },

    /**
     * Get client height
     * @returns {number} Visible height
     */
    getClientHeight() {
        return this.previewElement ? this.previewElement.clientHeight : 0;
    },

    /**
     * Calculate scroll percentage
     * @returns {number} Scroll percentage (0-100)
     */
    getScrollPercentage() {
        if (!this.previewElement) return 0;

        const scrollTop = this.getScrollTop();
        const scrollHeight = this.getScrollHeight();
        const clientHeight = this.getClientHeight();

        if (scrollHeight <= clientHeight) return 0;

        return (scrollTop / (scrollHeight - clientHeight)) * 100;
    },

    /**
     * Scroll to percentage
     * @param {number} percentage - Percentage (0-100)
     */
    scrollToPercentage(percentage) {
        if (!this.previewElement) return;

        const scrollHeight = this.getScrollHeight();
        const clientHeight = this.getClientHeight();
        const maxScroll = scrollHeight - clientHeight;

        const scrollTop = (percentage / 100) * maxScroll;
        this.scrollTo(scrollTop);
    },

    /**
     * Render markdown without updating preview
     * @param {string} markdown - Markdown content
     * @returns {string} Rendered HTML
     */
    renderMarkdown(markdown) {
        if (typeof marked !== 'undefined') {
            try {
                const html = marked.parse(markdown);
                return Utils.sanitizeHTML(html);
            } catch (error) {
                console.error('Error rendering markdown:', error);
                return '';
            }
        }
        return '';
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Preview;
}
