/**
 * Convierte un valor booleano en atributo HTML vacío o undefined.
 * Útil para custom elements que reaccionan a la presencia del atributo.
 *
 * @param {*} val
 * @returns {string|undefined}
 */
export const boolAttr = (val) => (val ? '' : undefined)
