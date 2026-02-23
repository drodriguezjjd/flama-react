import { boolAttr } from '../utils.js'

// ─────────────────────────────────────────────
// FLButton
// ─────────────────────────────────────────────
/**
 * Botón estilizado con variantes.
 *
 * @param {boolean}  small    Padding vertical reducido
 * @param {boolean}  compact  Padding mínimo
 * @param {boolean}  pill     align-self: flex-start
 * @param {boolean}  left     align-self: flex-start
 * @param {boolean}  right    align-self: flex-end
 * @param {boolean}  clear    Sin fondo ni borde, texto gris
 * @param {boolean}  outline  Sin fondo, con borde y texto del color primario
 * @param {boolean}  primary  Color primario (usar junto a clear)
 * @param {boolean}  disabled Deshabilitado — sin eventos, estilo gris
 * @param {function} onClick
 *
 * @example
 * <FLButton onClick={save}>Guardar</FLButton>
 * <FLButton outline small>Cancelar</FLButton>
 * <FLButton clear primary>Ver más</FLButton>
 * <FLButton disabled>No disponible</FLButton>
 */
export function FLButton({
  small, compact, pill, left, right,
  clear, outline, primary, disabled,
  className = '', children, onClick, ...props
}) {
  return (
    <fl-button
      small={boolAttr(small)}
      compact={boolAttr(compact)}
      pill={boolAttr(pill)}
      left={boolAttr(left)}
      right={boolAttr(right)}
      clear={boolAttr(clear)}
      outline={boolAttr(outline)}
      primary={boolAttr(primary)}
      disabled={boolAttr(disabled)}
      class={className}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </fl-button>
  )
}

// ─────────────────────────────────────────────
// FLButtons
// ─────────────────────────────────────────────
/**
 * Contenedor de botones en fila.
 * Por defecto cada hijo ocupa flex:1.
 *
 * @param {boolean} center   justify-content: center (botones en tamaño natural)
 * @param {boolean} separate justify-content: space-between
 * @param {boolean} vertical flex-direction: column
 *
 * @example
 * <FLButtons center>
 *   <FLButton outline small>Cancelar</FLButton>
 *   <FLButton small>Confirmar</FLButton>
 * </FLButtons>
 */
export function FLButtons({ center, separate, vertical, className = '', children, ...props }) {
  return (
    <fl-buttons
      center={boolAttr(center)}
      separate={boolAttr(separate)}
      vertical={boolAttr(vertical)}
      class={className}
      {...props}
    >
      {children}
    </fl-buttons>
  )
}

// ─────────────────────────────────────────────
// FLAction
// ─────────────────────────────────────────────
/**
 * Botón circular con ícono. Puede contener un FLList flotante
 * que aparece al hacer foco (tabIndex="1" automático).
 *
 * @param {string}        icon     Nombre del ícono (calendar, user, dots, …)
 * @param {boolean}       disabled
 * @param {boolean}       right    Menú flotante abre hacia la derecha
 * @param {boolean}       left     Menú flotante abre hacia la izquierda
 * @param {boolean}       up       Menú flotante abre hacia arriba
 * @param {boolean}       main     Variante sin borde (fondo transparente)
 * @param {string|number} badge    Valor del badge rojo en la esquina
 * @param {boolean}       avatar   Modo avatar (fondo rojo, texto blanco)
 * @param {function}      onClick
 *
 * @example
 * <FLAction icon="dots" main>
 *   <FLList>
 *     <FLItem onClick={edit}>Editar</FLItem>
 *     <FLItem onClick={del}>Eliminar</FLItem>
 *   </FLList>
 * </FLAction>
 */
export function FLAction({
  icon, disabled, right, left, up, main, badge, avatar,
  className = '', children, onClick, tabIndex, ...props
}) {
  return (
    <fl-action
      icon={icon}
      disabled={boolAttr(disabled)}
      right={boolAttr(right)}
      left={boolAttr(left)}
      up={boolAttr(up)}
      main={boolAttr(main)}
      badge={badge}
      avatar={boolAttr(avatar)}
      class={className}
      tabIndex={tabIndex ?? '1'}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </fl-action>
  )
}

/** Contenedor de FLAction en fila (gap: spacing-big) */
export function FLActions({ className = '', children, ...props }) {
  return (
    <fl-actions class={className} {...props}>
      {children}
    </fl-actions>
  )
}
