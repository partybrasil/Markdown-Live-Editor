# Markdown-Live-Editor

**Versión:** 0.1.0 (Fase 1: Prototipado)  
**Estado:** En Desarrollo  
**Última Actualización:** 11 de Noviembre de 2025

## 📋 Descripción del Proyecto

Markdown-Live-Editor es una aplicación web moderna y responsiva que permite editar y previsualizar Markdown en tiempo real. Diseñada como una herramienta estática para alojar en GitHub Pages, proporciona una experiencia de edición fluida con múltiples funcionalidades avanzadas como auto-guardado, temas personalizables, exportación de contenido y más.

### Objetivos Principales
- ✅ Editor Markdown con vista previa sincronizada en tiempo real
- ✅ Interfaz responsiva y moderna (CSS Grid/Flexbox)
- ✅ Almacenamiento local automático con localStorage
- ✅ Sistema de 20+ temas personalizables
- ✅ Exportación de contenido (.md, .html, .pdf)
- ✅ Botones de formateo rápido (encabezados, listas, enlaces, imágenes)
- ✅ Arrastrar y soltar imágenes
- ✅ Desplazamiento sincronizado editor-preview
- ✅ Publicación en GitHub Pages

---

## 🚀 Características (Roadmap)

### Fase 1: Prototipado ✅ (ACTUAL)
- [x] Estructura HTML básica (layout dos columnas)
- [x] Estilización CSS responsiva
- [x] Integración de marked.js para conversión Markdown→HTML
- [x] Actualización en tiempo real del preview
- [x] Diseño responsivo (mobile-first)
- [ ] Auto-guardado en localStorage
- [ ] Sistema de temas (luz, oscuro y 20+ adicionales)
- [ ] Selector de color de texto
- [ ] Botones de formateo rápido
- [ ] Exportación .md, .html
- [ ] Soporte drag-drop de imágenes
- [ ] Desplazamiento sincronizado
- [ ] Highlight de sintaxis Markdown

### Fase 2: Desarrollo 🔄 (Próximo)
- Implementación completa de todas las características de Fase 1
- Optimización de rendimiento
- Mejora de UX/UI
- Testing funcional

### Fase 3: Revisión y Tests ✔️ (Futuro)
- QA completo
- Testing en múltiples navegadores
- Optimización SEO
- Documentación final

---

## 📁 Estructura del Proyecto

```
markdown-live-editor/
├── README.md                           # Este archivo
├── index.html                          # Archivo principal
├── css/
│   ├── main.css                        # Estilos principales
│   ├── themes.css                      # Estilos de temas (20+)
│   └── responsive.css                  # Media queries
├── js/
│   ├── editor.js                       # Lógica del editor
│   ├── preview.js                      # Lógica de preview
│   ├── themes.js                       # Gestor de temas
│   ├── export.js                       # Exportación de contenido
│   ├── storage.js                      # Gestión localStorage
│   └── app.js                          # Inicialización principal
├── lib/
│   ├── marked.min.js                   # Librería Markdown
│   └── pdf-lib.min.js                  # Librería PDF (futuro)
├── .github/
│   ├── chatmodes/
│   │   └── markdown-live-editor.chatmode.md
│   └── agents/
│       └── markdown-live-editor-AutoDEV.agent.md
└── docs/
    └── CONTRIBUTING.md                 # Guía de contribución
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito | Versión |
|-----------|----------|---------|
| HTML5 | Estructura | - |
| CSS3 | Estilización | - |
| JavaScript ES6+ | Lógica de aplicación | - |
| marked.js | Conversión Markdown→HTML | ^11.0.0 |
| localStorage API | Almacenamiento local | Nativo |
| GitHub Pages | Hosting | - |

### Dependencias Planeadas
- **pdf-lib**: Para exportación a PDF
- **CodeMirror o Monaco**: Para highlight de sintaxis (Fase 2+)
- **DOMPurify**: Para sanitización de HTML

---

## 📦 Instalación y Desarrollo Local

### Requisitos Previos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VSCode recomendado)
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/markdown-live-editor.git
   cd markdown-live-editor
   ```

2. **Abrir en el navegador**
   ```bash
   # Opción 1: Abrir directamente index.html
   # Opción 2: Usar servidor local (recomendado)
   python -m http.server 8000
   # Luego visita http://localhost:8000
   ```

3. **Para desarrollo con VSCode**
   - Instalar extensión "Live Server"
   - Click derecho en `index.html` → Open with Live Server

---

## 💻 Uso de la Aplicación

### Editor Básico
1. Escribir Markdown en el panel izquierdo
2. Ver preview HTML en tiempo real en el panel derecho
3. El contenido se auto-guarda en localStorage

### Temas y Personalizacion
- Selector de tema en la barra superior (20+ opciones)
- Selector de color de texto (ciclo de colores)
- Cambios persistentes en localStorage

### Formateo Rápido
- Botones en la barra de herramientas para:
  - Encabezados (H1-H6)
  - Listas (ordenadas/sin ordenar)
  - Negrita, Itálica, Código
  - Enlaces e imágenes
  - Citas de bloque

### Exportación
- **Descargar Markdown**: Guarda el contenido original en .md
- **Descargar HTML**: Guarda el preview renderizado en .html
- **Descargar PDF**: Genera PDF del preview (Fase 2+)

