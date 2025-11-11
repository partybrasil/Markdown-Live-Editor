/**
 * Markdown Live Editor - Toolbar Module
 * Version: 0.1.0
 * Handles formatting buttons and quick actions
 */

const Toolbar = {
    editor: null,

    /**
     * Initialize toolbar
     * @param {HTMLTextAreaElement} editorElement - The editor textarea
     */
    init(editorElement) {
        this.editor = editorElement;
        this.setupFormatButtons();
        this.setupKeyboardShortcuts();
    },

    /**
     * Setup format button event listeners
     */
    setupFormatButtons() {
        const buttons = document.querySelectorAll('.toolbar__button[data-format]');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const format = button.dataset.format;
                this.applyFormat(format);
            });
        });
    },

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        this.editor.addEventListener('keydown', (e) => {
            // Check for Ctrl/Cmd key
            const isMod = e.ctrlKey || e.metaKey;

            if (!isMod) return;

            let format = null;

            switch (e.key.toLowerCase()) {
                case 'b':
                    format = 'bold';
                    break;
                case 'i':
                    format = 'italic';
                    break;
                case '`':
                    format = 'code';
                    break;
                case '1':
                    format = 'h1';
                    break;
                case '2':
                    format = 'h2';
                    break;
                case '3':
                    format = 'h3';
                    break;
                case 'u':
                    format = 'ul';
                    break;
                case 'o':
                    format = 'ol';
                    break;
                case 'k':
                    format = 'link';
                    break;
                case 'q':
                    format = 'quote';
                    break;
                case 'h':
                    format = 'hr';
                    break;
            }

            // Ctrl+Shift+I for image
            if (e.key.toLowerCase() === 'i' && e.shiftKey) {
                format = 'image';
            }

            if (format) {
                e.preventDefault();
                this.applyFormat(format);
            }
        });
    },

    /**
     * Apply formatting to selected text
     * @param {string} format - Format type
     */
    applyFormat(format) {
        if (!this.editor) return;

        this.editor.focus();

        switch (format) {
            case 'bold':
                Utils.wrapSelection(this.editor, '**', '**', 'texto en negrita');
                break;

            case 'italic':
                Utils.wrapSelection(this.editor, '*', '*', 'texto en itálica');
                break;

            case 'code':
                Utils.wrapSelection(this.editor, '`', '`', 'código');
                break;

            case 'h1':
                this.insertHeading(1);
                break;

            case 'h2':
                this.insertHeading(2);
                break;

            case 'h3':
                this.insertHeading(3);
                break;

            case 'ul':
                this.insertList('ul');
                break;

            case 'ol':
                this.insertList('ol');
                break;

            case 'link':
                this.insertLink();
                break;

            case 'image':
                this.insertImage();
                break;

            case 'quote':
                this.insertQuote();
                break;

            case 'hr':
                this.insertHorizontalRule();
                break;
        }
    },

    /**
     * Insert heading
     * @param {number} level - Heading level (1-6)
     */
    insertHeading(level) {
        const hashes = '#'.repeat(level);
        const selection = Utils.getSelection(this.editor);
        
        if (selection.text) {
            Utils.wrapSelection(this.editor, `${hashes} `, '', '');
        } else {
            Utils.insertAtCursor(this.editor, `${hashes} Encabezado ${level}`);
        }
    },

    /**
     * Insert list
     * @param {string} type - List type ('ul' or 'ol')
     */
    insertList(type) {
        const selection = Utils.getSelection(this.editor);
        const lines = selection.text.split('\n').filter(line => line.trim());

        if (lines.length > 0) {
            const formatted = lines.map((line, index) => {
                const prefix = type === 'ol' ? `${index + 1}. ` : '- ';
                return prefix + line.trim();
            }).join('\n');

            this.editor.value = this.editor.value.substring(0, selection.start) +
                              formatted +
                              this.editor.value.substring(selection.end);

            Utils.setSelection(this.editor, selection.start, selection.start + formatted.length);
        } else {
            const prefix = type === 'ol' ? '1. ' : '- ';
            Utils.insertAtCursor(this.editor, prefix + 'Elemento de lista');
        }

        this.editor.dispatchEvent(new Event('input', { bubbles: true }));
    },

    /**
     * Insert link
     */
    insertLink() {
        const selection = Utils.getSelection(this.editor);
        const text = selection.text || 'texto del enlace';
        const url = 'https://ejemplo.com';
        
        const link = `[${text}](${url})`;
        
        this.editor.value = this.editor.value.substring(0, selection.start) +
                          link +
                          this.editor.value.substring(selection.end);

        // Select the URL part for easy editing
        const urlStart = selection.start + text.length + 3;
        Utils.setSelection(this.editor, urlStart, urlStart + url.length);

        this.editor.dispatchEvent(new Event('input', { bubbles: true }));
    },

    /**
     * Insert image
     */
    insertImage() {
        const selection = Utils.getSelection(this.editor);
        const alt = selection.text || 'descripción de la imagen';
        const url = 'https://ejemplo.com/imagen.jpg';
        
        const image = `![${alt}](${url})`;
        
        this.editor.value = this.editor.value.substring(0, selection.start) +
                          image +
                          this.editor.value.substring(selection.end);

        // Select the URL part for easy editing
        const urlStart = selection.start + alt.length + 4;
        Utils.setSelection(this.editor, urlStart, urlStart + url.length);

        this.editor.dispatchEvent(new Event('input', { bubbles: true }));
    },

    /**
     * Insert blockquote
     */
    insertQuote() {
        const selection = Utils.getSelection(this.editor);
        
        if (selection.text) {
            const lines = selection.text.split('\n');
            const quoted = lines.map(line => '> ' + line).join('\n');
            
            this.editor.value = this.editor.value.substring(0, selection.start) +
                              quoted +
                              this.editor.value.substring(selection.end);

            Utils.setSelection(this.editor, selection.start, selection.start + quoted.length);
        } else {
            Utils.insertAtCursor(this.editor, '> Cita de bloque');
        }

        this.editor.dispatchEvent(new Event('input', { bubbles: true }));
    },

    /**
     * Insert horizontal rule
     */
    insertHorizontalRule() {
        Utils.insertAtCursor(this.editor, '\n---\n');
    },

    /**
     * Get current line number
     * @returns {number} Current line number (1-indexed)
     */
    getCurrentLine() {
        const text = this.editor.value.substring(0, this.editor.selectionStart);
        return text.split('\n').length;
    },

    /**
     * Get total line count
     * @returns {number} Total number of lines
     */
    getTotalLines() {
        return this.editor.value.split('\n').length;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Toolbar;
}
