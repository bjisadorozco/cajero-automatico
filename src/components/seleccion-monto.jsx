import { useState } from "react"
import { ArrowLeft, DollarSign } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function SeleccionMonto({ onVolver, onSeleccionarMonto }) {
  const [montoPersonalizado, setMontoPersonalizado] = useState("")
  const [mostrarPersonalizado, setMostrarPersonalizado] = useState(false)
  const { toast } = useToast()

  // Opciones predefinidas de montos
  const opcionesMonto = [50000, 100000, 200000, 300000, 500000, 1000000]

  const manejarCambioMonto = (e) => {
    const valor = e.target.value
    // Solo permitir dígitos
    if (/^\d*$/.test(valor)) {
      setMontoPersonalizado(valor)
    }
  }

  const manejarSeleccionMonto = (monto) => {
    // Validar que el monto no sea 145000
    if (monto === 145000) {
      toast({
        title: "Monto no permitido",
        description: "No se permite retirar exactamente $145,000.",
        variant: "destructive",
      })
      return
    }

    // Validar que el monto sea múltiplo de 10000 (no hay billetes de 5000)
    if (monto % 10000 !== 0) {
      toast({
        title: "Monto inválido",
        description: "El monto debe ser múltiplo de $10,000 (no se disponen billetes de $5,000).",
        variant: "destructive",
      })
      return
    }

    onSeleccionarMonto(monto)
  }

  const manejarMontoPersonalizado = () => {
    const monto = Number.parseInt(montoPersonalizado, 10)

    if (isNaN(monto) || monto <= 0) {
      toast({
        title: "Monto inválido",
        description: "Por favor ingrese un monto válido.",
        variant: "destructive",
      })
      return
    }

    manejarSeleccionMonto(monto)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={onVolver}>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-xl font-semibold flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Seleccione monto a retirar
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {opcionesMonto.map((monto) => (
          <button
            key={monto}
            className="h-16 text-lg border rounded-md hover:bg-blue-50"
            onClick={() => manejarSeleccionMonto(monto)}
          >
            ${monto.toLocaleString("es-CO")}
          </button>
        ))}

        <button
          className="h-16 text-lg border rounded-md hover:bg-blue-50"
          onClick={() => setMostrarPersonalizado(true)}
        >
          Otro valor
        </button>
      </div>

      {mostrarPersonalizado && (
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <label htmlFor="monto-personalizado" className="block text-sm font-medium">
              Ingrese monto a retirar
            </label>
            <div className="flex gap-2">
              <input
                id="monto-personalizado"
                placeholder="Ej: 400000"
                value={montoPersonalizado}
                onChange={manejarCambioMonto}
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={manejarMontoPersonalizado}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Retirar
              </button>
            </div>
            <p className="text-sm text-gray-500">El monto debe ser múltiplo de $10,000 (no hay billetes de $5,000).</p>
          </div>
        </div>
      )}
    </div>
  )
}

