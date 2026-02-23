import { boolAttr } from '../utils.js'

// ─────────────────────────────────────────────
// FLTip
// ─────────────────────────────────────────────
/**
 * Barra de mensaje del sistema (alert inline).
 *
 * @param {boolean} visible  Controla si se muestra
 * @param {string}  type     error | correct | warn | info
 *
 * @example
 * <FLTip visible={!!error} type="error">{error}</FLTip>
 * <FLTip visible={success} type="correct">Guardado correctamente.</FLTip>
 */
export function FLTip({ visible, type, className = '', children, ...props }) {
  return (
    <fl-tip visible={boolAttr(visible)} type={type} class={className} {...props}>
      {children}
    </fl-tip>
  )
}

// ─────────────────────────────────────────────
// FLTag
// ─────────────────────────────────────────────
/**
 * Etiqueta de estado.
 *
 * @param {string} type  active | inactive | admin | local
 *
 * @example
 * <FLTag type="active">Activo</FLTag>
 * <FLTag type="inactive">Inactivo</FLTag>
 */
export function FLTag({ type = 'active', className = '', children, ...props }) {
  return (
    <fl-tag type={type} class={className} {...props}>
      {children}
    </fl-tag>
  )
}

// ─────────────────────────────────────────────
// FLSpinner
// ─────────────────────────────────────────────
/**
 * Spinner de carga inline.
 *
 * @param {string} size  medium | small (por defecto: big)
 */
export function FLSpinner({ size, className = '', ...props }) {
  return <fl-spinner size={size} class={className} {...props} />
}

// ─────────────────────────────────────────────
// FLLoader
// ─────────────────────────────────────────────
/**
 * Overlay de carga global (cubre toda la pantalla).
 * Renderiza mejor en el root del árbol de componentes.
 *
 * @param {boolean} visible
 * @param {string}  message  Texto dentro del recuadro (default: "Por favor espere...")
 *
 * @example
 * <FLLoader visible={isLoading} message="Procesando pago..." />
 */
export function FLLoader({ visible, message, className = '', ...props }) {
  return (
    <fl-loader
      visible={boolAttr(visible)}
      message={message}
      class={className}
      {...props}
    />
  )
}

// ─────────────────────────────────────────────
// FLModal
// ─────────────────────────────────────────────
/**
 * Overlay modal. El contenido se centra en pantalla.
 * Al hacer clic en el fondo oscuro se llama a onClose.
 *
 * @param {boolean}  visible
 * @param {function} onClose  Callback al hacer clic fuera del contenido
 *
 * @example
 * <FLModal visible={showModal} onClose={() => setShowModal(false)}>
 *   <FLCard message>
 *     <FLCardBody>
 *       <FLCardTitle>¿Confirmar?</FLCardTitle>
 *     </FLCardBody>
 *     <FLButtons center>
 *       <FLButton small outline onClick={() => setShowModal(false)}>Cancelar</FLButton>
 *       <FLButton small onClick={confirm}>Aceptar</FLButton>
 *     </FLButtons>
 *   </FLCard>
 * </FLModal>
 */
export function FLModal({ visible, onClose, className = '', children, ...props }) {
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.()
  }
  return (
    <fl-modal
      visible={boolAttr(visible)}
      class={className}
      onClick={handleBackdrop}
      {...props}
    >
      {children}
    </fl-modal>
  )
}
