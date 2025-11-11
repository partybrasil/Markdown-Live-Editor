# 📝 Markdown Live Editor

> Un editor Markdown moderno con vista previa en tiempo real

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://partybrasil.github.io/Markdown-Live-Editor/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Características

- 📝 **Editor en tiempo real** con vista previa sincronizada
- 🎨 **21 temas profesionales** (Light, Dark, Solarized, Nord, Dracula, y más)
- 💾 **Auto-guardado automático** con localStorage
- 📤 **Exportación** a archivos .md y .html
- 🖼️ **Drag & Drop** de imágenes (conversión a base64)
- ⚡ **Botones de formato rápido** (negrita, itálica, listas, enlaces, etc.)
- 🔄 **Scroll sincronizado** entre editor y vista previa
- 🎯 **Paneles colapsables** con efecto cortina
- ⌨️ **Atajos de teclado** para formateo rápido
- 📊 **Contador** de palabras y caracteres
- 📱 **Diseño responsive** para todos los dispositivos
- 🔒 **Sanitización HTML** con DOMPurify para seguridad

## 🚀 Inicio Rápido

### Uso en Línea
Simplemente visita: **https://partybrasil.github.io/Markdown-Live-Editor/**

### Uso Local

```bash
# Clonar el repositorio
git clone https://github.com/partybrasil/Markdown-Live-Editor.git
cd Markdown-Live-Editor

# Abrir con un servidor local
python -m http.server 8080
# O simplemente abre index.html en tu navegador
```

## ⚡ Funcionalidades

### Editor
- ✏️ Edición en tiempo real de Markdown
- 💾 Auto-guardado automático (localStorage)
- 🎨 Selector de color de texto (5 colores)
- ⌨️ Atajos de teclado para formato rápido
- 🖼️ Soporte para drag & drop de imágenes

### Vista Previa
- 👁️ Renderizado en tiempo real con marked.js
- 🔒 Sanitización de HTML con DOMPurify
- 🔄 Scroll sincronizado con el editor
- 🎯 Panel colapsable con efecto cortina

### Temas (21 disponibles)
Light, Dark, Solarized Light, Solarized Dark, Nord, Dracula, One Dark, Atom Light, Monokai, Gruvbox Light, Gruvbox Dark, Ocean, Forest, Sunset, Cyberpunk, Minimal, Pastel, High Contrast, Terminal, Twilight, GitHub

### Exportación
- 📄 Descargar como Markdown (.md)
- 🌐 Descargar como HTML (.html)

### Atajos de Teclado
- `Ctrl+B` - Negrita
- `Ctrl+I` - Itálica
- `Ctrl+K` - Enlace
- `Ctrl+1/2/3` - Encabezados H1/H2/H3
- `Ctrl+U` - Lista sin ordenar
- `Ctrl+O` - Lista ordenada
- `Ctrl+Q` - Cita
- `Ctrl+H` - Separador horizontal

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables y flexbox
- **JavaScript ES6+** - Lógica de la aplicación
- **marked.js** - Conversión Markdown → HTML
- **DOMPurify** - Sanitización HTML para seguridad
- **GitHub Pages** - Hosting estático

## 📁 Estructura del Proyecto

```
Markdown-Live-Editor/
├── index.html              # Página principal
├── README.md               # Este archivo
├── LICENSE                 # Licencia MIT
├── css/
│   ├── main.css           # Estilos principales
│   ├── themes.css         # Sistema de temas
│   └── responsive.css     # Diseño responsive
├── js/
│   ├── app.js             # Inicialización
│   ├── editor.js          # Lógica del editor
│   ├── preview.js         # Renderizado de vista previa
│   ├── themes.js          # Gestor de temas
│   ├── toolbar.js         # Botones de formato
│   ├── export.js          # Exportación de archivos
│   ├── storage.js         # Auto-guardado
│   ├── imagehandler.js    # Manejo de imágenes
│   ├── sync.js            # Sincronización de scroll
│   ├── panelToggle.js     # Colapso de paneles
│   └── utils.js           # Utilidades
└── lib/
    ├── marked.min.js      # Librería Markdown
    └── purify.min.js      # Sanitización HTML
```

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Party Brasil**
- GitHub: [@partybrasil](https://github.com/partybrasil)
- Proyecto: [Markdown-Live-Editor](https://github.com/partybrasil/Markdown-Live-Editor)

## 🙏 Agradecimientos

- [marked.js](https://marked.js.org/) - Markdown parser
- [DOMPurify](https://github.com/cure53/DOMPurify) - HTML sanitizer
- GitHub Pages - Hosting gratuito

## 📊 Estado del Proyecto

**Versión Actual:** 1.0.0  
**Estado:** ✅ Production Ready  
**Última Actualización:** Noviembre 2025

### Características Implementadas
- ✅ Editor en tiempo real
- ✅ 21 temas personalizables
- ✅ Exportación MD/HTML
- ✅ Drag & Drop de imágenes
- ✅ Auto-guardado
- ✅ Scroll sincronizado
- ✅ Paneles colapsables con efecto cortina
- ✅ Diseño responsive
- ✅ Atajos de teclado

---

**¿Encontraste un bug o tienes una sugerencia?** Abre un [issue](https://github.com/partybrasil/Markdown-Live-Editor/issues)
