import { boolAttr } from '../utils.js'

// ─────────────────────────────────────────────
// FLBody
// ─────────────────────────────────────────────
/**
 * Contenedor principal de la aplicación.
 *
 * @param {boolean} compact  Reduce el padding horizontal al 10%
 *
 * @example
 * <FLBody compact>
 *   <FLTitle>Mi app</FLTitle>
 * </FLBody>
 */
export function FLBody({ compact, className = '', children, ...props }) {
  return (
    <fl-body compact={boolAttr(compact)} class={className} {...props}>
      {children}
    </fl-body>
  )
}

// ─────────────────────────────────────────────
// FLTitle / FLSubtitle
// ─────────────────────────────────────────────
/**
 * Título principal con línea decorativa roja debajo.
 *
 * @param {boolean} clear  Oculta la línea decorativa
 */
export function FLTitle({ clear, className = '', children, ...props }) {
  return (
    <fl-title clear={boolAttr(clear)} class={className} {...props}>
      {children}
    </fl-title>
  )
}

/** Subtítulo (font-size-large, bold) */
export function FLSubtitle({ className = '', children, ...props }) {
  return (
    <fl-subtitle class={className} {...props}>
      {children}
    </fl-subtitle>
  )
}

// ─────────────────────────────────────────────
// FLRow / FLCol
// ─────────────────────────────────────────────
/**
 * Contenedor de fila flexible (gap 40px por defecto).
 *
 * @param {boolean} center  Centra los hijos verticalmente (align-items: center)
 */
export function FLRow({ center, className = '', children, ...props }) {
  return (
    <fl-row center={boolAttr(center)} class={className} {...props}>
      {children}
    </fl-row>
  )
}

/**
 * Columna dentro de FLRow.
 *
 * @param {number|string} size  2 | 3 | 4 | 5 | 6  → flex relativo
 * @param {boolean}       fill  Toma todo el espacio restante (flex: 1)
 */
export function FLCol({ size, fill, className = '', children, ...props }) {
  return (
    <fl-col size={size} fill={boolAttr(fill)} class={className} {...props}>
      {children}
    </fl-col>
  )
}

// ─────────────────────────────────────────────
// FLSection / FLSections
// ─────────────────────────────────────────────
/**
 * Contenedor con borde redondeado y padding.
 *
 * @param {string}  title    Texto del encabezado interno (generado con CSS ::before)
 * @param {boolean} clear    Sin borde ni padding
 * @param {boolean} compact  Sin borde ni padding (alias de clear)
 */
export function FLSection({ title, clear, compact, className = '', children, ...props }) {
  return (
    <fl-section
      title={title}
      clear={boolAttr(clear)}
      compact={boolAttr(compact)}
      class={className}
      {...props}
    >
      {children}
    </fl-section>
  )
}

/** Agrupa varias FLSection en fila con bordes compartidos */
export function FLSections({ className = '', children, ...props }) {
  return (
    <fl-sections class={className} {...props}>
      {children}
    </fl-sections>
  )
}

// ─────────────────────────────────────────────
// FLData
// ─────────────────────────────────────────────
/**
 * Bloque de dato etiquetado.
 *
 * @param {string}  label   Etiqueta pequeña encima del valor
 * @param {boolean} inline  Label y valor en la misma línea
 * @param {boolean} money   Estilo monetario (alineado a la derecha)
 * @param {string}  method  Muestra ícono de pago: app | cash | mastercard | qr | visa
 *
 * @example
 * <FLData label="Total" money>$1.250.000</FLData>
 * <FLData label="Método" method="visa">Visa terminada en 4321</FLData>
 */
export function FLData({ label, inline, money, method, className = '', children, ...props }) {
  return (
    <fl-data
      inline={boolAttr(inline)}
      money={boolAttr(money)}
      method={method}
      class={className}
      {...props}
    >
      {label && <fl-data-label>{label}</fl-data-label>}
      {children}
    </fl-data>
  )
}

// ─────────────────────────────────────────────
// FLPayment
// ─────────────────────────────────────────────
/**
 * Ícono de método de pago.
 *
 * @param {string} method  app | cash | mastercard | qr | visa
 */
export function FLPayment({ method, className = '', ...props }) {
  return <fl-payment method={method} class={className} {...props} />
}

// ─────────────────────────────────────────────
// FLGetnet
// ─────────────────────────────────────────────
/**
 * Logo Getnet.
 *
 * @param {string} size  small | big
 */
export function FLGetnet({ size, className = '', ...props }) {
  return <fl-getnet size={size} class={className} {...props} />
}
