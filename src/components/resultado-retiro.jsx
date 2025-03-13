import { ArrowLeft, CheckCircle, DollarSign, Info } from "lucide-react";

export default function ResultadoRetiro({ monto, totalRetiros, numeroRetiro, tipoRetiro, onVolver }) {
  // Billetes disponibles
  const billetesDisponibles = [100000, 50000, 20000, 10000];

  // Función para calcular la entrega de billetes con acarreo
  const calcularBilletes = (monto) => {
    let restante = monto;
    let billetesEntregados = {};

    for (let billete of billetesDisponibles) {
      let cantidad = Math.floor(restante / billete);
      if (cantidad > 0) {
        billetesEntregados[billete] = cantidad;
        restante -= cantidad * billete;
      }
    }

    return billetesEntregados;
  };

  // Obtener los billetes según el monto
  const billetes = calcularBilletes(monto);

  // Función para obtener el título según el tipo de retiro
  const obtenerTituloRetiro = () => {
    switch (tipoRetiro) {
      case "nequi":
        return "Retiro por número de celular";
      case "ahorro_mano":
        return "Retiro Ahorro a la Mano";
      case "cuenta_ahorros":
        return "Retiro Cuenta de Ahorros";
      default:
        return "Retiro";
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100" onClick={onVolver}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-semibold flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            Retiro Exitoso
          </h2>
        </div>
      </div>

      {/* Mensaje de éxito */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
        <h3 className="text-xl font-bold text-green-700">¡Transacción Completada!</h3>
        <p className="text-green-600">
          Su retiro por ${monto.toLocaleString("es-CO")} ha sido procesado correctamente.
        </p>
      </div>

      {/* Detalles del retiro */}
      <div className="border rounded-lg">
        <div className="p-4">
          <h3 className="font-medium mb-2 flex items-center">
            <Info className="h-4 w-4 mr-1" />
            Detalles del retiro
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Tipo de retiro:</span>
              <span className="font-medium">{obtenerTituloRetiro()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Número:</span>
              <span className="font-medium">{numeroRetiro}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Monto:</span>
              <span className="font-medium">${monto.toLocaleString("es-CO")}</span>
            </div>

            {/* Sección de billetes entregados */}
            <div className="border-t pt-2 mt-2">
              <div className="font-medium mb-1">Billetes a entregar:</div>
              <div className="space-y-1">
                {Object.entries(billetes).map(([denominacion, cantidad]) => (
                  <div key={denominacion} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                      <span>${Number.parseInt(denominacion).toLocaleString("es-CO")}</span>
                    </div>
                    <span className="font-medium">
                      {cantidad} {cantidad === 1 ? "billete" : "billetes"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Predicción de retiros */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-medium mb-1 flex items-center text-blue-700">
          <Info className="h-4 w-4 mr-1" />
          Predicción del sistema
        </h3>
        <p className="text-sm text-blue-600">
          El cajero puede realizar aproximadamente {totalRetiros} retiros más antes de requerir recarga.
        </p>
      </div>

      {/* Botón para finalizar */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onVolver}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Finalizar y volver al inicio
        </button>
      </div>
    </div>
  );
}
