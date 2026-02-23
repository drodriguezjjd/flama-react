import { useState, useRef } from 'react'
import { boolAttr } from '../utils.js'

// ─────────────────────────────────────────────
// FLInput — wrapper básico
// ─────────────────────────────────────────────
/**
 * Wrapper de fl-input estilizado con label flotante.
 * Úsalo cuando quieras control total sobre el input interno.
 *
 * @param {string}    label    Texto del label flotante
 * @param {string}    icon     Nombre del ícono izquierdo
 * @param {boolean}   compact  Sin label, padding compacto
 * @param {boolean}   disabled
 * @param {string}    error    Mensaje de error que aparece debajo
 *
 * @example
 * <FLInput label="RUT" icon="user">
 *   <input type="text" placeholder=" " />
 * </FLInput>
 */
export function FLInput({ label, icon, compact, disabled, error, className = '', children, ...props }) {
  return (
    <fl-input
      icon={icon}
      compact={boolAttr(compact)}
      disabled={boolAttr(disabled)}
      error={error || undefined}
      class={className}
      {...props}
    >
      {label && <label>{label}</label>}
      {children}
    </fl-input>
  )
}

// ─────────────────────────────────────────────
// FLInputField — input controlado React
// ─────────────────────────────────────────────
/**
 * Input controlado con todas las funcionalidades de Flama.
 *
 * @param {string}   label
 * @param {string}   icon        Ícono izquierdo (calendar, lock, user, …)
 * @param {string}   type        text | password | email | number | date | search
 * @param {string}   placeholder Por defecto " " (espacio para activar label flotante)
 * @param {string}   value
 * @param {function} onChange    (e) => void
 * @param {boolean}  compact     Sin label, placeholder visible
 * @param {boolean}  disabled
 * @param {string}   error       Mensaje de error
 * @param {boolean}  clearable   Muestra botón × para limpiar el campo
 * @param {boolean}  password    Muestra toggle ojo/ojo-tachado (auto si type="password")
 *
 * @example
 * <FLInputField
 *   label="Correo electrónico"
 *   icon="email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   clearable
 * />
 */
export function FLInputField({
  label, icon, type = 'text', placeholder = ' ', value, onChange,
  compact, disabled, error, clearable, password, className = '', ...props
}) {
  const [inputType, setInputType] = useState(type)
  const inputRef = useRef(null)

  const handleClear = () => {
    onChange?.({ target: { value: '' } })
    inputRef.current?.focus()
  }

  const toggleVisibility = () => {
    setInputType((t) => (t === 'password' ? 'text' : 'password'))
  }

  const hasValue = Boolean(value && value.length > 0)
  const isPassword = type === 'password'

  return (
    <fl-input
      icon={icon}
      compact={boolAttr(compact)}
      disabled={boolAttr(disabled)}
      error={error || undefined}
      class={className}
    >
      {!compact && label && <label>{label}</label>}
      <input
        ref={inputRef}
        type={inputType}
        placeholder={compact && label ? label : placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {clearable && hasValue && <fl-clear onClick={handleClear} />}
      {(password || isPassword) && <fl-visibility onClick={toggleVisibility} />}
    </fl-input>
  )
}

// ─────────────────────────────────────────────
// FLSelectField — select controlado React
// ─────────────────────────────────────────────
/**
 * Select estilizado con dropdown React (sin <select> nativo).
 *
 * @param {string}   label
 * @param {string}   placeholder Texto cuando no hay selección
 * @param {string}   value
 * @param {function} onChange    ({ target: { value } }) => void
 * @param {Array}    options     [{ value: string, label: string }]
 * @param {boolean}  compact
 * @param {boolean}  disabled
 * @param {string}   error
 *
 * @example
 * <FLSelectField
 *   label="País"
 *   value={country}
 *   onChange={(e) => setCountry(e.target.value)}
 *   options={[
 *     { value: 'cl', label: 'Chile' },
 *     { value: 'ar', label: 'Argentina' },
 *   ]}
 * />
 */
export function FLSelectField({
  label, placeholder = 'Seleccione una opción', value, onChange,
  options = [], compact, disabled, error, className = '', ...props
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find((o) => String(o.value) === String(value))

  const handleSelect = (opt) => {
    onChange?.({ target: { value: opt.value } })
    setOpen(false)
  }

  return (
    <fl-input
      compact={boolAttr(compact)}
      disabled={boolAttr(disabled)}
      error={error || undefined}
      class={className}
      {...props}
    >
      {!compact && label && <label>{label}</label>}
      <fl-select
        placeholder={placeholder}
        tabIndex="0"
        onFocus={() => !disabled && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      >
        {selected?.label}
      </fl-select>
      {open && (
        <fl-dropdown visible="">
          <fl-list>
            {options.map((opt) => (
              <fl-item
                key={opt.value}
                selected={boolAttr(String(opt.value) === String(value))}
                onMouseDown={() => handleSelect(opt)}
              >
                {opt.label}
              </fl-item>
            ))}
          </fl-list>
        </fl-dropdown>
      )}
    </fl-input>
  )
}

// ─────────────────────────────────────────────
// FLCheck
// ─────────────────────────────────────────────
/**
 * Checkbox o radio estilizado.
 *
 * @param {string}   type     checkbox | radio
 * @param {string}   label    Texto visible al lado del control
 * @param {boolean}  checked
 * @param {function} onChange (e) => void
 * @param {boolean}  disabled
 *
 * @example
 * <FLCheck
 *   type="checkbox"
 *   label="Acepto los términos y condiciones"
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 * />
 */
export function FLCheck({ type = 'checkbox', label, checked, onChange, disabled, className = '', ...props }) {
  return (
    <fl-check disabled={boolAttr(disabled)} class={className} {...props}>
      <label>
        <input type={type} checked={checked} onChange={onChange} disabled={disabled} />
        {label}
      </label>
    </fl-check>
  )
}

/**
 * Grupo de FLCheck en fila (para radio buttons o multi-check).
 *
 * @param {string} label Label flotante del grupo
 */
export function FLChecks({ label, className = '', children, ...props }) {
  return (
    <fl-checks class={className} {...props}>
      {label && <label>{label}</label>}
      {children}
    </fl-checks>
  )
}
