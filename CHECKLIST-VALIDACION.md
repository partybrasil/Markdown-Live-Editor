# ✅ Checklist de Validación Pre-Desarrollo

**Proyecto**: Markdown-Live-Editor  
**Fase**: 1 - Prototipado  
**Fecha**: 11 de Noviembre de 2025  
**Propósito**: Asegura que todo está listo antes de comenzar Sprint 1.1

---

## 📋 ARTEFACTOS GENERADOS (7 archivos)

Marca cada uno como ✅ cuando esté copiado/disponible:

- [ ] **README.md** (Raíz) - Documentación principal ~4000 líneas
- [ ] **markdown-live-editor.chatmode.md** (`.github/chatmodes/`) - Guía Copilot Chat
- [ ] **markdown-live-editor-AutoDEV.agent.md** (`.github/agents/`) - Agente autónomo
- [ ] **themes-specification.md** (`docs/`) - Especificación 21 temas
- [ ] **perplexity-space-instructions.md** (`docs/`) - Instrucciones Perplexity Space
- [ ] **RESUMEN-EJECUTIVO.md** - Este archivo de resumen
- [ ] **PRIMEROS-PASOS.md** - Guía setup para desarrolladores

---

## 🔧 SETUP TÉCNICO

### Herramientas Instaladas

- [ ] **Git** - Verificar: `git --version` en terminal
- [ ] **VSCode** - Instalado y funcionando
- [ ] **Node.js** - Opcional (proyecto estático, no requerido)
- [ ] **Navegador Moderno** - Chrome, Firefox, Safari o Edge
- [ ] **Live Server VSCode** - Extensión instalada

### Cuenta y Repositorio

- [ ] **Cuenta GitHub** - Activa y verificada
- [ ] **Repositorio creado** - `markdown-live-editor` público
- [ ] **Repositorio clonado** - Localmente en tu máquina
- [ ] **Rama develop** - Creada localmente (opcional pero recomendado)

```bash
# Verificar:
cd markdown-live-editor
git branch -a
# Deberías ver: main, develop (local)
```

---

## 📁 ESTRUCTURA DE DIRECTORIOS

Marca cada uno como ✅ cuando exista:

```
markdown-live-editor/
├── [ ] index.html
├── [ ] README.md (reemplazado)
├── [ ] LICENSE
├── [ ] .gitignore
│
├── [ ] css/
│   ├── [ ] main.css
│   ├── [ ] themes.css
│   └── [ ] responsive.css
│
├── [ ] js/
│   ├── [ ] app.js
│   ├── [ ] editor.js
│   ├── [ ] preview.js
│   ├── [ ] themes.js
│   ├── [ ] export.js
│   ├── [ ] storage.js
│   ├── [ ] toolbar.js (futuro)
│   ├── [ ] imagehandler.js (futuro)
│   └── [ ] sync.js (futuro)
│
├── [ ] lib/
│   └── (CDNs externas, no necesita archivos)
│
├── [ ] docs/
│   ├── [ ] themes-specification.md
│   ├── [ ] perplexity-space-instructions.md
│   └── [ ] CONTRIBUTING.md (futuro)
│
└── [ ] .github/
    ├── [ ] chatmodes/
    │   └── [ ] markdown-live-editor.chatmode.md
    └── [ ] agents/
        └── [ ] markdown-live-editor-AutoDEV.agent.md
```

### Verificación Rápida
```bash
# En terminal, desde raíz del proyecto:
ls -la | grep -E "^d"  # Muestra directorios
find . -type f -name "*.md" | head -20  # Muestra archivos .md
```

---

## 🔑 CONFIGURACIÓN GITHUB

### Repository Settings

- [ ] **Visibilidad**: Public ✅
- [ ] **Description**: Completada y clara
- [ ] **Homepage**: Dejar vacío (se completará después)
- [ ] **Topics**: Agregar: `markdown`, `editor`, `javascript`, `github-pages`
- [ ] **Default branch**: `main` ✅

### GitHub Pages (Después de Sprint 1.12)

- [ ] **Pages enabled**: No aún (se configurará en Sprint 1.12)
- [ ] **Source branch**: Será `main` o `gh-pages`
- [ ] **Domain**: Será `https://tu-usuario.github.io/markdown-live-editor`

### Branch Protection (Opcional)

- [ ] **Proteger main**: Requiere pull requests para merge
- [ ] **Require status checks**: Para validación futura

---

## 💻 VERIFICACIÓN VSCode

### Extensiones Instaladas

- [ ] **Live Server** - Extensión activa
- [ ] **Prettier** - Formateador (opcional)
- [ ] **ESLint** - Validador JS (opcional)
- [ ] **HTMLHint** - Validador HTML (opcional)
- [ ] **Stylelint** - Validador CSS (opcional)

