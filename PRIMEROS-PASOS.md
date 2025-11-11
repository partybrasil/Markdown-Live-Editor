# 🎯 Guía de Primeros Pasos - Markdown-Live-Editor

**Para**: Iniciar desarrollo inmediato  
**Duración**: ~20 minutos de setup, listo para Sprint 1.1  
**Resultado**: Proyecto listo en GitHub y en local

---

## ✅ Pre-requisitos

- [ ] Cuenta GitHub activa
- [ ] Git instalado en tu máquina
- [ ] VSCode instalado
- [ ] Node.js no necesario (proyecto estático)
- [ ] Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## 🚀 PASO 1: Crear Repositorio en GitHub (5 min)

### 1.1 Nueva Creación
1. Ve a [github.com](https://github.com) → Click **"+"** → **New repository**
2. Rellena:
   - **Repository name**: `markdown-live-editor`
   - **Description**: `Live Markdown Editor with Preview - Edit & View Real-time. Static site for GitHub Pages.`
   - **Public**: Selecciona ✅
   - **Add a README file**: Selecciona ✅
   - **Add .gitignore**: Selecciona "Node" (no la usaremos pero es buena práctica)
   - **License**: "MIT License"

3. Click **Create repository**

### 1.2 Validar Creación
- Debe verse URL: `https://github.com/tu-usuario/markdown-live-editor`
- Debe tener: README.md, LICENSE, .gitignore

---

## 📥 PASO 2: Clonar Localmente (2 min)

### 2.1 En Terminal/PowerShell
```bash
# Navega a tu directorio de proyectos
cd ~/Documents
# O donde prefieras

# Clona el repositorio
git clone https://github.com/tu-usuario/markdown-live-editor.git

# Entra en el directorio
cd markdown-live-editor

# Verifica estructura actual
ls -la
# Deberías ver: README.md, LICENSE, .gitignore
```

---

## 🗂️ PASO 3: Crear Estructura de Directorios (2 min)

### 3.1 Crear Carpetas
```bash
# Crea todos los directorios necesarios
mkdir -p css js lib docs .github/chatmodes .github/agents

# Verifica estructura
tree
# O en Windows PowerShell:
# Get-ChildItem -Recurse
```

### 3.2 Estructura Resultante
```
markdown-live-editor/
├── README.md (ya existe)
├── LICENSE (ya existe)
├── .gitignore (ya existe)
├── css/                    # ← NUEVA
├── js/                     # ← NUEVA
├── lib/                    # ← NUEVA
├── docs/                   # ← NUEVA
└── .github/
    ├── chatmodes/          # ← NUEVA
    └── agents/             # ← NUEVA
```

---

## 📄 PASO 4: Copiar Artefactos Generados (5 min)

### 4.1 README.md Principal
**Si tu README.md actual es el de GitHub por defecto, reemplázalo**:

1. Copia el contenido completo del **README.md** que fue generado
2. Reemplaza el contenido actual en `markdown-live-editor/README.md`
3. Guarda

### 4.2 Copiar Otros Artefactos
```bash
# Asume que tienes los archivos generados en ~/Downloads o similar

# Copia Chatmode
cp ~/Downloads/markdown-live-editor.chatmode.md .github/chatmodes/

# Copia Agente
cp ~/Downloads/markdown-live-editor-AutoDEV.agent.md .github/agents/

# Copia especificación de temas
cp ~/Downloads/themes-specification.md docs/

# Copia instrucciones Perplexity Space
cp ~/Downloads/perplexity-space-instructions.md docs/

# Verifica cópias
ls -la .github/chatmodes/
ls -la .github/agents/
ls -la docs/
```

---

## 🔧 PASO 5: Preparar VSCode (3 min)

### 5.1 Abrir Proyecto en VSCode
```bash
# Desde la terminal en el directorio del proyecto
code .

# O abre VSCode manualmente y abre la carpeta markdown-live-editor
```

### 5.2 Instalar Extensiones Recomendadas
1. Click en **Extensions** (Ctrl+Shift+X)
2. Instala:
   - **Live Server** (por Ritwick Dey) - Para preview local
   - **Prettier** - Para formateo de código
   - **ESLint** - Para validación JavaScript
   - **HTMLHint** - Para validación HTML
   - **Stylelint** - Para validación CSS

### 5.3 Estructura en VSCode
- Deberías ver la carpeta `markdown-live-editor` con subcarpetas

---

## 🌐 PASO 6: Crear HTML Base (5 min)

### 6.1 Crear index.html
1. Click derecho en la raíz del proyecto → **New File**
2. Nombre: `index.html`
3. Pega este contenido base (complétalo en Sprint 1.1):

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Live Editor</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/themes.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-light">
    <div class="container">
        <!-- Barra de Herramientas -->
        <header class="toolbar">
            <div class="toolbar-left">
                <h1>📝 Markdown Live Editor</h1>
            </div>
            <div class="toolbar-right">
                <select id="theme-selector" class="theme-selector">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <!-- Más temas aquí -->
                </select>
                <button id="color-btn" class="toolbar-btn">🎨 Color</button>
            </div>
        </header>

        <!-- Main Content (2 columnas) -->
        <main class="editor-container">
            <!-- Editor -->
            <div class="editor-section">
                <h2>Markdown</h2>
                <textarea id="markdown-input" class="markdown-textarea" placeholder="Escribe Markdown aquí..."></textarea>
            </div>

            <!-- Preview -->
            <div class="preview-section">
                <h2>Preview</h2>
                <div id="markdown-preview" class="markdown-preview"></div>
            </div>
        </main>

        <!-- Botones de Exportación -->
        <footer class="footer">
            <button id="export-md" class="export-btn">📥 Descargar .md</button>
            <button id="export-html" class="export-btn">📥 Descargar .html</button>
        </footer>
    </div>

    <!-- Librerías -->
    <script src="https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js"></script>
    
    <!-- Scripts -->
    <script src="js/app.js"></script>
    <script src="js/editor.js"></script>
    <script src="js/preview.js"></script>
    <script src="js/themes.js"></script>
    <script src="js/export.js"></script>
    <script src="js/storage.js"></script>
</body>
</html>
```

4. Guarda (Ctrl+S)

---

## 🎨 PASO 7: Crear CSS Base (3 min)

### 7.1 Crear css/main.css
1. Click derecho en carpeta `css/` → **New File**
2. Nombre: `main.css`
3. Pega este contenido base:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f5f5f5;
    --color-text-primary: #1a1a1a;
    --color-text-secondary: #666666;
    --color-accent: #3498db;
    --color-border: #e0e0e0;
    --spacing-base: 8px;
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    font-family: var(--font-family);
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

/* Toolbar */
.toolbar {
    background-color: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
    padding: var(--spacing-base) calc(var(--spacing-base) * 2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-base);
}

.toolbar h1 {
    font-size: 1.5rem;
    font-weight: 600;
}

.toolbar-right {
    display: flex;
    gap: var(--spacing-base);
    align-items: center;
}

/* Editor Container - 2 Columnas */
.editor-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-base);
    flex: 1;
    padding: var(--spacing-base);
    overflow: hidden;
}

.editor-section,
.preview-section {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    overflow: hidden;
    background-color: var(--color-bg-primary);
}

.editor-section h2,
.preview-section h2 {
    font-size: 0.9rem;
    text-transform: uppercase;
    padding: calc(var(--spacing-base) * 1.5);
    background-color: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
}

.markdown-textarea {
    flex: 1;
    padding: var(--spacing-base);
    border: none;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    resize: none;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    line-height: 1.6;
}

.markdown-textarea:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
}

.markdown-preview {
    flex: 1;
    padding: var(--spacing-base);
    overflow-y: auto;
    line-height: 1.6;
}

/* Footer */
.footer {
    background-color: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-base);
    display: flex;
    gap: var(--spacing-base);
    justify-content: flex-end;
}

/* Botones */
button {
    padding: calc(var(--spacing-base) * 0.75) calc(var(--spacing-base) * 1.5);
    background-color: var(--color-accent);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: opacity 0.2s;
}

button:hover {
    opacity: 0.9;
}

button:active {
    opacity: 0.8;
}

select {
    padding: calc(var(--spacing-base) * 0.75) calc(var(--spacing-base) * 1.5);
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;
}
```

4. Guarda

### 7.2 Crear css/responsive.css
1. Nueva File en `css/`
2. Nombre: `responsive.css`
3. Pega:

```css
/* Tablet (768px) */
@media (max-width: 1024px) {
    .editor-container {
        gap: calc(var(--spacing-base) * 0.5);
    }
}

/* Mobile (320px - 767px) */
@media (max-width: 767px) {
    .editor-container {
        grid-template-columns: 1fr;
    }

    .toolbar {
        flex-direction: column;
        align-items: flex-start;
    }

    .toolbar-right {
        width: 100%;
        justify-content: space-between;
    }
}
```

4. Guarda

### 7.3 Crear css/themes.css
1. Nueva File en `css/`
2. Nombre: `themes.css`
3. Pega (temas básicos, los otros en Sprint 1.4):

```css
/* Light Theme (default) */
:root.theme-light {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f5f5f5;
    --color-text-primary: #1a1a1a;
    --color-text-secondary: #666666;
    --color-accent: #3498db;
    --color-border: #e0e0e0;
}

/* Dark Theme */
:root.theme-dark {
    --color-bg-primary: #1e1e1e;
    --color-bg-secondary: #2d2d2d;
    --color-text-primary: #ffffff;
    --color-text-secondary: #b0b0b0;
    --color-accent: #64b5f6;
    --color-border: #404040;
}

/* Más temas en Sprint 1.4... */
```

4. Guarda

---

## ⚙️ PASO 8: Crear JS Base (3 min)

### 8.1 Crear js/app.js
1. Nueva File en `js/`
2. Nombre: `app.js`
3. Pega:

```javascript
// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Markdown Live Editor iniciado');
    
    // Aquí irán las inicializaciones en próximos sprints
});
```

4. Guarda

### 8.2 Crear archivos JS placeholder
Crea estos archivos vacíos en `js/`:
- `editor.js`
- `preview.js`
- `themes.js`
- `export.js`
- `storage.js`

Con este contenido base en cada uno:
```javascript
// [Nombre del módulo]
console.log('Module loaded: [nombre]');
```

---

## 🧪 PASO 9: Testear Localmente (2 min)

### 9.1 Usar Live Server
1. Click derecho en `index.html` → **Open with Live Server**
2. Se abre navegador automáticamente en `http://localhost:5500`
3. Deberías ver:
   - Header con title
   - 2 columnas vacías
   - Botones en footer

### 9.2 Abrir Console
- Presiona **F12** → **Console**
- Deberías ver: `✅ Markdown Live Editor iniciado`
- Sin errores rojos

---

## 📤 PASO 10: First Commit (2 min)

### 10.1 En Terminal/VSCode
```bash
# Verifica cambios
git status

# Agrega todos los archivos
git add .

# Commit inicial
git commit -m "[FEATURE] Initial project structure and HTML/CSS base"

# Push a GitHub
git push origin main
```

### 10.2 Verifica en GitHub
- Ve a https://github.com/tu-usuario/markdown-live-editor
- Deberías ver todos los archivos

---

## ✨ ¡HECHO! Estás listo para Sprint 1.1

### Ahora puedes:
1. ✅ Proyecto creado en GitHub
2. ✅ Clonado localmente
3. ✅ Estructura de directorios lista
4. ✅ HTML/CSS base funcional
5. ✅ Testeable localmente
6. ✅ Versión en GitHub

### Próximo Paso:
**Abre el README.md** → Ve a **"Checklist de Implementación Fase 1"** → Comienza **Sprint 1.2: Editor Core y Preview**

---

## 🆘 Si Algo No Funciona

| Problema | Solución |
|----------|----------|
| Git no encontrado | Instala Git desde git-scm.com |
| VSCode no abre Live Server | Instala extensión Live Server |
| Errores en navegador | Abre F12 → Console, busca error |
| No ves cambios | Recarga (Ctrl+R) o Ctrl+Shift+R (hard refresh) |
| Puerto 5500 en uso | Usa puerto diferente o mata proceso |

---

## 📚 Próximos Recursos

- **README.md**: Documentación completa
- **Chatmode**: `.github/chatmodes/markdown-live-editor.chatmode.md`
- **Agente**: `.github/agents/markdown-live-editor-AutoDEV.agent.md`
- **Themes Spec**: `docs/themes-specification.md`

---

**Tiempo Total Setup**: ~20 minutos ✅  
**Resultado**: Proyecto listo para Sprint 1.1 ✅

🚀 **¡Adelante con el prototipado!**