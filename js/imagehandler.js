/**
 * Markdown Live Editor - Image Handler Module
 * Version: 0.1.0
 * Handles drag-and-drop image uploads
 */

const ImageHandler = {
    editor: null,
    dropZoneOverlay: null,

    /**
     * Initialize image handler
     * @param {HTMLTextAreaElement} editorElement - Editor textarea
     */
    init(editorElement) {
        this.editor = editorElement;
        this.dropZoneOverlay = document.getElementById('drop-zone-overlay');

        if (!this.editor) {
            console.error('Editor element not provided');
            return;
        }

        this.setupDragAndDrop();
    },

    /**
     * Setup drag and drop event listeners
     */
    setupDragAndDrop() {
        // Prevent default drag behaviors on the entire document
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop zone when dragging
        ['dragenter', 'dragover'].forEach(eventName => {
            this.editor.addEventListener(eventName, () => {
                this.showDropZone();
            }, false);
        });

        // Remove highlight when not dragging
        ['dragleave', 'drop'].forEach(eventName => {
            this.editor.addEventListener(eventName, () => {
                this.hideDropZone();
            }, false);
        });

        // Handle dropped files on editor
        this.editor.addEventListener('drop', (e) => {
            this.handleDrop(e);
        }, false);

        // Handle dropped files on overlay
        if (this.dropZoneOverlay) {
            this.dropZoneOverlay.addEventListener('drop', (e) => {
                this.handleDrop(e);
                this.hideDropZone();
            }, false);

            this.dropZoneOverlay.addEventListener('dragleave', (e) => {
                // Only hide if leaving the overlay itself, not child elements
                if (e.target === this.dropZoneOverlay) {
                    this.hideDropZone();
                }
            }, false);
        }

        // Handle paste events (for pasting images)
        this.editor.addEventListener('paste', (e) => {
            this.handlePaste(e);
        });
    },

    /**
     * Prevent default drag behaviors
     * @param {Event} e - Event object
     */
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    },

    /**
     * Show drop zone overlay
     */
    showDropZone() {
        if (this.dropZoneOverlay) {
            this.dropZoneOverlay.classList.add('active');
        }
    },

    /**
     * Hide drop zone overlay
     */
    hideDropZone() {
        if (this.dropZoneOverlay) {
            this.dropZoneOverlay.classList.remove('active');
        }
    },

    /**
     * Handle dropped files
     * @param {DragEvent} e - Drop event
     */
    async handleDrop(e) {
        this.preventDefaults(e);

        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            await this.handleFiles(files);
        }
    },

    /**
     * Handle pasted content
     * @param {ClipboardEvent} e - Paste event
     */
    async handlePaste(e) {
        const items = e.clipboardData.items;

        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                e.preventDefault();
                const file = item.getAsFile();
                if (file) {
                    await this.handleFiles([file]);
                }
                break;
            }
        }
    },

    /**
     * Handle file list
     * @param {FileList} files - Files to process
     */
    async handleFiles(files) {
        for (let file of files) {
            if (Utils.isImageFile(file)) {
                await this.processImage(file);
            } else {
                console.warn(`File "${file.name}" is not an image`);
            }
        }
    },

    /**
     * Process image file
     * @param {File} file - Image file to process
     */
    async processImage(file) {
        try {
            Utils.showNotification('Procesando imagen...', 1000);

            // Read file as data URL (base64)
            const dataURL = await Utils.readFileAsDataURL(file);

            // Generate alt text from filename
            const altText = this.generateAltText(file.name);

            // Create markdown image syntax
            const imageMarkdown = `![${altText}](${dataURL})`;

            // Insert into editor
            Utils.insertAtCursor(this.editor, '\n' + imageMarkdown + '\n');

            Utils.showNotification('✓ Imagen insertada', 2000);
        } catch (error) {
            console.error('Error processing image:', error);
            alert('Error al procesar la imagen');
        }
    },

    /**
     * Generate alt text from filename
     * @param {string} filename - Image filename
     * @returns {string} Generated alt text
     */
    generateAltText(filename) {
        // Remove extension
        let altText = filename.replace(/\.[^/.]+$/, '');
        
        // Replace underscores and hyphens with spaces
        altText = altText.replace(/[_-]/g, ' ');
        
        // Capitalize first letter
        altText = altText.charAt(0).toUpperCase() + altText.slice(1);
        
        return altText;
    },

    /**
     * Compress image if needed (optional future enhancement)
     * @param {File} file - Image file
     * @param {number} maxSize - Maximum file size in bytes
     * @returns {Promise<string>} Compressed data URL
     */
    async compressImage(file, maxSize = 1024 * 1024) {
        // This is a placeholder for future image compression feature
        // For now, just return the original data URL
        return await Utils.readFileAsDataURL(file);
    },

    /**
     * Get image dimensions
     * @param {File} file - Image file
     * @returns {Promise<Object>} Dimensions {width, height}
     */
    getImageDimensions(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load image'));
            };

            img.src = url;
        });
    },

    /**
     * Insert image from URL
     * @param {string} url - Image URL
     * @param {string} altText - Alt text for image
     */
    insertImageFromURL(url, altText = 'Image') {
        const imageMarkdown = `![${altText}](${url})`;
        Utils.insertAtCursor(this.editor, '\n' + imageMarkdown + '\n');
        Utils.showNotification('✓ Imagen insertada', 2000);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageHandler;
}
