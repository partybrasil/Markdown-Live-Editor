/**
 * Markdown Live Editor - Editor Module
 * Version: 0.1.0
 * Handles the markdown editor functionality
 */

const Editor = {
    textarea: null,
    updateCallback: null,

    /**
     * Initialize editor
     * @param {string} textareaId - ID of the textarea element
     * @param {Function} onUpdate - Callback function when content updates
     */
    init(textareaId, onUpdate) {
        this.textarea = document.getElementById(textareaId);
        this.updateCallback = onUpdate;

        if (!this.textarea) {
            console.error(`Textarea with ID "${textareaId}" not found`);
            return;
        }

        this.setupEventListeners();
        this.loadSavedContent();
        
        // Initial update
        if (this.updateCallback) {
            this.updateCallback(this.getContent());
        }
    },

    /**
     * Setup event listeners for the editor
     */
    setupEventListeners() {
        // Input event for real-time updates
        this.textarea.addEventListener('input', Utils.debounce((e) => {
            const content = e.target.value;
            
            // Update preview
            if (this.updateCallback) {
                this.updateCallback(content);
            }

            // Update statistics
            this.updateStatistics(content);

            // Schedule auto-save
            scheduleAutoSave(content);
        }, 150));

        // Handle tab key
        this.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                
                // Insert tab (4 spaces)
                const start = this.textarea.selectionStart;
                const end = this.textarea.selectionEnd;
                const value = this.textarea.value;
                
                this.textarea.value = value.substring(0, start) + '    ' + value.substring(end);
                this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;
            }
        });

        // Prevent accidental data loss
        window.addEventListener('beforeunload', (e) => {
            const content = this.getContent();
            if (content && content.trim().length > 0) {
                // Save immediately
                Storage.saveContent(content);
            }
        });
    },

    /**
     * Load saved content from storage
     */
    loadSavedContent() {
        const savedContent = Storage.loadContent();
        
        if (savedContent) {
            this.setContent(savedContent);
            Utils.showNotification('Contenido recuperado', 2000);
        }
    },

    /**
     * Get current editor content
     * @returns {string} Current content
     */
    getContent() {
        return this.textarea ? this.textarea.value : '';
    },

    /**
     * Set editor content
     * @param {string} content - Content to set
     */
    setContent(content) {
        if (this.textarea) {
            this.textarea.value = content;
            
            // Trigger update
            if (this.updateCallback) {
                this.updateCallback(content);
            }

            // Update statistics
            this.updateStatistics(content);
        }
    },

    /**
     * Clear editor content
     */
    clear() {
        this.setContent('');
        Storage.clearContent();
        Utils.showNotification('Contenido limpiado', 1500);
    },

    /**
     * Update word and character count statistics
     * @param {string} content - Content to analyze
     */
    updateStatistics(content) {
        const wordCount = Utils.countWords(content);
        const charCount = Utils.countCharacters(content);

        const wordCountEl = document.getElementById('word-count');
        const charCountEl = document.getElementById('char-count');

        if (wordCountEl) {
            wordCountEl.textContent = `${wordCount} palabra${wordCount !== 1 ? 's' : ''}`;
        }

        if (charCountEl) {
            charCountEl.textContent = `${charCount} caracter${charCount !== 1 ? 'es' : ''}`;
        }
    },

    /**
     * Get editor element
     * @returns {HTMLTextAreaElement} Editor textarea element
     */
    getElement() {
        return this.textarea;
    },

    /**
     * Focus the editor
     */
    focus() {
        if (this.textarea) {
            this.textarea.focus();
        }
    },

    /**
     * Insert text at cursor position
     * @param {string} text - Text to insert
     */
    insert(text) {
        if (this.textarea) {
            Utils.insertAtCursor(this.textarea, text);
        }
    },

    /**
     * Get selected text
     * @returns {string} Selected text
     */
    getSelection() {
        if (this.textarea) {
            return Utils.getSelection(this.textarea).text;
        }
        return '';
    },

    /**
     * Replace selected text
     * @param {string} text - New text
     */
    replaceSelection(text) {
        if (this.textarea) {
            const selection = Utils.getSelection(this.textarea);
            this.textarea.value = this.textarea.value.substring(0, selection.start) +
                                 text +
                                 this.textarea.value.substring(selection.end);
            
            Utils.setSelection(this.textarea, selection.start, selection.start + text.length);
            this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
    },

    /**
     * Undo last action (uses browser default)
     */
    undo() {
        if (this.textarea) {
            document.execCommand('undo');
        }
    },

    /**
     * Redo last action (uses browser default)
     */
    redo() {
        if (this.textarea) {
            document.execCommand('redo');
        }
    },

    /**
     * Get cursor position
     * @returns {Object} Position {line, column}
     */
    getCursorPosition() {
        if (!this.textarea) {
            return { line: 0, column: 0 };
        }

        const text = this.textarea.value.substring(0, this.textarea.selectionStart);
        const lines = text.split('\n');
        
        return {
            line: lines.length,
            column: lines[lines.length - 1].length + 1
        };
    },

    /**
     * Scroll to line
     * @param {number} lineNumber - Line number to scroll to (1-indexed)
     */
    scrollToLine(lineNumber) {
        if (!this.textarea) return;

        const lines = this.textarea.value.split('\n');
        let charCount = 0;

        for (let i = 0; i < Math.min(lineNumber - 1, lines.length); i++) {
            charCount += lines[i].length + 1; // +1 for newline
        }

        this.textarea.selectionStart = charCount;
        this.textarea.selectionEnd = charCount;
        this.textarea.focus();
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Editor;
}
