/**
 * Markdown Live Editor - Utility Functions
 * Version: 0.1.0
 */

const Utils = {
    /**
     * Debounce function to limit rate of function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function to limit rate of function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit = 100) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    },

    /**
     * Generate a timestamp-based filename
     * @param {string} prefix - Filename prefix
     * @param {string} extension - File extension
     * @returns {string} Generated filename
     */
    generateFilename(prefix = 'markdown', extension = 'md') {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${prefix}-${year}${month}${day}-${hours}${minutes}${seconds}.${extension}`;
    },

    /**
     * Count words in text
     * @param {string} text - Text to count words in
     * @returns {number} Word count
     */
    countWords(text) {
        if (!text || text.trim() === '') return 0;
        return text.trim().split(/\s+/).length;
    },

    /**
     * Count characters in text
     * @param {string} text - Text to count characters in
     * @returns {number} Character count
     */
    countCharacters(text) {
        return text ? text.length : 0;
    },

    /**
     * Download a file to the user's device
     * @param {string} content - File content
     * @param {string} filename - Name of the file
     * @param {string} mimeType - MIME type of the file
     */
    downloadFile(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Read file as text
     * @param {File} file - File object to read
     * @returns {Promise<string>} Promise that resolves with file content
     */
    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    },

    /**
     * Read file as data URL (base64)
     * @param {File} file - File object to read
     * @returns {Promise<string>} Promise that resolves with data URL
     */
    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    },

    /**
     * Check if a value is a valid image file
     * @param {File} file - File to check
     * @returns {boolean} True if file is an image
     */
    isImageFile(file) {
        if (!file || !file.type) return false;
        return file.type.startsWith('image/');
    },

    /**
     * Get text selection info from textarea
     * @param {HTMLTextAreaElement} textarea - Textarea element
     * @returns {Object} Selection info {start, end, text}
     */
    getSelection(textarea) {
        return {
            start: textarea.selectionStart,
            end: textarea.selectionEnd,
            text: textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
        };
    },

    /**
     * Set text selection in textarea
     * @param {HTMLTextAreaElement} textarea - Textarea element
     * @param {number} start - Start position
     * @param {number} end - End position
     */
    setSelection(textarea, start, end) {
        textarea.focus();
        textarea.setSelectionRange(start, end);
    },

    /**
     * Insert text at cursor position in textarea
     * @param {HTMLTextAreaElement} textarea - Textarea element
     * @param {string} text - Text to insert
     */
    insertAtCursor(textarea, text) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        
        textarea.value = value.substring(0, start) + text + value.substring(end);
        
        const newPosition = start + text.length;
        this.setSelection(textarea, newPosition, newPosition);
        
        // Trigger input event
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    },

    /**
     * Wrap selected text with prefix and suffix
     * @param {HTMLTextAreaElement} textarea - Textarea element
     * @param {string} prefix - Text to add before selection
     * @param {string} suffix - Text to add after selection
     * @param {string} defaultText - Default text if no selection
     */
    wrapSelection(textarea, prefix, suffix = '', defaultText = '') {
        const selection = this.getSelection(textarea);
        const text = selection.text || defaultText;
        const wrapped = prefix + text + suffix;
        
        textarea.value = textarea.value.substring(0, selection.start) +
                        wrapped +
                        textarea.value.substring(selection.end);
        
        if (selection.text) {
            this.setSelection(textarea, selection.start, selection.start + wrapped.length);
        } else {
            this.setSelection(textarea, 
                            selection.start + prefix.length,
                            selection.start + prefix.length + text.length);
        }
        
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    },

    /**
     * Show temporary notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds
     */
    showNotification(message, duration = 2000) {
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
            indicator.textContent = message;
            indicator.classList.add('visible');
            
            setTimeout(() => {
                indicator.classList.remove('visible');
            }, duration);
        }
    },

    /**
     * Sanitize HTML to prevent XSS
     * @param {string} html - HTML string to sanitize
     * @returns {string} Sanitized HTML
     */
    sanitizeHTML(html) {
        if (typeof DOMPurify !== 'undefined') {
            return DOMPurify.sanitize(html, {
                ALLOWED_TAGS: [
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'p', 'br', 'hr',
                    'strong', 'em', 'u', 's', 'code', 'pre',
                    'a', 'img',
                    'ul', 'ol', 'li',
                    'blockquote',
                    'table', 'thead', 'tbody', 'tr', 'th', 'td',
                    'div', 'span'
                ],
                ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id']
            });
        }
        return html;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
