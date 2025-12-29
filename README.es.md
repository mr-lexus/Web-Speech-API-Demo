# Demo de Web Speech API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

🌍 **Disponible en múltiples idiomas:** [English](README.md) | [Беларуская](README.be.md) | [Українська](README.uk.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Polski](README.pl.md) | [Español](README.es.md)

Una demostración completa de las capacidades de Web Speech API, mostrando tanto las funciones de reconocimiento de voz como de síntesis de voz. Construido con Vue 3, TypeScript y tecnologías web modernas.

🌐 **[Demo en vivo](https://mr-lexus.github.io/Web-Speech-API-Demo/)** - ¡Pruébalo ahora!

## 🚀 Características

### 🎤 Reconocimiento de voz
- **Conversión de voz a texto en tiempo real**
- **Soporte multiidioma** (ruso, inglés, alemán, francés)
- **Modo de reconocimiento continuo**
- **Manejo de errores** con mensajes amigables al usuario
- **Gestión de permisos del micrófono**

### 🔊 Síntesis de voz
- **Conversión de texto a voz**
- **Selección de voz** de las voces del sistema disponibles
- **Parámetros ajustables**: velocidad, tono, volumen
- **Frases rápidas predefinidas** para pruebas
- **Controles de reproducción**: reproducir, pausar, reanudar, detener

### 🌐 Internacionalización
- **7 idiomas soportados**: inglés, bielorruso, ucraniano, alemán, francés, polaco, español
- **Cambio dinámico de idioma**
- **Interfaz y mensajes localizados**
- **Detección del idioma del navegador**

### 🎨 UI/UX moderno
- **Diseño responsivo** para todos los tamaños de dispositivos
- **Hermosos fondos degradados**
- **Animaciones y transiciones suaves**
- **Interfaz accesible**
- **Metodología BEM** para organización CSS

## 🛠️ Stack tecnológico

- **Framework Frontend**: Vue 3 (Composition API)
- **Lenguaje**: TypeScript
- **Herramienta de construcción**: Vite
- **Estilos**: SCSS con metodología BEM
- **Internacionalización**: Vue I18n
- **Testing**: Jest con Vue Test Utils
- **Calidad de código**: ESLint, Stylelint
- **Gestor de paquetes**: Yarn

## 📋 Prerrequisitos

- Node.js 18+ 
- Gestor de paquetes Yarn
- Navegador moderno con soporte para Web Speech API:
  - Chrome 25+
  - Firefox 44+
  - Safari 14.1+
  - Edge 79+

## 🚀 Inicio rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mr-lexus/Web-Speech-API-Demo.git
cd Web-Speech-API-Demo

# Instalar dependencias
yarn install

# Iniciar servidor de desarrollo
yarn dev
```

### Scripts disponibles

```bash
# Desarrollo
yarn dev          # Iniciar servidor de desarrollo
yarn build        # Construir para producción
yarn preview      # Vista previa del build de producción

# Testing
yarn test         # Ejecutar tests
yarn test:watch   # Ejecutar tests en modo watch
yarn test:ci      # Ejecutar tests para CI

# Calidad de código
yarn lint:style   # Verificar y corregir estilos
```

## 🏗️ Estructura del proyecto

```
src/
├── app/                    # Capa de aplicación
│   ├── App.vue            # Componente raíz
│   └── styles/            # Estilos globales
├── widgets/               # Widgets de funcionalidades
│   ├── speech-recognition/
│   │   ├── ui/           # Componentes UI
│   │   └── model/        # Lógica de negocio
│   └── speech-synthesis/
│       ├── ui/           # Componentes UI
│       └── model/        # Lógica de negocio
└── shared/               # Recursos compartidos
    ├── i18n/            # Internacionalización
    │   ├── locales/     # Archivos de traducción
    │   └── index.ts     # Configuración i18n
    └── ui/              # Componentes UI compartidos
```

## 🌐 Compatibilidad de navegadores

### Reconocimiento de voz
| Navegador | Soporte | Notas |
|-----------|---------|-------|
| Chrome    | ✅ 25+  | Soporte completo |
| Firefox   | ❌      | No soportado |
| Safari    | ❌      | No soportado |
| Edge      | ✅ 79+  | Basado en Chromium |

### Síntesis de voz
| Navegador | Soporte | Notas |
|-----------|---------|-------|
| Chrome    | ✅ 33+  | Soporte completo |
| Firefox   | ✅ 49+  | Soporte completo |
| Safari    | ✅ 7+   | Soporte completo |
| Edge      | ✅ 14+  | Soporte completo |

## 🔧 Configuración

### Configuración de idioma

La aplicación detecta automáticamente el idioma del navegador y vuelve al inglés si el idioma detectado no es compatible. Puedes cambiar manualmente el idioma usando el selector de idioma en el encabezado.

### Agregar nuevos idiomas

1. Crea un nuevo archivo de traducción en `src/shared/i18n/locales/`
2. Agrega el idioma al array `availableLanguages` en `src/shared/i18n/index.ts`
3. Importa el archivo de traducción en el mismo archivo índice

## 🧪 Testing

El proyecto incluye tests completos para todos los componentes y composables:

```bash
# Ejecutar todos los tests
yarn test

# Ejecutar tests con cobertura
yarn test --coverage

# Ejecutar archivo de test específico
yarn test SpeechRecognitionWidget.test.ts
```

## 🚀 Despliegue

### GitHub Pages

1. Construir el proyecto:
   ```bash
   yarn build
   ```

2. Desplegar en GitHub Pages:
   ```bash
   # La carpeta dist/ contiene la aplicación construida
   # Configura los ajustes de tu repositorio para servir desde la carpeta dist
   ```

### Otras plataformas

La aplicación construida en la carpeta `dist/` puede ser desplegada en cualquier servicio de hosting estático:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- Y muchos otros

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request. Para cambios importantes, por favor abre primero un issue para discutir lo que te gustaría cambiar.

### Pautas de desarrollo

1. **Estilo de código**: Sigue el estilo de código existente y usa ESLint/Stylelint
2. **Commits**: Usa mensajes de commit convencionales
3. **Testing**: Agrega tests para nuevas funcionalidades
4. **Documentación**: Actualiza la documentación para cambios significativos

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- Documentación de [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- Equipo de [Vue.js](https://vuejs.org/) por el increíble framework
- [Vue I18n](https://vue-i18n.intlify.dev/) por el soporte de internacionalización
- Todos los contribuidores que ayudan a mejorar este proyecto

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, por favor:

1. Revisa la página de [Issues](https://github.com/mr-lexus/Web-Speech-API-Demo/issues)
2. Crea un nuevo issue si tu pregunta aún no tiene respuesta
3. Proporciona tantos detalles como sea posible sobre tu problema

---

**Hecho con ❤️ y tecnologías web modernas**
