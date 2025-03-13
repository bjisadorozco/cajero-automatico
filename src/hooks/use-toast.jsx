import { useState } from "react"

// Un hook simple para mostrar notificaciones toast
export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default" }) => {
    // En una implementación real, esto mostraría un toast en la UI
    console.log(`[${variant.toUpperCase()}] ${title}: ${description}`)

    // Simulamos la funcionalidad de toast
    alert(`${title}\n${description}`)
  }

  return { toast }
}

