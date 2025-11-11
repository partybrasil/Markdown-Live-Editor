# 🎨 Especificación de 20+ Temas - Markdown-Live-Editor

**Versión:** 1.0  
**Fecha:** 11 de Noviembre de 2025

---

## Estructura CSS de Temas

Cada tema se define mediante una clase CSS y un conjunto de variables CSS que se aplican al elemento raíz:

```css
/* Tema Base (Light) */
:root.theme-light {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-accent: #3498db;
  --color-border: #e0e0e0;
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:root.theme-dark {
  --color-bg-primary: #1e1e1e;
  --color-bg-secondary: #2d2d2d;
  --color-text-primary: #ffffff;
  --color-text-secondary: #b0b0b0;
  --color-accent: #64b5f6;
  --color-border: #404040;
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

---

## Lista de 20+ Temas Disponibles

### Temas Base (4)

#### 1. **Light** (Defecto)
- Descripción: Tema claro limpio y profesional
- Fondo: Blanco (#ffffff)
- Texto: Gris oscuro (#1a1a1a)
- Acentos: Azul claro (#3498db)
- Uso: General, mejor para luz natural

**Palette CSS:**
```css
.theme-light {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent: #3498db;
  --border: #e0e0e0;
}
```

#### 2. **Dark**
- Descripción: Tema oscuro cómodo para la vista
- Fondo: Gris oscuro (#1e1e1e)
- Texto: Blanco (#ffffff)
- Acentos: Azul brillante (#64b5f6)
- Uso: Sesiones nocturnas, reducir fatiga ocular

**Palette CSS:**
```css
.theme-dark {
  --bg-primary: #1e1e1e;
  --text-primary: #ffffff;
  --accent: #64b5f6;
  --border: #404040;
}
```

#### 3. **Solarized Light**
- Descripción: Tema cálido con colores armoniosos
- Fondo: Crema (#fdf6e3)
- Texto: Marrón oscuro (#657b83)
- Acentos: Azul cálido (#268bd2)
- Uso: Lectura prolongada, confort visual

**Palette CSS:**
```css
.theme-solarized-light {
  --bg-primary: #fdf6e3;
  --text-primary: #657b83;
  --accent: #268bd2;
  --border: #eee8d5;
}
```

#### 4. **Solarized Dark**
- Descripción: Tema oscuro con tonos cálidos
- Fondo: Gris muy oscuro (#002b36)
- Texto: Gris claro (#839496)
- Acentos: Cian (#2aa198)
- Uso: Profesionales nocturno, diseño editorial

**Palette CSS:**
```css
.theme-solarized-dark {
  --bg-primary: #002b36;
  --text-primary: #839496;
  --accent: #2aa198;
  --border: #073642;
}
```

---

### Temas Modernos (8)

#### 5. **Nord**
- Descripción: Paleta ártica minimalista
- Fondo: Azul grisáceo oscuro (#2e3440)
- Texto: Blanco nieve (#eceff4)
- Acentos: Azul polar (#88c0d0)
- Uso: Developers, ambientes profesionales

#### 6. **Dracula**
- Descripción: Tema vibrante con colores neon
- Fondo: Gris casi negro (#282a36)
- Texto: Blanco (#f8f8f2)
- Acentos: Magenta (#ff79c6)
- Uso: IDEs populares, developers

#### 7. **One Dark**
- Descripción: Tema profesional y equilibrado
- Fondo: Gris oscuro (#282c34)
- Texto: Gris claro (#abb2bf)
- Acentos: Azul (#61afef)
- Uso: Atom editor, desarrollo profesional

#### 8. **Atom One Light**
- Descripción: Minimalista claro y elegante
- Fondo: Blanco casi puro (#fafafa)
- Texto: Gris muy oscuro (#383a42)
- Acentos: Azul (#0184bc)
- Uso: Desarrollo de día, lectura

#### 9. **Monokai**
- Descripción: Clásico editor oscuro
- Fondo: Negro (#272822)
- Texto: Blanco hueso (#f8f8f2)
- Acentos: Verde lima (#a1efe4)
- Uso: Terminal, editors clásicos

#### 10. **Gruvbox Light**
- Descripción: Retro cálido con tonos tierra
- Fondo: Crema (#fbf1c7)
- Texto: Marrón oscuro (#3c3836)
- Acentos: Naranja (#d65d0e)
- Uso: Retro-computing, diseño vintage

#### 11. **Gruvbox Dark**
- Descripción: Retro oscuro con personalidad
- Fondo: Marrón oscuro (#282828)
- Texto: Crema (#ebdbb2)
- Acentos: Naranja (#d65d0e)
- Uso: Vintage, nostálgia, confort

#### 12. **Material**
- Descripción: Tema basado en Material Design
- Fondo: Azul gris (#263238)
- Texto: Azul claro (#eeffff)
- Acentos: Cian (#26c6da)
- Uso: Diseño moderno, Material Design

---

### Temas Creativos (8+)

#### 13. **Ocean**
- Descripción: Tema inspirado en el océano
- Fondo: Azul profundo (#0a192f)
- Texto: Cian claro (#64ffda)
- Acentos: Azul turquesa (#1da1f2)
- Uso: Creativos, diseñadores, artistas

#### 14. **Forest**
- Descripción: Verdes naturales y relajantes
- Fondo: Verde muy oscuro (#0d2818)
- Texto: Verde claro (#a1f0a1)
- Acentos: Verde lima (#39ff14)
- Uso: Naturaleza, bienestar, relajación

#### 15. **Sunset**
- Descripción: Naranjas y rojos cálidos
- Fondo: Marrón oscuro (#3a2a20)
- Texto: Naranja claro (#ffb366)
- Acentos: Rojo (#ff6b6b)
- Uso: Creativos, calidez, energía

#### 16. **Cyberpunk**
- Descripción: Neon fuerte y futurista
- Fondo: Negro puro (#000000)
- Texto: Rosa neón (#ff006e)
- Acentos: Cian neón (#00f5ff)
- Uso: Futurista, gaming, cyberpunk

#### 17. **Minimal**
- Descripción: Blanco y negro puro
- Fondo: Blanco (#ffffff)
- Texto: Negro (#000000)
- Acentos: Gris medio (#808080)
- Uso: Minimalismo, confianza, claridad

#### 18. **Pastel**
- Descripción: Colores suaves y delicados
- Fondo: Lavanda clara (#f5e6ff)
- Texto: Púrpura suave (#5a4a6b)
- Acentos: Rosa pastel (#ffc0d9)
- Uso: Diseño suave, feminas, delicadeza

#### 19. **High Contrast**
- Descripción: Máximo contraste para accesibilidad
- Fondo: Negro puro (#000000)
- Texto: Amarillo (#ffff00)
- Acentos: Blanco (#ffffff)
- Uso: Accesibilidad, baja visión, discapacitados

#### 20. **Terminal**
- Descripción: Estilo terminal/DOS retro
- Fondo: Negro (#000000)
- Texto: Verde lima (#00ff00)
- Acentos: Amarillo (#ffff00)
- Uso: Retro, terminal, vintage computing

#### 21. **Twilight**
- Descripción: Púrpuras y azules al atardecer
- Fondo: Púrpura oscuro (#1e1e3f)
- Texto: Lavanda (#d4c5f9)
- Acentos: Púrpura brillante (#9370db)
- Uso: Creativos, diseño, ambientación

---

## Sistema de Selector de Color de Texto

Además de los temas, hay un **selector de color de texto** que cicla entre:

1. **Negro** (#1a1a1a) - Default
2. **Gris** (#666666)
3. **Azul** (#3498db)
4. **Verde** (#27ae60)
5. **Rojo** (#e74c3c)
6. **Púrpura** (#8e44ad)
7. **Naranja** (#e67e22)

Cada click en el botón "Cycle Color" avanza al siguiente color, volviendo a negro después del último.

```javascript
const colorCycle = [
  '#1a1a1a', // Negro
  '#666666', // Gris
  '#3498db', // Azul
  '#27ae60', // Verde
  '#e74c3c', // Rojo
  '#8e44ad', // Púrpura
  '#e67e22'  // Naranja
];

