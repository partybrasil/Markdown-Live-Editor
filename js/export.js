/**
 * Markdown Live Editor - Export Module
 * Version: 0.1.0
 * Handles file export functionality
 */

const Export = {
    /**
     * Initialize export functionality
     */
    init() {
        this.setupEventListeners();
    },

    /**
     * Setup event listeners for export buttons
     */
    setupEventListeners() {
        const exportMdBtn = document.getElementById('export-md');
        const exportHtmlBtn = document.getElementById('export-html');

        if (exportMdBtn) {
            exportMdBtn.addEventListener('click', () => {
                this.exportAsMarkdown();
            });
        }

        if (exportHtmlBtn) {
            exportHtmlBtn.addEventListener('click', () => {
                this.exportAsHTML();
            });
        }
    },

    /**
     * Export content as Markdown file
     */
    exportAsMarkdown() {
        const content = Editor.getContent();

        if (!content || content.trim().length === 0) {
            alert('No hay contenido para exportar');
            return;
        }

        const filename = Utils.generateFilename('markdown', 'md');
        Utils.downloadFile(content, filename, 'text/markdown;charset=utf-8');
        Utils.showNotification('✓ Markdown descargado', 2000);
    },

    /**
     * Export content as HTML file
     */
    exportAsHTML() {
        const markdown = Editor.getContent();

        if (!markdown || markdown.trim().length === 0) {
            alert('No hay contenido para exportar');
            return;
        }

        const html = this.generateCompleteHTML(markdown);
        const filename = Utils.generateFilename('markdown', 'html');
        Utils.downloadFile(html, filename, 'text/html;charset=utf-8');
        Utils.showNotification('✓ HTML descargado', 2000);
    },

    /**
     * Generate complete HTML document
     * @param {string} markdown - Markdown content
     * @returns {string} Complete HTML document
     */
    generateCompleteHTML(markdown) {
        const renderedHTML = Preview.renderMarkdown(markdown);
        const theme = Themes.getCurrentTheme();

        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento Markdown</title>
    <style>
        /* Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #212529;
            background-color: #ffffff;
            padding: 2rem;
            max-width: 900px;
            margin: 0 auto;
        }

        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 600;
            line-height: 1.2;
        }

        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }
        h4 { font-size: 1.1em; }
        h5 { font-size: 1em; }
        h6 { font-size: 0.9em; }

        h1:first-child,
        h2:first-child,
        h3:first-child {
            margin-top: 0;
        }

        p {
            margin-bottom: 1rem;
        }

        /* Links */
        a {
            color: #3498db;
            text-decoration: none;
            transition: color 150ms ease-in-out;
        }

        a:hover {
            color: #2980b9;
            text-decoration: underline;
        }

        /* Lists */
        ul, ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
        }

        li {
            margin-bottom: 0.5rem;
        }

        /* Code */
        code {
            padding: 2px 6px;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 0.9em;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 3px;
        }

        pre {
            margin-bottom: 1rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            overflow-x: auto;
        }

        pre code {
            padding: 0;
            background: none;
            border: none;
        }

        /* Blockquote */
        blockquote {
            margin: 1rem 0;
            padding: 0.5rem 1rem;
            border-left: 4px solid #3498db;
            background-color: #f8f9fa;
            color: #6c757d;
        }

        /* Horizontal Rule */
        hr {
            margin: 2rem 0;
            border: none;
            border-top: 1px solid #dee2e6;
        }

        /* Images */
        img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 1rem 0;
        }

        /* Tables */
        table {
            width: 100%;
            margin-bottom: 1rem;
            border-collapse: collapse;
        }

        th, td {
            padding: 0.75rem;
            border: 1px solid #dee2e6;
            text-align: left;
        }

        th {
            background-color: #f8f9fa;
            font-weight: 600;
        }

        /* Print Styles */
        @media print {
            body {
                padding: 0;
            }

            a {
                color: #000;
            }

            a[href]:after {
                content: " (" attr(href) ")";
                font-size: 0.8em;
            }

            h1, h2, h3 {
                page-break-after: avoid;
            }

            pre, blockquote {
                page-break-inside: avoid;
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            body {
                padding: 1rem;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    ${renderedHTML}
    
    <footer style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 0.875rem;">
        <p>Generado con <a href="https://github.com/partybrasil/Markdown-Live-Editor" target="_blank" rel="noopener noreferrer">Markdown Live Editor</a></p>
    </footer>
</body>
</html>`;
    },

    /**
     * Get export data object
     * @returns {Object} Export data with markdown and HTML
     */
    getExportData() {
        const markdown = Editor.getContent();
        const html = Preview.getHTML();

        return {
            markdown,
            html,
            timestamp: new Date().toISOString(),
            theme: Themes.getCurrentTheme(),
            wordCount: Utils.countWords(markdown),
            charCount: Utils.countCharacters(markdown)
        };
    },

    /**
     * Export settings as JSON
     */
    exportSettings() {
        const settings = Storage.exportSettings();
        const filename = Utils.generateFilename('markdown-settings', 'json');
        Utils.downloadFile(settings, filename, 'application/json;charset=utf-8');
        Utils.showNotification('✓ Configuración exportada', 2000);
    },

    /**
     * Import settings from JSON file
     */
    importSettings() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const content = await Utils.readFileAsText(file);
                if (Storage.importSettings(content)) {
                    Utils.showNotification('✓ Configuración importada', 2000);
                    location.reload(); // Reload to apply settings
                } else {
                    alert('Error al importar configuración');
                }
            } catch (error) {
                console.error('Error importing settings:', error);
                alert('Error al leer archivo');
            }
        };

        input.click();
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Export;
}
