# 🔥 Flama React

Librería de componentes **React** basada en [Flama CSS](https://github.com/tu-usuario/flama-css) — UI declarativa con custom elements y atributos semánticos.

Diseñada para construir interfaces consistentes, modulares y declarativas.

---

## 📦 Instalación

```bash
npm install
npm run dev
```

## 🚀 Inicio rápido

1. Incluye `flama.css` en tu `index.html` (o importa desde el paquete CSS):

```html
<link rel="stylesheet" href="/flama/flama.css" />
```

2. Importa los componentes que necesites:

```jsx
import { FLButton, FLInputField, FLCard, FLTip } from './src/lib'

function MyPage() {
  return (
    <FLCard>
      <FLTip visible type="info">Completa el formulario.</FLTip>
      <FLInputField label="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <FLButton>Guardar</FLButton>
    </FLCard>
  )
}
```

---

## 🧩 Componentes

### Layout

| Componente | Props clave | Descripción |
|-----------|-------------|-------------|
| `FLBody` | `compact` | Contenedor principal de la app |
| `FLTitle` | `clear` | Título con línea roja decorativa |
| `FLSubtitle` | — | Subtítulo bold |
| `FLRow` | `center` | Fila flexible (gap 40px) |
| `FLCol` | `size`, `fill` | Columna dentro de FLRow |
| `FLSection` | `title`, `clear`, `compact` | Contenedor con borde redondeado |
| `FLSections` | — | Grupo de secciones en fila |
| `FLData` | `label`, `money`, `method`, `inline` | Bloque de dato etiquetado |
| `FLPayment` | `method` | Ícono de método de pago |
| `FLGetnet` | `size` | Logo Getnet |

### Botones

| Componente | Props clave | Descripción |
|-----------|-------------|-------------|
| `FLButton` | `small`, `compact`, `outline`, `clear`, `primary`, `disabled` | Botón principal |
| `FLButtons` | `center`, `separate`, `vertical` | Contenedor de botones |
| `FLAction` | `icon`, `main`, `badge`, `avatar`, `disabled` | Botón circular con ícono |
| `FLActions` | — | Fila de FLAction |

### Formularios

| Componente | Props clave | Descripción |
|-----------|-------------|-------------|
| `FLInput` | `label`, `icon`, `compact`, `disabled`, `error` | Wrapper de input |
| `FLInputField` | `label`, `icon`, `type`, `value`, `onChange`, `clearable`, `password`, `error`, `disabled` | Input controlado completo |
| `FLSelectField` | `label`, `value`, `onChange`, `options`, `error`, `disabled` | Select con dropdown React |
| `FLCheck` | `type`, `label`, `checked`, `onChange`, `disabled` | Checkbox / Radio estilizado |
| `FLChecks` | `label` | Grupo de checks en fila |

### Feedback

| Componente | Props clave | Descripción |
|-----------|-------------|-------------|
| `FLTip` | `visible`, `type` | Alerta inline (correct/error/warn/info) |
| `FLTag` | `type` | Etiqueta de estado |
| `FLSpinner` | `size` | Spinner inline |
| `FLLoader` | `visible`, `message` | Overlay de carga global |
| `FLModal` | `visible`, `onClose` | Modal overlay |

### Navegación

| Componente | Props clave | Descripción |
|-----------|-------------|-------------|
| `FLMenu` | — | Barra de navegación superior |
| `FLMenuItems` | `items`, `active`, `onChange` | Ítems del menú |
| `FLUser` | `label`, `name` | Bloque de usuario |
| `FLTabs` | `tabs`, `active`, `onChange` | Pestañas |
| `FLBreadcrumbs` | `items` | Breadcrumbs |
| `FLPaginator` | `total`, `current`, `onChange`, `range` | Paginador completo |
| `FLNav` | `visible` | Menú flotante |
| `FLNavItem` | `type`, `selected`, `onClick` | Ítem de menú flotante |

### Visualización

| Componente | Props clave | Descripción |
|-----------|-------------|-------------|
| `FLCard` | `message`, `compact`, `align` | Tarjeta |
| `FLCardBody` | — | Contenedor interno de tarjeta |
| `FLCardTitle` | `secondary` | Título de tarjeta |
| `FLCardMessage` | — | Mensaje principal |
| `FLCardDescription` | — | Descripción en gris |
| `FLList` | `basic` | Lista de ítems |
| `FLItem` | `selected`, `onClick` | Ítem de lista |
| `FLIcon` | `icon`, `disabled` | Ícono SVG |
| `FLDropdown` | `visible` | Dropdown flotante |
| `FLDropbutton` | — | Botón desplegable |
| `FLTable` | `columns`, `rows`, `compact` | Tabla estilizada |
| `FLAuth` | `backgroundImage`, `loading` | Layout de autenticación |

---

## 🎨 Íconos disponibles

```
add, calendar, cog, delete, docs, dots, download, email,
eye, eye-no, filter, lock, trash, update, user,
up, down, left, right, up-small, down-small, left-small, right-small,
chevron-down, redable, redable-no, spinner
```

**Uso:**
```jsx
<FLIcon icon="calendar" />
<FLButton outline><FLIcon icon="download" />Exportar</FLButton>
```

---

## 🪝 Hook `useFlama`

Utilidad para manejar estado de loader y modales:

```jsx
import { useFlama } from './src/lib'

function MyComponent() {
  const { loading, setLoading, modal, openModal, closeModal } = useFlama()

  const handleSave = async () => {
    setLoading(true)
    await saveData()
    setLoading(false)
  }

  const handleDelete = () => {
    openModal({
      title: 'Eliminar registro',
      message: '¿Estás seguro?',
      onAccept: () => { deleteRecord(); closeModal() },
      onCancel: closeModal,
    })
  }

  return (
    <>
      <FLLoader visible={loading} message="Guardando..." />
      <FLModal visible={modal.visible} onClose={closeModal}>
        <FLCard message>
          <FLCardBody>
            <FLCardTitle>{modal.title}</FLCardTitle>
            <FLCardMessage>{modal.message}</FLCardMessage>
          </FLCardBody>
          <FLButtons center>
            <FLButton small outline onClick={modal.onCancel}>Cancelar</FLButton>
            <FLButton small onClick={modal.onAccept}>Aceptar</FLButton>
          </FLButtons>
        </FLCard>
      </FLModal>
    </>
  )
}
```

---

## 📁 Estructura del proyecto

```
flama-react/
├── public/
│   └── flama/               # Assets originales de Flama CSS
│       ├── flama.css
│       ├── icon/
│       ├── spinner/
│       ├── tip/
│       ├── payment/
│       └── font/
├── src/
│   ├── lib/                 # 📦 Librería de componentes
│   │   ├── index.js         # Barrel de exports
│   │   ├── utils.js
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Buttons.jsx
│   │   │   ├── Form.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Display.jsx
│   │   └── hooks/
│   │       └── useFlama.js
│   ├── demo/                # 🎨 Demo interactiva
│   │   └── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js           # Config para la demo
├── vite.lib.config.js       # Config para compilar como librería
└── package.json
```

---

## 🏗️ Compilar como librería

```bash
npm run build:lib
```

Genera `dist/flama-react.es.js` y `dist/flama-react.umd.js`.

---

## 📄 Licencia

MIT — Diego Rodriguez <diego.rodriguez.gomez@gmail.com>
