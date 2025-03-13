import { useState, useEffect } from "react"
import { ArrowLeft, Smartphone, Timer } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function RetiroNequi({ numeroRetiro, setNumeroRetiro, clave, setClave, onVolver, onContinuar }) {
  const [claveGenerada, setClaveGenerada] = useState("")
  const [segundosRestantes, setSegundosRestantes] = useState(60)
  const [numeroValido, setNumeroValido] = useState(false)
  const { toast } = useToast()

  // Generar clave aleatoria de 6 dígitos
  useEffect(() => {
    const nuevaClave = Math.floor(100000 + Math.random() * 900000).toString()
    setClaveGenerada(nuevaClave)
    setClave(nuevaClave)
    setSegundosRestantes(60)
  }, [setClave])

  // Temporizador para la clave
  useEffect(() => {
    if (segundosRestantes <= 0) {
      // Generar nueva clave cuando el tiempo expire
      const nuevaClave = Math.floor(100000 + Math.random() * 900000).toString()
      setClaveGenerada(nuevaClave)
      setClave(nuevaClave)
      setSegundosRestantes(60)

      toast({
        title: "Clave actualizada",
        description: "Se ha generado una nueva clave temporal.",
      })
      return
    }

    const intervalo = setInterval(() => {
      setSegundosRestantes((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [segundosRestantes, setClave, toast])

  // Validar número de celular
  const validarNumero = (numero) => {
    // Debe ser exactamente 10 dígitos y solo números
    const regex = /^[0-9]{10}$/
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

  const manejarContinuar = () => {
    if (!numeroValido) {
      toast({
        title: "Número inválido",
        description: "Por favor ingrese un número de celular válido de 10 dígitos.",
        variant: "destructive",
      })
      return
    }

    // Añadir el 0 al inicio para formar el vector de 11 dígitos
    setNumeroRetiro("0" + numeroRetiro)
    onContinuar()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={onVolver}>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-xl font-semibold flex items-center">
          <Smartphone className="mr-2 h-5 w-5" />
          Retiro por número de celular
        </h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="numero-celular" className="block text-sm font-medium">
            Número de celular (10 dígitos)
          </label>
          <input
            id="numero-celular"
            placeholder="Ingrese su número de celular"
            value={numeroRetiro}
            onChange={manejarCambioNumero}
            maxLength={10}
            className={`w-full p-2 border rounded-md ${numeroValido ? "border-green-500" : "border-gray-300"}`}
          />
          {numeroRetiro && !numeroValido && (
            <p className="text-sm text-red-500">El número debe tener exactamente 10 dígitos numéricos.</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="clave-temporal" className="block text-sm font-medium">
              Clave temporal (6 dígitos)
            </label>
            <div className="flex items-center text-sm text-gray-500">
              <Timer className="mr-1 h-3 w-3" />
              <span>{segundosRestantes}s</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
            <p className="font-mono text-center text-lg tracking-widest">{claveGenerada}</p>
          </div>

          <p className="text-sm text-gray-500">
            Esta clave se regenerará automáticamente en {segundosRestantes} segundos.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={manejarContinuar}
          disabled={!numeroValido}
          className={`px-4 py-2 rounded-md ${numeroValido ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

