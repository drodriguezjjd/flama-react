import { useState, useCallback } from 'react'

/**
 * Hook de utilidad para manejar estado global de loader y modal de mensajes.
 *
 * @returns {{
 *   loading:    boolean,
 *   setLoading: (v: boolean) => void,
 *   modal:      { visible, title, message, icon, onAccept, onCancel },
 *   openModal:  (options) => void,
 *   closeModal: () => void,
 * }}
 *
 * @example
 * const { loading, setLoading, modal, openModal, closeModal } = useFlama()
 *
 * // Loader
 * setLoading(true)
 * await fetchData()
 * setLoading(false)
 *
 * // Modal de confirmación
 * openModal({
 *   title: 'Eliminar registro',
 *   message: '¿Estás seguro? Esta acción no se puede deshacer.',
 *   onAccept: () => { deleteRecord(); closeModal() },
 *   onCancel: closeModal,
 * })
 */
export function useFlama() {
  const [loading, setLoading] = useState(false)

  const [modal, setModal] = useState({
    visible: false,
    title: '',
    message: '',
    icon: '',
    onAccept: null,
    onCancel: null,
  })

  const openModal = useCallback((options) => {
    setModal({ visible: true, title: '', message: '', icon: '', onAccept: null, onCancel: null, ...options })
  }, [])

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, visible: false }))
  }, [])

  return { loading, setLoading, modal, openModal, closeModal }
}