### Workspace Abierto

- [ ] **Carpeta correcta**: `markdown-live-editor` abierta en VSCode
- [ ] **Archivos visibles**: En File Explorer en la izquierda
- [ ] **Terminal integrada**: Disponible (Ctrl+`)
- [ ] **Sin errores**: No hay indicadores rojos en archivos

### Git Integración

- [ ] **Git detectado**: VSCode muestra icono Git
- [ ] **Rama visible**: En la esquina inferior izquierda
- [ ] **Source Control**: Panel de Git disponible (Ctrl+Shift+G)

---

## 🌐 VERIFICACIÓN LOCAL

### Live Server Funcionando

```bash
# Opción 1: Click derecho en index.html → Open with Live Server

# Opción 2: Terminal en VSCode
# Desde directorio del proyecto
python -m http.server 8000
# O ruby -run -ehttpd . -p8000
```

- [ ] **Servidor levantado**: http://localhost:5500 (Live Server) o http://localhost:8000
- [ ] **Página carga**: Sin errores 404
- [ ] **HTML renderiza**: Ves estructura básica
- [ ] **Console limpia**: F12 → Console sin errores rojos

### Elementos Visibles

- [ ] **Header** con título "📝 Markdown Live Editor"
- [ ] **2 Columnas** (Editor a izq, Preview a der en desktop)
- [ ] **Botones** de exportación en footer
- [ ] **Selectores** de tema y color en toolbar
- [ ] **Responsivo**: Mobile se ve bien (1 columna)

---

## 📱 VERIFICACIÓN RESPONSIVE

### Tamaños a Probar

- [ ] **Mobile** (320px - 480px): En pantalla completa o DevTools
  - Una sola columna (editor arriba, preview abajo)
  - Elementos apilados
  - Botones accesibles

- [ ] **Tablet** (768px - 1024px): 
  - Dos columnas posible
  - Texto legible
  - Espaciado apropiado

- [ ] **Desktop** (1200px+):
  - Dos columnas lado a lado
  - Máximo aprovechamiento de espacio
  - Confortable para escribir

### Herramientas de Prueba

```javascript
// En navegador, Console (F12):
console.log(window.innerWidth + 'x' + window.innerHeight);
// Output: Ej: 768x1024
```

---

## ♿ VERIFICACIÓN ACCESIBILIDAD

### Básico

- [ ] **Tab Navigation**: Todos los botones accesibles por teclado
- [ ] **Labels**: Inputs tienen labels asociados
- [ ] **Contraste**: Texto legible sobre fondo (4.5:1 ratio)
- [ ] **Semantic HTML**: Usa `<button>`, `<header>`, `<main>`, etc.

### Testing Tool

Instala y usa **axe DevTools** Chrome:
- [ ] No hay violaciones críticas
- [ ] No hay violaciones de contraste severas
- [ ] Estructura de heading correcta

---

## 📊 VERIFICACIÓN PERFORMANCE

### Lighthouse (Chrome DevTools)

1. Abre DevTools (F12)
2. Click en **Lighthouse**
3. Click **Analyze page load**

- [ ] **Performance**: >80
- [ ] **Accessibility**: >80
- [ ] **Best Practices**: >80
- [ ] **SEO**: >80

### Assets

- [ ] **JS total**: <100KB (ahora será <1KB, librería external)
- [ ] **CSS total**: <50KB
- [ ] **HTML**: <50KB
- [ ] **Total page load**: <1s

---

## 🔒 VERIFICACIÓN SEGURIDAD

### Básico

- [ ] **HTTPS**: GitHub Pages incluye HTTPS
- [ ] **No eval()**: No usar eval, innerHTML peligroso
- [ ] **Input Validation**: Validar inputs de usuario
- [ ] **No API Keys**: No guardar credentials en código

### Headers (Futuro, GitHub Pages auto)

- [ ] **Content-Security-Policy**: (Futuro)
- [ ] **X-Frame-Options**: (Futuro)

---

## 🧪 VERIFICACIÓN NAVEGADORES

Prueba en al menos 3 navegadores diferentes:

| Navegador | Versión | Desktop | Mobile | Notas |
|-----------|---------|---------|--------|-------|
| Chrome | Latest | [ ] | [ ] | Recomendado |
| Firefox | Latest | [ ] | [ ] | Importante |
| Safari | Latest | [ ] | [ ] | Si tienes Mac |
| Edge | Latest | [ ] | [ ] | Windows |

**Checklist por navegador**:
- [ ] Página carga completamente
- [ ] Layout se ve correcto
- [ ] Botones funcionan (placeholder)
- [ ] No hay errores console
- [ ] Responsive funciona

---

## 🎨 VERIFICACIÓN CSS

### Temas (Básico)

- [ ] **Light theme**: Defecto, se ve claro
- [ ] **Dark theme**: Se ve oscuro y legible
- [ ] **Transiciones suaves**: Al cambiar temas

### Estilos General

- [ ] **Colores consistentes**: Usan variables CSS
- [ ] **Tipografía**: Fuente legible y consistente
- [ ] **Espaciado**: Consistente usando --spacing-base
- [ ] **Bordes y radios**: Consistentes (4px)

---

## 🔗 VERIFICACIÓN GIT

### Configuración

```bash
# Verificar configuración
git config --list | grep user
# Debe mostrar: user.name y user.email

# Si no está configurado:
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

- [ ] **user.name** configurado
- [ ] **user.email** configurado

### Repositorio

```bash
# Verificar remoto
git remote -v
# Debe mostrar: origin https://github.com/tu-usuario/markdown-live-editor.git
```

- [ ] **Origin remoto**: Apunta a tu repositorio
- [ ] **Main branch**: Existe y sincronizada
- [ ] **Archivos commiteados**: Sin cambios pendientes (`git status` limpio)

---

## 📚 VERIFICACIÓN DOCUMENTACIÓN

### Archivos Presentes

- [ ] **README.md**: Contiene roadmap, checklist, instrucciones
- [ ] **LICENSE**: MIT License presente
- [ ] **Chatmode**: Accesible en `.github/chatmodes/`
- [ ] **Agente**: Accesible en `.github/agents/`
- [ ] **Themes Spec**: En `docs/`

### Contenido README

- [ ] Título principal
- [ ] Descripción clara
- [ ] Características listadas
- [ ] Checklist Fase 1 (13 sprints)
- [ ] Estructura proyecto
- [ ] Instalación/uso
- [ ] Licencia y autores

---

## 🎯 VERIFICACIÓN FUNCIONALIDAD HTML

### Elementos Presentes

- [ ] **`<textarea>`** con id `markdown-input`
- [ ] **`<div>`** para preview con id `markdown-preview`
- [ ] **`<select>`** para tema selector
- [ ] **`<button>`** para exportación
- [ ] **Barra de herramientas** (`<header>` o `<nav>`)

### Atributos Correctos

- [ ] IDs únicos en elementos interactivos
- [ ] `data-*` attributes si es necesario
- [ ] `aria-labels` en botones
- [ ] `placeholder` en textarea
- [ ] `type` correcto en inputs

---

## 🚀 CHECKLIST FINAL (Pre Sprint 1.1)

### ¿Estoy Listo?

- [ ] Artefactos generados: 7/7
- [ ] Setup técnico completado
- [ ] Estructura de directorios lista
- [ ] GitHub Pages configurado para después
- [ ] VSCode funcionando con Live Server
- [ ] Verificación local pasada
- [ ] Responsive testeado
- [ ] Accesibilidad básica OK
- [ ] Performance aceptable
- [ ] Git configurado
- [ ] Documentación presente

### Si TODO tiene ✅

**¡ENHORABUENA! Estás listo para comenzar Sprint 1.1**

Sigue los pasos en:
1. **README.md** - "Checklist de Implementación Fase 1"
2. **PRIMEROS-PASOS.md** - Si necesitas ayuda setup
3. **Usa Chatmode** - Para preguntas técnicas

---

## ⏰ TIEMPO ESTIMADO

- Setup Git/GitHub: 5 min
- Estructura directorios: 2 min
- HTML/CSS base: 5 min
- Verificación local: 3 min
- Testing navegadores: 5 min

**TOTAL: ~20 minutos** ✅

---

## 🆘 Problemas Comunes y Soluciones

| Problema | Solución |
|----------|----------|
| Git no reconoce cambios | `git add .` y `git commit -m "msg"` |
| Live Server no abre | Reinstala extensión o usa `python -m http.server` |
| Errores CSS en console | Verifica rutas en `<link>` son relativas correctas |
| Mobile se ve roto | Verifica viewport meta tag en head |
| Temas no cambian | Verifica className en `<html>` cambia a `theme-dark` etc |
| Botones no responden | En Sprint 1.1-1.2 no tienen funcionalidad JS aún |

---

## 📞 Contacto/Ayuda

- **Dudas Técnicas**: Usa Chatmode (`.github/chatmodes/`) en VSCode
- **Arquitectura**: Consulta Agente (`/.github/agents/`)
- **Decisiones Clave**: Usa Perplexity Space
- **Bugs**: Abre Console (F12) y anota el error exacto

---

**Creado**: 11 de Noviembre de 2025  
**Válido Para**: Antes de comenzar Sprint 1.1  
**Próxima Actualización**: Al finalizar Fase 1

✅ **Checklist completado = Proyecto listo para desarrollo**