### Arrastrar y Soltar
- Arrastrar imágenes directamente al editor
- Opción de subida local o referencias externas
- Inserción automática de sintaxis ![alt](url)

---

## 🎨 Sistema de Temas

### Temas Incluidos (20+)

#### Temas Base
1. **Light** - Blanco limpio (predeterminado)
2. **Dark** - Gris oscuro
3. **Solarized Light** - Amarillo/marrón cálido
4. **Solarized Dark** - Azul/gris oscuro

#### Temas Modernos
5. **Nord** - Colores árticos
6. **Dracula** - Púrpura/rosa vibrante
7. **One Dark** - Azul/gris profesional
8. **Atom One Light** - Blanco minimalista
9. **Monokai** - Fondo negro clásico
10. **Gruvbox Light** - Retro cálido
11. **Gruvbox Dark** - Retro oscuro

#### Temas Creativos
12. **Ocean** - Azules y turquesas
13. **Forest** - Verdes naturales
14. **Sunset** - Naranjas y rojos
15. **Cyberpunk** - Neón/rosa fuerte
16. **Minimal** - Blanco y negro puro
17. **Pastel** - Colores suaves
18. **High Contrast** - Máximo contraste
19. **Terminal** - Estilo terminal retro
20. **Twilight** - Púrpuras y azules

### Selector de Color de Texto
Ciclo de colores para el texto: Negro → Gris → Azul → Verde → Rojo → Color anterior

---

## 📝 Checklist de Implementación Fase 1

### Estructura y HTML
- [ ] Crear estructura HTML base (2 columnas)
- [ ] Crear textarea para editor
- [ ] Crear div para preview
- [ ] Crear barra de herramientas
- [ ] Crear selectores de tema y color

### Estilos CSS
- [ ] CSS principal (layout, tipografía)
- [ ] CSS responsivo (mobile, tablet, desktop)
- [ ] Estilos para 20+ temas
- [ ] Animaciones suaves
- [ ] Ajustes de accesibilidad

### JavaScript - Core
- [ ] Integrar marked.js
- [ ] Lógica de actualización tiempo real
- [ ] Captura de eventos input
- [ ] Renderizado de HTML en preview

### JavaScript - Características
- [ ] localStorage: guardar/cargar
- [ ] Gestor de temas
- [ ] Selector de color de texto
- [ ] Botones de formateo rápido
- [ ] Exportación .md
- [ ] Exportación .html

### Características Avanzadas
- [ ] Drag-drop de imágenes
- [ ] Desplazamiento sincronizado
- [ ] Highlight de sintaxis (CodeMirror - Fase 2+)
- [ ] Exportación a PDF (Fase 2+)

### Documentación y Publicación
- [ ] README.md completado
- [ ] Chatmode configurado
- [ ] Agente AutoDEV configurado
- [ ] Configurar GitHub Pages
- [ ] Deploy inicial

---

## 🔄 Git Workflow

### Ramas Principales
- `main`: Producción (GitHub Pages)
- `develop`: Desarrollo principal
- `feature/*`: Nuevas características
- `fix/*`: Correcciones de bugs

### Política de Commits
```
[FEATURE] Descripción breve
[FIX] Descripción breve
[DOCS] Descripción breve
[STYLE] Descripción breve
[REFACTOR] Descripción breve
[TEST] Descripción breve
```

---

## 🤝 Contribución

Consulta [CONTRIBUTING.md](./docs/CONTRIBUTING.md) para detalles sobre:
- Cómo reportar bugs
- Cómo proponer nuevas características
- Proceso de pull requests
- Estilo de código

---

## 📚 Documentación Adicional

- [Roadmap Detallado](./docs/ROADMAP.md) - Plan de desarrollo futuro
- [Architecture Decision Records](./docs/ADR.md) - Decisiones técnicas
- [API Reference](./docs/API.md) - Documentación de funciones internas

---

## 🐛 Problemas Conocidos

### Fase 1 (Actual)
- [ ] A completar en primeras versiones

### Soluciones Planeadas
- Soporte offline completo (Service Worker - Fase 2)
- Sincronización en la nube (Fase 3)
- Colaboración en tiempo real (Fase 3+)

---

## 📄 Licencia

MIT License - Ver [LICENSE](./LICENSE) para detalles

---

## 👥 Autor

**Nombre del Proyecto:** Markdown-Live-Editor  
**Estado:** Proyecto de Prototipado  
**Fase Actual:** 1 de 3  
**Inicio del Proyecto:** 11 de Noviembre de 2025

---

## 🔗 Enlaces Útiles

- **GitHub Repository**: https://github.com/tu-usuario/markdown-live-editor
- **GitHub Pages**: https://tu-usuario.github.io/markdown-live-editor
- **Markdown Syntax**: https://www.markdownguide.org/
- **marked.js Docs**: https://marked.js.org/
- **CDN Links**:
  - marked.js: `https://cdn.jsdelivr.net/npm/marked/marked.min.js`

---

## 📞 Soporte

- Abrir un issue en GitHub para reportar bugs
- Usar Discussions para preguntas y sugerencias
- Revisar el chatmode dedicado del proyecto para desarrollo

---

**Última actualización:** 11 de Noviembre de 2025, 14:11 CET  
**Próxima revisión planeada:** Fase 2 - Desarrollo