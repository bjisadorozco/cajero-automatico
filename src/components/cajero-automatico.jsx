import { useState } from "react"
import { CreditCard, Smartphone, Wallet } from "lucide-react"
import RetiroNequi from "./retiro-nequi"
import RetiroAhorroMano from "./retiro-ahorro-mano"
import RetiroCuentaAhorros from "./retiro-cuenta-ahorros"
import SeleccionMonto from "./seleccion-monto"
import ResultadoRetiro from "./resultado-retiro"
import { useToast } from "../hooks/use-toast"

// Estados posibles del cajero
const ESTADOS = {
  INICIO: "inicio",
  RETIRO_NEQUI: "retiro_nequi",
  RETIRO_AHORRO_MANO: "retiro_ahorro_mano",
  RETIRO_CUENTA_AHORROS: "retiro_cuenta_ahorros",
  SELECCION_MONTO: "seleccion_monto",
  RESULTADO: "resultado",
}

export default function CajeroAutomatico() {
  const [estado, setEstado] = useState(ESTADOS.INICIO)
  const [tipoRetiroActual, setTipoRetiroActual] = useState("")
  const [numeroRetiro, setNumeroRetiro] = useState("")
  const [clave, setClave] = useState("")
  const [monto, setMonto] = useState(0)
  const [billetes, setBilletes] = useState({})
  const [totalRetiros, setTotalRetiros] = useState(0)
  const { toast } = useToast()

  // Función para calcular los billetes según la metodología del acarreo
  const calcularBilletes = (cantidad) => {
    // No permitir retiros de 145000
    if (cantidad === 145000) {
      toast({
        title: "Error en el retiro",
        description: "No se puede retirar exactamente $145,000. Por favor, seleccione otro monto.",
        variant: "destructive",
      })
      return null
    }

    // Verificar si el monto es múltiplo de 10000 (ya que no hay billetes de 5000)
    if (cantidad % 10000 !== 0) {
      toast({
        title: "Monto inválido",
        description: "El monto debe ser múltiplo de $10,000 (no se disponen billetes de $5,000).",
        variant: "destructive",
      })
      return null
    }

    // Denominaciones disponibles (sin billetes de 5000)
    const denominaciones = [100000, 50000, 20000, 10000]
    const resultado = {}
    let restante = cantidad

    // Algoritmo del acarreo para calcular billetes
    for (const denominacion of denominaciones) {
      const cantidadBilletes = Math.floor(restante / denominacion)
      if (cantidadBilletes > 0) {
        resultado[denominacion] = cantidadBilletes
        restante -= cantidadBilletes * denominacion
      }
    }

    // Si queda algún restante, significa que no se puede completar con las denominaciones disponibles
    if (restante > 0) {
      toast({
        title: "Error en el retiro",
        description: "No se puede entregar el monto exacto con las denominaciones disponibles.",
        variant: "destructive",
      })
      return null
    }

    return resultado
  }

  // Función para procesar el retiro
  const procesarRetiro = (montoRetiro) => {
    const resultado = calcularBilletes(montoRetiro)
    if (resultado) {
      setBilletes(resultado)
      setMonto(montoRetiro)

      // En un caso real, esto dependería de la cantidad de dinero disponible en el cajero
      const prediccion = Math.floor(Math.random() * 50) + 10 // Entre 10 y 60 retiros posibles
      setTotalRetiros(prediccion)

      setEstado(ESTADOS.RESULTADO)
    }
  }

  // Función para volver al inicio
  const volverAlInicio = () => {
    setEstado(ESTADOS.INICIO)
    setNumeroRetiro("")
    setClave("")
    setMonto(0)
    setBilletes({})
  }

  // Renderizado condicional según el estado actual
  const renderizarContenido = () => {
    switch (estado) {
      case ESTADOS.INICIO:
        return (
          <div className="grid gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary">Seleccione tipo de retiro</h2>
              <p className="text-muted-foreground">Elija el método que desea utilizar para su retiro</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <button
                className="h-32 flex flex-col items-center justify-center gap-2 border rounded-md p-4 hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  setTipoRetiroActual("nequi")
                  setEstado(ESTADOS.RETIRO_NEQUI)
                }}
              >
                <Smartphone className="h-8 w-8" />
                <div>
                  <div className="font-medium">Retiro por celular</div>
                  <div className="text-xs text-muted-foreground">Estilo Nequi</div>
                </div>
              </button>

              <button
                className="h-32 flex flex-col items-center justify-center gap-2 border rounded-md p-4 hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  setTipoRetiroActual("ahorro_mano")
                  setEstado(ESTADOS.RETIRO_AHORRO_MANO)
                }}
              >
                <Wallet className="h-8 w-8" />
                <div>
                  <div className="font-medium">Ahorro a la mano</div>
                  <div className="text-xs text-muted-foreground">Retiro especial</div>
                </div>
              </button>

              <button
                className="h-32 flex flex-col items-center justify-center gap-2 border rounded-md p-4 hover:bg-blue-500 hover:text-white transition-colors"
                onClick={() => {
                  setTipoRetiroActual("cuenta_ahorros")
                  setEstado(ESTADOS.RETIRO_CUENTA_AHORROS)
                }}
              >
                <CreditCard className="h-8 w-8" />
                <div>
                  <div className="font-medium">Cuenta de ahorros</div>
                  <div className="text-xs text-muted-foreground">Retiro tradicional</div>
                </div>
              </button>
            </div>
          </div>
        )

      case ESTADOS.RETIRO_NEQUI:
        return (
          <RetiroNequi
            numeroRetiro={numeroRetiro}
            setNumeroRetiro={setNumeroRetiro}
            clave={clave}
            setClave={setClave}
            onVolver={volverAlInicio}
            onContinuar={() => setEstado(ESTADOS.SELECCION_MONTO)}
          />
        )

      case ESTADOS.RETIRO_AHORRO_MANO:
        return (
          <RetiroAhorroMano
            numeroRetiro={numeroRetiro}
            setNumeroRetiro={setNumeroRetiro}
            clave={clave}
            setClave={setClave}
            onVolver={volverAlInicio}
            onContinuar={() => setEstado(ESTADOS.SELECCION_MONTO)}
          />
        )

      case ESTADOS.RETIRO_CUENTA_AHORROS:
        return (
          <RetiroCuentaAhorros
            numeroRetiro={numeroRetiro}
            setNumeroRetiro={setNumeroRetiro}
            clave={clave}
            setClave={setClave}
            onVolver={volverAlInicio}
            onContinuar={() => setEstado(ESTADOS.SELECCION_MONTO)}
          />
        )

      case ESTADOS.SELECCION_MONTO:
        return (
          <SeleccionMonto
            onVolver={() => {
              // Volver al tipo de retiro correspondiente
              if (tipoRetiroActual === "nequi") {
                setEstado(ESTADOS.RETIRO_NEQUI)
              } else if (tipoRetiroActual === "ahorro_mano") {
                setEstado(ESTADOS.RETIRO_AHORRO_MANO)
              } else {
                setEstado(ESTADOS.RETIRO_CUENTA_AHORROS)
              }
            }}
            onSeleccionarMonto={procesarRetiro}
          />
        )

      case ESTADOS.RESULTADO:
        return (
          <ResultadoRetiro
            monto={monto}
            billetes={billetes}
            totalRetiros={totalRetiros}
            numeroRetiro={numeroRetiro}
            tipoRetiro={tipoRetiroActual}
            onVolver={volverAlInicio}
          />
        )

      default:
        return <div>Estado no reconocido</div>
    }
  }

  return (
    <div className="w-full md:max-w-[80%] max-w-3xl shadow-xl bg-white rounded-lg">
      <div className="bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-2xl flex items-center justify-center">
          <CreditCard className="mr-2 h-6 w-6" />
          Cajero Automático UPC
        </h1>
        <p className="text-blue-100 text-center">Sistema de retiro con metodología de acarreo</p>
      </div>
      <div className="p-6">{renderizarContenido()}</div>
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-500 rounded-b-lg">
        Universidad Popular del Cesar - Proyecto de Cajero Automático
      </div>
    </div>
  )
}