let currentColorIndex = 0;

function cycleTextColor() {
  currentColorIndex = (currentColorIndex + 1) % colorCycle.length;
  const color = colorCycle[currentColorIndex];
  document.documentElement.style.setProperty('--text-primary', color);
  localStorage.setItem('textColor', color);
}
```

---

## Implementación en HTML/CSS

### HTML Selector
```html
<div class="theme-selector">
  <label for="theme-dropdown">Tema:</label>
  <select id="theme-dropdown" class="theme-dropdown">
    <option value="light" selected>Light (Claro)</option>
    <option value="dark">Dark (Oscuro)</option>
    <option value="solarized-light">Solarized Light</option>
    <option value="solarized-dark">Solarized Dark</option>
    <option value="nord">Nord</option>
    <option value="dracula">Dracula</option>
    <option value="one-dark">One Dark</option>
    <option value="atom-light">Atom One Light</option>
    <option value="monokai">Monokai</option>
    <option value="gruvbox-light">Gruvbox Light</option>
    <option value="gruvbox-dark">Gruvbox Dark</option>
    <option value="material">Material</option>
    <option value="ocean">Ocean</option>
    <option value="forest">Forest</option>
    <option value="sunset">Sunset</option>
    <option value="cyberpunk">Cyberpunk</option>
    <option value="minimal">Minimal</option>
    <option value="pastel">Pastel</option>
    <option value="high-contrast">High Contrast</option>
    <option value="terminal">Terminal</option>
    <option value="twilight">Twilight</option>
  </select>
