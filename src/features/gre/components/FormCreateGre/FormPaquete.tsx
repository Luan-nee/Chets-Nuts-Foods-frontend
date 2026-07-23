import { useEffect, useState } from "react";
import InputText from "../../../../components/ui/InputText";
import InputNumber from "../../../../components/ui/InputNumber";
import ButtonCancelForm from "../../../../components/ui/ButtonCancelForm";
import ButtonSubmitForm from "../../../../components/ui/ButtonSubmitForm";
import InputSearch from "../../../../components/ui/InputSearch";
import Table from "../../../../components/ui/Table";
import Loading from "../../../../components/ui/Loading";
import { Plus, Hash, Check, ArrowLeft, Edit, Trash2, RefreshCw } from 'lucide-react';
import { useRegistrarPaquete } from "../../../paquetes/hooks/useRegistrarPaquete";
import { useActualizarPaquete } from "../../../paquetes/hooks/useActualizarPaquete";
import { useActualizarEstadoPaquete } from "../../../paquetes/hooks/useActualizarEstadoPaquete";
import { useFetchClientesSinCompras } from "../../../clientes/hooks/useFetchClientesSinCompras";
import { useFetchPaquetes } from "../../../paquetes/hooks/useFetchPaquetes";
import { useFetchPaqueteData } from "../../../paquetes/hooks/useFetchPaqueteData";
import type { GetClienteSinCompras } from "../../../../types/clientes.type";
import type { CreatePaquete } from '../../../../types/paquete.type';
import { useGreContext } from '../../../../context/GreContext';
import { useSocket } from "../../../../context/SocketContext";

