import { boolAttr } from '../utils.js'

// ─────────────────────────────────────────────
// FLMenu
// ─────────────────────────────────────────────
/**
 * Barra de navegación horizontal superior (altura 50px).
 *
 * @example
 * <FLMenu>
 *   <img src="/logo.svg" height={28} alt="Logo" />
 *   <FLMenuItems
 *     items={[{ label: 'Inicio' }, { label: 'Clientes' }]}
 *     active={activeTab}
 *     onChange={setActiveTab}
 *   />
 *   <FLUser label="Administrador" name="Juan Pérez" />
 *   <FLAction icon="cog" main />
 * </FLMenu>
 */
export function FLMenu({ className = '', children, ...props }) {
  return (
    <fl-menu class={className} {...props}>
      {children}
    </fl-menu>
  )
}

/**
 * Contenedor de ítems del menú principal.
 *
 * @param {number}   active    Índice del ítem activo (subrayado rojo)
 * @param {function} onChange  (index) => void
 * @param {Array}    items     [{ label: string, indicator?: boolean }]
 *                             indicator agrega flecha chevron
 */
export function FLMenuItems({ active, onChange, items = [], className = '', children, ...props }) {
  if (items.length > 0) {
    return (
      <fl-menu-items class={className} {...props}>
        {items.map((item, i) => (
          <fl-menu-item
            key={i}
            selected={boolAttr(i === active)}
            indicator={boolAttr(item.indicator)}
            onClick={() => onChange?.(i)}
          >
            {item.label}
          </fl-menu-item>
        ))}
      </fl-menu-items>
    )
  }
  return (
    <fl-menu-items class={className} {...props}>
      {children}
    </fl-menu-items>
  )
}

// ─────────────────────────────────────────────
// FLUser
// ─────────────────────────────────────────────
/**
 * Bloque de usuario (nombre + rol) alineado a la derecha,
 * con separador vertical a la izquierda.
 *
 * @param {string} label  Rol o cargo (texto pequeño, arriba)
 * @param {string} name   Nombre del usuario (texto bold, abajo)
 */
export function FLUser({ label, name, className = '', ...props }) {
  return (
    <fl-user class={className} {...props}>
      {label && <fl-user-label>{label}</fl-user-label>}
      {name && <fl-user-name>{name}</fl-user-name>}
    </fl-user>
  )
}

// ─────────────────────────────────────────────
// FLTabs
// ─────────────────────────────────────────────
/**
 * Pestañas de navegación (borde rojo en la activa).
 *
 * @param {number}   active    Índice de la pestaña activa
 * @param {function} onChange  (index) => void
 * @param {Array}    tabs      Array de strings (nombre de cada pestaña)
 *
 * @example
 * <FLTabs
 *   tabs={['Datos', 'Historial', 'Documentos']}
 *   active={tab}
 *   onChange={setTab}
 * />
 */
export function FLTabs({ active = 0, onChange, tabs = [], className = '', ...props }) {
  return (
    <fl-tabs class={className} {...props}>
      {tabs.map((tab, i) => (
        <fl-tab
          key={i}
          selected={boolAttr(i === active)}
          onClick={() => onChange?.(i)}
        >
          {tab}
        </fl-tab>
      ))}
    </fl-tabs>
  )
}

// ─────────────────────────────────────────────
// FLBreadcrumbs
// ─────────────────────────────────────────────
/**
 * Breadcrumbs de navegación.
 *
 * @param {Array} items  [{ label: string, onClick?: fn, back?: boolean }]
 *                       back: aplica estilo de "Volver" (rojo, flecha izquierda)
 *                       El último ítem se resalta automáticamente como activo.
 *
 * @example
 * <FLBreadcrumbs items={[
 *   { label: 'Clientes', onClick: () => navigate('/clientes') },
 *   { label: 'Ver cliente' },
 * ]} />
 */
export function FLBreadcrumbs({ items = [], className = '', ...props }) {
  return (
    <fl-breadcrumbs class={className} {...props}>
      {items.map((item, i) => (
        <span
          key={i}
          back={boolAttr(item.back)}
          onClick={item.onClick}
          style={{ cursor: item.onClick ? 'pointer' : 'default' }}
        >
          {item.label}
        </span>
      ))}
    </fl-breadcrumbs>
  )
}

// ─────────────────────────────────────────────
// FLPaginator
// ─────────────────────────────────────────────
/**
 * Paginador completo con Anterior / páginas / Siguiente.
 *
 * @param {number}   total    Total de páginas
 * @param {number}   current  Página actual (1-indexed)
 * @param {function} onChange (page: number) => void
 * @param {number}   range    Cantidad de páginas visibles (default: 5)
 *
 * @example
 * <FLPaginator total={20} current={page} onChange={setPage} />
 */
export function FLPaginator({ total = 1, current = 1, onChange, range = 5, className = '', ...props }) {
  const half = Math.floor(range / 2)
  let start = Math.max(1, current - half)
  let end = Math.min(total, start + range - 1)
  if (end - start < range - 1) start = Math.max(1, end - range + 1)

  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <fl-paginator class={className} {...props}>
      <fl-paginator-move
        disabled={boolAttr(current <= 1)}
        onClick={() => current > 1 && onChange?.(current - 1)}
      >
        Anterior
      </fl-paginator-move>
      <fl-pages>
        {pages.map((p) => (
          <fl-page
            key={p}
            current={boolAttr(p === current)}
            onClick={() => onChange?.(p)}
          >
            {p}
          </fl-page>
        ))}
      </fl-pages>
      <fl-paginator-move
        disabled={boolAttr(current >= total)}
        onClick={() => current < total && onChange?.(current + 1)}
      >
        Siguiente
      </fl-paginator-move>
    </fl-paginator>
  )
}

// ─────────────────────────────────────────────
// FLNav / FLNavItem
// ─────────────────────────────────────────────
/**
 * Menú flotante (popover). Se muestra al enfocar el contenedor padre.
 *
 * @param {boolean} visible  Controla visibilidad programática
 */
export function FLNav({ visible, className = '', children, ...props }) {
  return (
    <fl-nav visible={boolAttr(visible)} class={className} {...props}>
      {children}
    </fl-nav>
  )
}

/**
 * Ítem dentro de FLNav.
 *
 * @param {string}   type     button — estilo de botón dentro del menú
 * @param {boolean}  selected Resaltado (fondo rojo)
 * @param {function} onClick
 */
export function FLNavItem({ type, selected, className = '', children, onClick, ...props }) {
  return (
    <fl-nav-item
      type={type}
      selected={boolAttr(selected)}
      class={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </fl-nav-item>
  )
}