</div>

<button id="color-cycle-btn" class="color-cycle-btn" title="Cambiar color de texto">
  🎨 Cambiar Color
</button>
```

### JavaScript Manager
```javascript
class ThemeManager {
  constructor() {
    this.themeKey = 'selectedTheme';
    this.colorKey = 'textColor';
    this.themes = [
      'light', 'dark', 'solarized-light', 'solarized-dark',
      'nord', 'dracula', 'one-dark', 'atom-light', 'monokai',
      'gruvbox-light', 'gruvbox-dark', 'material',
      'ocean', 'forest', 'sunset', 'cyberpunk',
      'minimal', 'pastel', 'high-contrast', 'terminal', 'twilight'
    ];
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    const savedColor = localStorage.getItem(this.colorKey);
    
    this.applyTheme(savedTheme);
    if (savedColor) {
      document.documentElement.style.setProperty('--text-primary', savedColor);
    }
  }

  applyTheme(themeName) {
    document.documentElement.className = `theme-${themeName}`;
    localStorage.setItem(this.themeKey, themeName);
  }

  getAllThemes() {
    return this.themes;
  }
}
```

---

## Prueba de Contraste y Accesibilidad

Cada tema debe cumplir:
- ✅ Ratio de contraste WCAG AA (4.5:1 mínimo)
- ✅ Diferenciación cromática (no solo color)
- ✅ Legibilidad en pantallas pequeñas
- ✅ Distinción editor/preview clara

---

## Archivo CSS Completo (Estructura)

```css
/* ========== VARIABLE DEFINITIONS POR TEMA ========== */

:root.theme-light {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --accent: #3498db;
  --border: #e0e0e0;
  --syntax-keyword: #0184bc;
  --syntax-string: #50a14f;
  --syntax-comment: #a0a1a7;
}

:root.theme-dark {
  --bg-primary: #1e1e1e;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --accent: #64b5f6;
  --border: #404040;
  --syntax-keyword: #569cd6;
  --syntax-string: #ce9178;
  --syntax-comment: #6a9955;
}

/* ... más temas ... */

/* ========== APLICACIÓN DE VARIABLES ========== */

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border);
}

.editor {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.preview {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

button {
  background-color: var(--accent);
  color: var(--bg-primary);
  border: 1px solid var(--border);
}

/* ... más selectores ... */
```

---

## Transición Suave Entre Temas

```css
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

## Integración con localStorage

```javascript
// Guardar tema seleccionado
localStorage.setItem('selectedTheme', 'dark');
localStorage.setItem('textColor', '#3498db');

// Cargar al iniciar
const theme = localStorage.getItem('selectedTheme') || 'light';
const color = localStorage.getItem('textColor') || '#1a1a1a';

document.documentElement.className = `theme-${theme}`;
document.documentElement.style.setProperty('--text-primary', color);
```

---

## Checklist de Implementación de Temas

- [ ] Crear variables CSS para los 21 temas
- [ ] Implementar selector dropdown HTML
- [ ] Crear ThemeManager.js
- [ ] Guardar/cargar de localStorage
- [ ] Validar contraste WCAG AA
- [ ] Testear en navegadores principales
- [ ] Agregar transiciones suaves
- [ ] Documentar selector de color
- [ ] Crear interfaz de color cycle
- [ ] Garantizar accesibilidad keyboard

---

**Última actualización:** 11 de Noviembre de 2025