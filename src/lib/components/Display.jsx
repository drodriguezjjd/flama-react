import { boolAttr } from '../utils.js'

// ─────────────────────────────────────────────
// FLCard y subcomponentes
// ─────────────────────────────────────────────
/**
 * Tarjeta con borde redondeado y padding.
 *
 * @param {boolean} message  Max-width 500px, centrado (para modales de mensaje)
 * @param {boolean} compact  Sin padding
 * @param {string}  align    left | right (por defecto centrado)
 *
 * @example
 * <FLCard>
 *   <FLCardBody>
 *     <FLCardTitle>Bienvenido</FLCardTitle>
 *     <FLCardDescription>Accede a tu cuenta para continuar.</FLCardDescription>
 *   </FLCardBody>
 *   <FLButtons center>
 *     <FLButton>Ingresar</FLButton>
 *   </FLButtons>
 * </FLCard>
 */
export function FLCard({ message, compact, align, className = '', children, ...props }) {
  return (
    <fl-card
      message={boolAttr(message)}
      compact={boolAttr(compact)}
      align={align}
      class={className}
      {...props}
    >
      {children}
    </fl-card>
  )
}

/** Contenedor de título + mensaje + descripción dentro de FLCard */
export function FLCardBody({ className = '', children, ...props }) {
  return (
    <fl-card-body class={className} {...props}>
      {children}
    </fl-card-body>
  )
}

/**
 * Título grande de la tarjeta.
 * @param {boolean} secondary  Color secundario (teal)
 */
export function FLCardTitle({ secondary, className = '', children, ...props }) {
  return (
    <fl-card-title secundary={boolAttr(secondary)} class={className} {...props}>
      {children}
    </fl-card-title>
  )
}

/** Mensaje principal (font-size normal) */
export function FLCardMessage({ className = '', children, ...props }) {
  return (
    <fl-card-message class={className} {...props}>
      {children}
    </fl-card-message>
  )
}

/** Descripción en gris, tamaño mediano. Puede contener <a> */
export function FLCardDescription({ className = '', children, ...props }) {
  return (
    <fl-card-description class={className} {...props}>
      {children}
    </fl-card-description>
  )
}

// ─────────────────────────────────────────────
// FLList / FLItem
// ─────────────────────────────────────────────
/**
 * Lista de ítems clickeables.
 *
 * @param {boolean} basic  Separadores horizontales en lugar de hover con fondo
 */
export function FLList({ basic, className = '', children, ...props }) {
  return (
    <fl-list basic={boolAttr(basic)} class={className} {...props}>
      {children}
    </fl-list>
  )
}

/**
 * Ítem de lista.
 *
 * @param {boolean}  selected  Fondo rojo permanente
 * @param {function} onClick
 */
export function FLItem({ selected, className = '', children, onClick, ...props }) {
  return (
    <fl-item selected={boolAttr(selected)} class={className} onClick={onClick} {...props}>
      {children}
    </fl-item>
  )
}

// ─────────────────────────────────────────────
// FLIcon
// ─────────────────────────────────────────────
/**
 * Ícono SVG de la librería (24×24 px por defecto).
 *
 * Íconos disponibles:
 * add, calendar, cog, delete, docs, dots, download, email,
 * eye, eye-no, filter, lock, trash, update, user,
 * up, down, left, right, up-small, down-small, left-small, right-small,
 * chevron-down, redable, redable-no, spinner
 *
 * @param {string}  icon     Nombre del ícono
 * @param {boolean} disabled Usa la variante gris deshabilitado
 *
 * @example
 * <FLIcon icon="calendar" />
 * <FLButton outline><FLIcon icon="download" />Exportar</FLButton>
 */
export function FLIcon({ icon, disabled, className = '', ...props }) {
  return (
    <fl-icon icon={icon} disabled={boolAttr(disabled)} class={className} {...props} />
  )
}

// ─────────────────────────────────────────────
// FLDropdown / FLDropbutton
// ─────────────────────────────────────────────
/**
 * Dropdown flotante (se posiciona debajo de fl-input).
 * En general no lo usas directamente; lo maneja FLSelectField.
 *
 * @param {boolean} visible
 */
export function FLDropdown({ visible, className = '', children, ...props }) {
  return (
    <fl-dropdown visible={boolAttr(visible)} class={className} {...props}>
      {children}
    </fl-dropdown>
  )
}

/**
 * Botón desplegable de apariencia neutra (fecha de selección, filtros, etc.)
 */
export function FLDropbutton({ className = '', children, ...props }) {
  return (
    <fl-dropbutton class={className} {...props}>
      {children}
    </fl-dropbutton>
  )
}

// ─────────────────────────────────────────────
// FLTable
// ─────────────────────────────────────────────
/**
 * Tabla con estilos Flama (filas alternas, header gris, bordes suaves).
 *
 * @param {boolean} compact   Padding reducido, sin colores alternos ni header
 * @param {Array}   columns   [{ key: string, label: string, align?: 'left'|'center'|'right' }]
 * @param {Array}   rows      Array de objetos. Cada valor puede ser un ReactNode.
 *
 * @example
 * <FLTable
 *   columns={[
 *     { key: 'name', label: 'Nombre' },
 *     { key: 'amount', label: 'Monto', align: 'right' },
 *     { key: 'status', label: 'Estado', align: 'center' },
 *   ]}
 *   rows={[
 *     { name: 'Juan', amount: '$10.000', status: <FLTag type="active">Activo</FLTag> },
 *   ]}
 * />
 */
export function FLTable({ compact, columns = [], rows = [], className = '', ...props }) {
  return (
    <table flama="" compact={boolAttr(compact)} class={className} {...props}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} align={col.align}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.key} align={col.align}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ─────────────────────────────────────────────
// FLAuth
// ─────────────────────────────────────────────
/**
 * Layout de autenticación de dos columnas.
 * Columna izquierda: imagen de fondo. Columna derecha: formulario.
 *
 * @param {string}  backgroundImage  URL de la imagen izquierda
 * @param {boolean} loading          Muestra spinner y oculta el formulario
 *
 * @example
 * <FLAuth backgroundImage="/img/login-bg.jpg">
 *   <FLTitle clear>Bienvenido</FLTitle>
 *   <FLInputField label="RUT" value={rut} onChange={(e) => setRut(e.target.value)} />
 *   <FLButton>Ingresar</FLButton>
 * </FLAuth>
 */
export function FLAuth({ backgroundImage, loading, className = '', children, ...props }) {
  return (
    <fl-auth class={className} {...props}>
      {backgroundImage && (
        <fl-auth-header style={{ backgroundImage: `url(${backgroundImage})` }} />
      )}
      <fl-auth-body>
        <fl-auth-form loading={boolAttr(loading)}>
          {children}
        </fl-auth-form>
      </fl-auth-body>
    </fl-auth>
  )
}
