import { useState } from "react";
import type { EstablecimientoUpdate } from "../types/establecimiento.type";
import Loading from "../../../components/ui/Loading";
import TableResponsable from "./TableResponsable";
import Switch from "../../../components/ui/Switch";
import { ArrowLeft, MapPin, Info } from "lucide-react";
import InputSelect from "../../../components/ui/InputSelect";
import { useFetchTipoEstablecimiento } from "../hooks/useFetchTipoEstablecimiento";
import { useFetchEstablecimientoById } from "../hooks/useFetchEstablecimientoById";

interface FormUpdateEstProps {
  showFormEdit: (p: boolean) => void;
  idEstablecimiento: number;
}

function FormUpdateEst({ showFormEdit, idEstablecimiento }: FormUpdateEstProps) {
  const {
    data: tipoEstablecimiento,
    isLoading,
    isError,
    fetchData,
  } = useFetchTipoEstablecimiento();

  const {
    data: establecimiento,
    isLoading: cargandoEstablecimiento,
    isError: errorSearch,
    fetchData: refreshEstablecimiento,
  } = useFetchEstablecimientoById(idEstablecimiento);

  const [formData, setFormData] = useState<EstablecimientoUpdate>(
    establecimiento || {
      idResponsable: 3,
      nombreEst: "Almacen los chacoterosss",
      direccion: "Av. El Polo 789",
      descripcion: "Almacen que almacena cosas.",
      latitud: "-12.1094",
      longitud: "-76.9731",
      departamento: "Santiago de Surco",
      provincia: "Lima",
      distrito: "Lima",
      tipoEst: 2,
      activo: false,
    },
  );

  const handleInputChange = (
    field: string,
    value: string | boolean | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex-1 p-8 bg-gray-950 overflow-auto">
      {/* Header */}
      <div className="flex gap-4 border bg-gray-900 border-gray-700 rounded-lg px-6 py-4 mb-8">
        <button
          onClick={() => showFormEdit(false)}
          className="p-2 bg-blue-700 hover:bg-blue-500 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Actualiza la información de un establecimiento
          </h1>
          <p className="text-gray-400">
            Modifica la información y guarda los cambios.
          </p>
        </div>
      </div>

      {/* Form */}
      {
        cargandoEstablecimiento ? (
          <div className="flex justify-center items-center py-10">
            <Loading w={6} h={6} color="blue" />
          </div>
        ) : errorSearch ? (
          <div className="flex justify-center items-center py-10">
            <p className="text-red-500">Error al cargar datos del establecimientos.</p>
            {/* agrega un botón para reintentar la carga */}
            <button
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
              onClick={() => refreshEstablecimiento(1)}
            >
              Reintentar
            </button>
          </div>
        ) : establecimiento === null ? (
          <div className="flex justify-center items-center py-2">
            <p className="text-yellow-500">
              No se encontró el establecimiento.
            </p>
            <button
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
              onClick={() => showFormEdit(false)}
            >
              Regresar
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Información General */}
            <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold">Información General</h2>
              </div>

              <div className="space-y-4">
                {/* Row 1: Nombre y tipo de establecimiento */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre del Establecimiento
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Almacén Central Norte"
                      value={formData.nombreEst}
                      onChange={(e) =>
                        handleInputChange("nombreEst", e.target.value)
                      }
                      className="w-full bg-gray-950 border border-[#30363d] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#1f6feb] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tipo de Establecimiento
                    </label>
                    {isLoading ? (
                      <div className="flex justify-center items-center py-2">
                        <Loading w={6} h={6} color="blue" />
                      </div>
                    ) : isError ? (
                      <div className="flex justify-center items-center py-2">
                        <p className="text-red-500">
                          Error al cargar tipos de establecimiento.
                        </p>
                        {/* agrega un botón para reintentar la carga */}
                        <button
                          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
                          onClick={fetchData}
                        >
                          Reintentar
                        </button>
                      </div>
                    ) : tipoEstablecimiento === null ||
                      tipoEstablecimiento.length === 0 ? (
                      <div>
                        No hay tipos de establecimiento registrados en el sistema.
                      </div>
                    ) : (
                      <div className="flex flex-row gap-2">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                          onClick={fetchData}
                        >
                          Recargar
                        </button>
                        <InputSelect
                          inputName="tipoEst"
                          placeholder="Seleccione el tipo de establecimiento"
                          options={
                            tipoEstablecimiento
                              ? tipoEstablecimiento.map((te) => ({
                                  label: te.tipo,
                                  value: te.id,
                                }))
                              : []
                          }
                          handleInputChange={handleInputChange}
                          valueSelect={formData.tipoEst}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 2: Responsable de administrar el establecimiento */}
                <TableResponsable
                  setIdResponsable={(id) => handleInputChange("idResponsable", id)}
                  selectedId={formData.idResponsable}
                />

                {/* Row 3: Dirección y estado del establecimiento */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dirección Exacta
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Calle, Av, Jr y número de local..."
                        value={formData.direccion}
                        onChange={(e) =>
                          handleInputChange("direccion", e.target.value)
                        }
                        className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estado del Establecimiento
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">Inactivo</span>
                      <Switch
                        inputName="activo"
                        activo={formData.activo}
                        handleInputChange={handleInputChange}
                      />
                      <span className="text-sm text-[#1f6feb] font-medium">
                        Activo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 4: Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción / Notas adicionales
                  </label>
                  <textarea
                    placeholder="Detalles sobre el acceso, horario de carga/descarga o referencias..."
                    value={formData.descripcion}
                    onChange={(e) =>
                      handleInputChange("descripcion", e.target.value)
                    }
                    rows={4}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Ubicación Geográfica */}
            <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <h2 className="text-xl font-semibold">
                  Ubicación Geográfica (Ubigeo)
                </h2>
              </div>

              <div className="space-y-4">
                {/* Row 1: Departamento, Provincia, Distrito */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Departamento
                    </label>
                    <select
                      value={formData.departamento}
                      onChange={(e) =>
                        handleInputChange("departamento", e.target.value)
                      }
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Seleccione Departamento</option>
                      <option value="lima">Lima</option>
                      <option value="arequipa">Arequipa</option>
                      <option value="cusco">Cusco</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Provincia
                    </label>
                    <select
                      value={formData.provincia}
                      onChange={(e) =>
                        handleInputChange("provincia", e.target.value)
                      }
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Seleccione Provincia</option>
                      <option value="lima">Lima</option>
                      <option value="callao">Callao</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Distrito
                    </label>
                    <select
                      value={formData.distrito}
                      onChange={(e) =>
                        handleInputChange("distrito", e.target.value)
                      }
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Seleccione Distrito</option>
                      <option value="miraflores">Miraflores</option>
                      <option value="san-isidro">San Isidro</option>
                      <option value="surco">Surco</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Coordenadas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Latitud (Coordenada Y)
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 11l5-5m0 0l5 5m-5-5v12"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="-12.046374"
                        value={formData.latitud}
                        onChange={(e) =>
                          handleInputChange("latitud", e.target.value)
                        }
                        className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Longitud (Coordenada X)
                    </label>
                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="-77.042793"
                        value={formData.longitud}
                        onChange={(e) =>
                          handleInputChange("longitud", e.target.value)
                        }
                        className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      }
    </main>
  );
}

export default FormUpdateEst;
