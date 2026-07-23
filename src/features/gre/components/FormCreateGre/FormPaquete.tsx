import { useEffect, useState } from "react";
import InputText from "../../../../components/ui/InputText";
import InputNumber from "../../../../components/ui/InputNumber";
import ButtonCancelForm from "../../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../../components/ui/ButtonSubmitForm";
import InputSearch from "../../../../components/ui/InputSearch";
import Table from "../../../../components/ui/Table";
import Loading from "../../../../components/ui/Loading";
import { Plus, Hash, Check, ArrowLeft } from 'lucide-react';
import { useRegistrarPaquete } from "../../../paquetes/hooks/useRegistrarPaquete";
import { useFetchClientesSinCompras } from "../../../clientes/hooks/useFetchClientesSinCompras";
import { useFetchPaquetes } from "../../../paquetes/hooks/useFetchPaquetes";
import { useFetchPaqueteData } from "../../../paquetes/hooks/useFetchPaqueteData";
import type { GetClienteSinCompras } from "../../../../types/clientes.type";
import type { CreatePaquete } from '../../../../types/paquete.type';
import { useGreContext } from '../../../../context/GreContext';

export default function FormPaquete() {
  const {
    dataEmitirGre,
    setDataEmitirGre,
    setIdPaquete,
  } = useGreContext();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<number | null>(dataEmitirGre.idPaquete || null);

  const [formData, setFormData] = useState<CreatePaquete>({
    clave: "",
    destino: "",
    idSalidaTransporte: dataEmitirGre.idSalidaTransporte || 0,
    idUsuario: 1,
    idUsuarioDestino: 0,
    montoCobrado: 0
  });

  const {
    execute: registrarPaquete,
    isLoading: isLoadingPaquete,
    isError: isErrorPaquete,
  } = useRegistrarPaquete();

  const {
    clientes,
  } = useFetchClientesSinCompras();

  const {
    paquetes,
    isLoading: isLoadingFetch,
    isError: isErrorFetch,
    execute: refetchPaquetes,
  } = useFetchPaquetes(dataEmitirGre.idSalidaTransporte || undefined);

  const {
    execute: fetchPaqueteData,
  } = useFetchPaqueteData();

  useEffect(() => {
    if (!isLoadingFetch && paquetes.length === 0) {
      setShowForm(true);
    }
  }, [isLoadingFetch, paquetes]);

  const syncPaquete = (nextValues: Partial<CreatePaquete>) => {
    setFormData((prev) => ({
      ...prev,
      ...nextValues,
    }));
  };

  const handleSelectPaquete = async (id: number) => {
    setIdSelected(id);
    setIdPaquete(id);
    const details = await fetchPaqueteData(id);
    if (details) {
      setDataEmitirGre((current) => ({
        ...current,
        idPaquete: id,
        paquete: {
          clave: details.paquete.clave,
          destino: details.paquete.destino,
          idSalidaTransporte: dataEmitirGre.idSalidaTransporte || 0,
          idUsuario: 1,
          idUsuarioDestino: 0, // details doesn't have idUsuarioDestino, but backend has it saved
          montoCobrado: parseFloat(details.paquete.montoPagado) || 0
        }
      }));
    } else {
      setDataEmitirGre((current) => ({
        ...current,
        idPaquete: id
      }));
    }
  };

  const handleDeselectPaquete = () => {
    setIdSelected(null);
    setIdPaquete(null);
    setDataEmitirGre((current) => ({
      ...current,
      idPaquete: 0,
      paquete: {
        clave: "",
        destino: "",
        idSalidaTransporte: dataEmitirGre.idSalidaTransporte || 0,
        idUsuario: 1,
        idUsuarioDestino: 0,
        montoCobrado: 0
      }
    }));
  };

  if (isLoadingFetch) {
    return (
      <div className="flex items-center justify-center p-12 bg-gray-900 mx-6 rounded-xl border border-gray-800">
        <Loading w={8} h={8} color="blue" />
      </div>
    );
  }

  if (isErrorFetch) {
    return (
      <div className="p-8 bg-gray-900 mx-6 rounded-xl border border-gray-800 text-center">
        <p className="text-red-400 mb-4">Error al cargar los paquetes de esta salida</p>
        <button
          onClick={() => dataEmitirGre.idSalidaTransporte && refetchPaquetes(dataEmitirGre.idSalidaTransporte)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!showForm) {
    const tableHeader = ["ID Paquete", "Destino", "Monto Cobrado", "Estado", "N° Productos", ""];
    return (
      <div className="px-6 py-6 bg-gray-900 mx-6 rounded-xl border border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Paquetes en esta Salida</h3>
            <p className="text-sm text-slate-400">Seleccione un paquete existente para continuar o registre uno nuevo.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Crear nuevo paquete
          </button>
        </div>

        <Table tableHeader={tableHeader} cantidadDatos={paquetes.length}>
          {paquetes.map((paquete, index) => (
            <tr
              key={index}
              className={`border-b border-gray-800 hover:bg-gray-800/40 transition-colors ${
                idSelected === paquete.idpaquete ? 'bg-blue-900/10' : ''
              }`}
            >
              {/* ID */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${
                    idSelected === paquete.idpaquete ? 'bg-blue-500/20' : 'bg-gray-800'
                  }`}>
                    <Hash className={`w-4 h-4 ${
                      idSelected === paquete.idpaquete ? 'text-blue-400' : 'text-slate-400'
                    }`} />
                  </div>
                  <div>
                    <span className="block font-semibold text-sm text-slate-200">
                      Paquete #{paquete.idpaquete}
                    </span>
                  </div>
                </div>
              </td>

              {/* Destino */}
              <td className="px-6 py-4">
                <span className="text-sm text-slate-300">
                  {paquete.destino}
                </span>
              </td>

              {/* Monto */}
              <td className="px-6 py-4 text-sm text-slate-300">
                S/. {paquete.montocobrado}
              </td>

              {/* Estado */}
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                  {paquete.estadopaquete}
                </span>
              </td>

              {/* Productos */}
              <td className="px-6 py-4 text-sm text-slate-300">
                {paquete.cantidadProductos || paquete.cantidadproductos || 0}
              </td>

              {/* Acciones */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end">
                  {idSelected === paquete.idpaquete ? (
                    <button
                      onClick={handleDeselectPaquete}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-xs font-semibold border border-green-500/30 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Seleccionado
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectPaquete(paquete.idpaquete)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-slate-300 rounded-lg text-xs font-medium transition-all"
                    >
                      Seleccionar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6 rounded-xl border border-gray-800 flex flex-col gap-4">
      {paquetes.length > 0 && (
        <button
          onClick={() => setShowForm(false)}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-2 transition-colors font-medium self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la lista de paquetes
        </button>
      )}

      <div className="mb-2">
        <h3 className="text-lg font-semibold text-slate-100">Registrar Nuevo Paquete</h3>
        <p className="text-sm text-slate-400">Completa la información del destinatario y datos del envío.</p>
      </div>

      <InputSearch<GetClienteSinCompras>
        placeholder="Buscar cliente..."
        atributes={['dniuser', 'nombres', 'apellidopaterno', 'apellidomaterno', 'rucuser']}
        objets={clientes}
        setObjetSelected={(cliente) => {
          setFormData((prev) => ({
            ...prev,
            idUsuarioDestino: cliente.iduser,
          }));
        }}
      />
      <InputText 
        htmlForm='clave de seguimiento'
        label='Clave de seguimiento'
        onChange={(value) => syncPaquete({ clave: value })}
        value={formData.clave}
      />
      <InputText 
        htmlForm='destino'
        label='Destino del paquete'
        onChange={(value) => syncPaquete({ destino: value })}
        value={formData.destino}
      />
      <InputNumber
        defaultValue={formData.montoCobrado}
        label='Monto Cobrado'
        simbol='S/.'
        onChange={(value) => syncPaquete({ montoCobrado: value })}
        placeholder='Ingrese el monto'
      />
      <div className='flex gap-2 pt-4 border-t border-gray-800'>
        <ButtonCancelForm 
          handleCancel={() => {
            if (paquetes.length > 0) {
              setShowForm(false);
            }
          }}
          isLoading={isLoadingPaquete}
          textButton="Cancelar"
          color='red'
        />
        <ButtonSubmitForm 
          handleSubmit={async () => {
            registrarPaquete(formData).then((response) => {
              if (response !== 0) {
                setDataEmitirGre((current) => ({
                  ...current,
                  paquete: formData,
                  idPaquete: response
                }));
                setIdPaquete(response);
                if (dataEmitirGre.idSalidaTransporte) {
                  refetchPaquetes(dataEmitirGre.idSalidaTransporte).then(() => {
                    setIdSelected(response);
                    setShowForm(false);
                  });
                } else {
                  setIdSelected(response);
                  setShowForm(false);
                }
              }
            })
          }}
          isError={isErrorPaquete}
          isLoading={isLoadingPaquete}
          textButton="Registrar paquete"
          textError="Error al registrar el paquete"
          color='blue'
        />
      </div>
    </div>
  );
}