export default function FormPaquete() {
  const {
    dataEmitirGre,
    setDataEmitirGre,
    setIdPaquete,
  } = useGreContext();

  const socket = useSocket();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<number | null>(dataEmitirGre.idPaquete || null);

  const [formData, setFormData] = useState<CreatePaquete>({
    clave: "",
    destino: "",
    idSalidaTransporte: dataEmitirGre.idSalidaTransporte || 0,
    idUsuario: 0,
    idUsuarioDestino: 0,
    montoCobrado: 0,
    observacion: ""
  });

  // States for Edit Modal
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editEmisorName, setEditEmisorName] = useState<string>("");
  const [editReceptorName, setEditReceptorName] = useState<string>("");
  const [editFormData, setEditFormData] = useState<Partial<CreatePaquete> & { idpaquete: number, observacion: string }>({
    idpaquete: 0,
    clave: "",
    destino: "",
    idSalidaTransporte: dataEmitirGre.idSalidaTransporte || 0,
    idUsuario: 0,
    idUsuarioDestino: 0,
    montoCobrado: 0,
    observacion: ""
  });

  const {
    execute: registrarPaquete,
    isLoading: isLoadingPaquete,
    isError: isErrorPaquete,
  } = useRegistrarPaquete();

  const {
    execute: actualizarPaquete,
    isLoading: isLoadingActualizar,
  } = useActualizarPaquete();

  const {
    execute: actualizarEstadoPaquete,
    isLoading: isLoadingEstado,
  } = useActualizarEstadoPaquete();

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

  useEffect(() => {
    if (!socket) return;

    const handleNewOrUpdatedPaquete = (data: any) => {
      if (dataEmitirGre.idSalidaTransporte) {
        refetchPaquetes(dataEmitirGre.idSalidaTransporte);
      }
    };

    const handleUpdateEstadoPaquete = (data: { idpaquete: number, estado: string }) => {
      if (dataEmitirGre.idSalidaTransporte) {
        refetchPaquetes(dataEmitirGre.idSalidaTransporte);
      }
      if (data.idpaquete === idSelected && data.estado === "CANCELADO") {
        handleDeselectPaquete();
      }
    };

    socket.on("server::updatePaquete", handleNewOrUpdatedPaquete);
    socket.on("server::updateEstadoPaquete", handleUpdateEstadoPaquete);

    return () => {
      socket.off("server::updatePaquete", handleNewOrUpdatedPaquete);
      socket.off("server::updateEstadoPaquete", handleUpdateEstadoPaquete);
    };
  }, [socket, dataEmitirGre.idSalidaTransporte, idSelected]);

  const syncPaquete = (nextValues: Partial<CreatePaquete>) => {
    setFormData((prev) => ({
      ...prev,
      ...nextValues,
    }));
  };

  const handleToggleEstado = async (id: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === "CANCELADO" ? "HOME" : "CANCELADO";
    const success = await actualizarEstadoPaquete(id, nuevoEstado);
    if (success) {
      if (dataEmitirGre.idSalidaTransporte) {
        refetchPaquetes(dataEmitirGre.idSalidaTransporte);
      }
      if (id === idSelected && nuevoEstado === "CANCELADO") {
        handleDeselectPaquete();
      }
    }
  };

  const findClientIdByDni = (dni: string | undefined): number => {
    if (!dni) return 0;
    const match = clientes.find(c => c.dniuser === dni);
    return match ? match.iduser : 0;
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
          idUsuario: findClientIdByDni(details.usuarioOrigen?.dni),
          idUsuarioDestino: findClientIdByDni(details.usuarioDestino?.dni),
          montoCobrado: parseFloat(details.paquete.montoPagado) || 0,
          observacion: details.paquete.observacion || ""
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
        idUsuario: 0,
        idUsuarioDestino: 0,
        montoCobrado: 0,
        observacion: ""
      }
    }));
  };

  const handleOpenEditModal = async (paquete: any) => {
    const details = await fetchPaqueteData(paquete.idpaquete);
    if (details) {
      const idEmisor = findClientIdByDni(details.usuarioOrigen?.dni);
      const idReceptor = findClientIdByDni(details.usuarioDestino?.dni);
      setEditFormData({
        idpaquete: paquete.idpaquete,
        clave: details.paquete.clave || "",
        destino: details.paquete.destino || "",
        idSalidaTransporte: dataEmitirGre.idSalidaTransporte || 0,
        idUsuario: idEmisor,
        idUsuarioDestino: idReceptor,
        montoCobrado: parseFloat(details.paquete.montoPagado) || 0,
        observacion: details.paquete.observacion || ""
      });
      setEditEmisorName(details.usuarioOrigen ? `${details.usuarioOrigen.nombre} ${details.usuarioOrigen.apellidoPaterno} ${details.usuarioOrigen.apellidoMaterno}` : "No seleccionado");
      setEditReceptorName(details.usuarioDestino ? `${details.usuarioDestino.nombre} ${details.usuarioDestino.apellidoPaterno} ${details.usuarioDestino.apellidoMaterno}` : "No seleccionado");
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async () => {
    if (editFormData.idpaquete === 0) return;
    const body = {
      idUsuario: editFormData.idUsuario,
      idUsuarioDestino: editFormData.idUsuarioDestino,
      destino: editFormData.destino,
      clave: editFormData.clave,
      montoCobrado: editFormData.montoCobrado,
      observacion: editFormData.observacion
    };
    const success = await actualizarPaquete(editFormData.idpaquete, body);
    if (success) {
      setShowEditModal(false);
      if (dataEmitirGre.idSalidaTransporte) {
        refetchPaquetes(dataEmitirGre.idSalidaTransporte);
      }
    }
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
    const tableHeader = ["ID Paquete", "Destino", "Monto Cobrado", "Estado", "N° Productos", "Acciones"];
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
              className={`border-b border-gray-800 hover:bg-gray-800/40 transition-colors ${idSelected === paquete.idpaquete ? 'bg-blue-900/10' : ''
                }`}
            >
              {/* ID */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${idSelected === paquete.idpaquete ? 'bg-blue-500/20' : 'bg-gray-800'
                    }`}>
                    <Hash className={`w-4 h-4 ${idSelected === paquete.idpaquete ? 'text-blue-400' : 'text-slate-400'
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
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${paquete.estadopaquete === "CANCELADO"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-blue-500/10 text-blue-400"
                  }`}>
                  {paquete.estadopaquete}
                </span>
              </td>

              {/* Productos */}
              <td className="px-6 py-4 text-sm text-slate-300">
                {paquete.cantidadProductos || paquete.cantidadProductos || 0}
              </td>

              {/* Acciones */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditModal(paquete)}
                    disabled={paquete.estadopaquete === "CANCELADO"}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${paquete.estadopaquete === "CANCELADO"
                        ? "bg-gray-800/50 border-gray-800 text-slate-500 cursor-not-allowed"
                        : "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-400"
                      }`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Editar
                  </button>

                  <button
                    onClick={() => handleToggleEstado(paquete.idpaquete, paquete.estadopaquete)}
                    disabled={isLoadingEstado}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${paquete.estadopaquete === "CANCELADO"
                        ? "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400"
                      }`}
                  >
                    {paquete.estadopaquete === "CANCELADO" ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reactivar
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3.5 h-3.5" />
                        Eliminar
                      </>
                    )}
                  </button>

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
                      disabled={paquete.estadopaquete === "CANCELADO"}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${paquete.estadopaquete === "CANCELADO"
                          ? "bg-gray-800/50 border-gray-800 text-slate-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
                    >
                      Seleccionar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {/* Modal para Editar Paquete */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
                <h3 className="text-lg font-bold text-white">Editar Paquete #{editFormData.idpaquete}</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {/* Resumen de Clientes Actuales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-gray-950 border border-gray-800 text-sm">
                  <div>
                    <span className="text-gray-500 block">Emisor Seleccionado:</span>
                    <span className="text-white font-medium">{editEmisorName || "No seleccionado"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Receptor Seleccionado:</span>
                    <span className="text-white font-medium">{editReceptorName || "No seleccionado"}</span>
                  </div>
                </div>

                <InputSearch<GetClienteSinCompras>
                  placeholder="Buscar nuevo cliente emisor..."
                  titulo="Cambiar Cliente EMISOR"
                  atributes={['dniuser', 'nombres', 'apellidopaterno', 'apellidomaterno', 'rucuser']}
                  objets={clientes}
                  setObjetSelected={(cliente) => {
                    setEditFormData((prev) => ({ ...prev, idUsuario: cliente.iduser }));
                    setEditEmisorName(`${cliente.nombres} ${cliente.apellidopaterno} ${cliente.apellidomaterno}`);
                  }}
                />

                <InputSearch<GetClienteSinCompras>
                  placeholder="Buscar nuevo cliente receptor..."
                  titulo="Cambiar Cliente RECEPTOR"
                  atributes={['dniuser', 'nombres', 'apellidopaterno', 'apellidomaterno', 'rucuser']}
                  objets={clientes}
                  setObjetSelected={(cliente) => {
                    setEditFormData((prev) => ({ ...prev, idUsuarioDestino: cliente.iduser }));
                    setEditReceptorName(`${cliente.nombres} ${cliente.apellidopaterno} ${cliente.apellidomaterno}`);
                  }}
                />

                <InputText
                  htmlForm="edit-clave"
                  label="Clave de seguimiento"
                  onChange={(value) => setEditFormData(prev => ({ ...prev, clave: value }))}
                  value={editFormData.clave || ""}
                />

                <InputText
                  htmlForm="edit-destino"
                  label="Destino"
                  onChange={(value) => setEditFormData(prev => ({ ...prev, destino: value }))}
                  value={editFormData.destino || ""}
                />

                <InputNumber
                  defaultValue={editFormData.montoCobrado || 0}
                  label="Monto Cobrado"
                  simbol="S/."
                  onChange={(value) => setEditFormData(prev => ({ ...prev, montoCobrado: value }))}
                  placeholder="Monto cobrado"
                />

                <InputText
                  htmlForm="edit-observacion"
                  label="Observación"
                  onChange={(value) => setEditFormData(prev => ({ ...prev, observacion: value }))}
                  value={editFormData.observacion || ""}
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-gray-950">
                <button
                  onClick={() => setShowEditModal(false)}
                  disabled={isLoadingActualizar}
                  className="px-4 py-2 border border-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isLoadingActualizar}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {isLoadingActualizar ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        )}
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
        placeholder="Buscar cliente emisor ..."
        titulo="Buscar cliente EMISOR "
        atributes={['dniuser', 'nombres', 'apellidopaterno', 'apellidomaterno', 'rucuser']}
        objets={clientes}
        setObjetSelected={(cliente) => {
          setFormData((prev) => ({
            ...prev,
            idUsuario: cliente.iduser,
          }));
        }}
      />

      <InputSearch<GetClienteSinCompras>
        placeholder="Buscar cliente receptor ..."
        titulo="Buscar Cliente Receptor"
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
      <InputText
        htmlForm='observacion'
        label='Observación'
        onChange={(value) => syncPaquete({ observacion: value })}
        value={formData.observacion || ""}
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