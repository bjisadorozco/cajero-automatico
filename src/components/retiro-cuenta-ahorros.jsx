import { useState } from "react"
import { ArrowLeft, CreditCard, Eye, EyeOff } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function RetiroCuentaAhorros({ numeroRetiro, setNumeroRetiro, clave, setClave, onVolver, onContinuar }) {
  const [numeroValido, setNumeroValido] = useState(false)
  const [mostrarClave, setMostrarClave] = useState(false)
  const { toast } = useToast()

  // Validar número de cuenta de ahorros
  const validarNumero = (numero) => {
    // Debe ser exactamente 11 dígitos y solo números
    const regex = /^\d{11}$/
    return regex.test(numero)
  }

  const manejarCambioNumero = (e) => {
    const valor = e.target.value
    // Solo permitir dígitos
    if (/^\d*$/.test(valor)) {
      setNumeroRetiro(valor)
      setNumeroValido(validarNumero(valor))
    }
  }

  const manejarCambioClave = (e) => {
    const valor = e.target.value
    // Solo permitir dígitos y máximo 4
    if (/^\d{0,4}$/.test(valor)) {
      setClave(valor)
    }
  }

  const manejarContinuar = () => {
    if (!numeroValido) {
      toast({
        title: "Número inválido",
        description: "El número de cuenta debe tener exactamente 11 dígitos numéricos.",
        variant: "destructive",
      })
      return
    }

    if (clave.length !== 4) {
      toast({
        title: "Clave inválida",
        description: "La clave debe tener exactamente 4 dígitos.",
        variant: "destructive",
      })
      return
    }

    onContinuar()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={onVolver}>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-xl font-semibold flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Retiro Cuenta de Ahorros
        </h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="numero-cuenta" className="block text-sm font-medium">
            Número de Cuenta (11 dígitos)
          </label>
          <input
            id="numero-cuenta"
            placeholder="Ingrese su número de cuenta"
            value={numeroRetiro}
            onChange={manejarCambioNumero}
            maxLength={11}
            className={`w-full p-2 border rounded-md ${numeroValido ? "border-green-500" : "border-gray-300"}`}
          />
          {numeroRetiro && !numeroValido && (
            <p className="text-sm text-red-500">El número debe tener exactamente 11 dígitos numéricos.</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="clave" className="block text-sm font-medium">
            Clave (4 dígitos)
          </label>
          <div className="relative">
            <input
              id="clave"
              type={mostrarClave ? "text" : "password"}
              placeholder="Ingrese su clave de 4 dígitos"
              value={clave}
              onChange={manejarCambioClave}
              maxLength={4}
              className={`w-full p-2 pr-10 border rounded-md ${clave.length === 4 ? "border-green-500" : "border-gray-300"}`}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setMostrarClave(!mostrarClave)}
            >
              {mostrarClave ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {clave && clave.length !== 4 && (
            <p className="text-sm text-red-500">La clave debe tener exactamente 4 dígitos.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={manejarContinuar}
          disabled={!numeroValido || clave.length !== 4}
          className={`px-4 py-2 rounded-md ${numeroValido && clave.length === 4
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

