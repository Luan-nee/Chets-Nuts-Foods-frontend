import { useState, useEffect } from "react";
import { useUsuariosContext } from "../../context/usuariosContext";
import type { CreateUsuario } from "../../types/usuarios.type";
import swalAlert from "../messages/swalAlert";

interface SelectedUserFormProps<T> {
  selected: T;
  atributes: string[];
  onRegisterSuccess: (updatedUser: T) => void;
}

export default function SelectedUserForm<T>({
  selected,
  atributes,
  onRegisterSuccess,
}: SelectedUserFormProps<T>) {
  const { createNewUser } = useUsuariosContext();
  const [extraCorreo, setExtraCorreo] = useState("");
  const [extraEdad, setExtraEdad] = useState<number>(0);
  const [extraNumero, setExtraNumero] = useState("");
  const [extraSexo, setExtraSexo] = useState<"MASCULINO" | "FEMENINO">("MASCULINO");
  const [extraRuc, setExtraRuc] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Sync selected user details into editable extra inputs
  useEffect(() => {
    if (selected) {
      const sel = selected as any;
      setExtraCorreo(sel.correo || sel.corre || "");
      setExtraEdad(Number(sel.edad) || 0);
      setExtraNumero(sel.numero || sel.telefono || "");
      setExtraSexo(sel.sexo === "FEMENINO" ? "FEMENINO" : "MASCULINO");
      setExtraRuc(sel.ruc || sel.rucuser || "");
    }
  }, [selected]);

  function getValueByKey(obj: T, key: string): string {
    const value = (obj as Record<string, unknown>)[key];
    if (value === null || value === undefined) return "";
    if (value instanceof Date) return value.toLocaleDateString();
    if (value === "null" || value === "undefined") return "";
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return new Date(value).toLocaleDateString();
    }
    return String(value);
  }

  const handleRegister = async () => {
    const sel = selected as any;

    const body: CreateUsuario = {
      nombre: sel.nombre || sel.nombres || "",
      apellidomaterno: sel.apellidomaterno || sel.apellido_materno || "",
      apellidopaterno: sel.apellidopaterno || sel.apellido_paterno || "",
      dni: sel.dni || sel.dniuser || "",
      numero: extraNumero,
      ruc: extraRuc.trim() ? extraRuc.trim() : undefined,
      edad: Number(extraEdad),
      sexo: extraSexo,
      correo: extraCorreo,
      tipo: sel.tipo || "NATURAL",
    };

    try {
      setIsRegistering(true);
      const res = await createNewUser(body);
      if (res.status) {
        swalAlert({
          status: "success",
          message: "Usuario registrado/actualizado exitosamente"
        });

        if (res.data) {
          const apiData = res.data as any;
          const updatedUser = {
            ...selected,
            ...apiData,
            iduser: apiData.id || sel.iduser || 0,
            nombres: apiData.nombres || sel.nombres || "",
            correo: apiData.correo || extraCorreo,
            corre: apiData.correo || extraCorreo,
            numero: apiData.numero || extraNumero,
            telefono: apiData.numero || extraNumero,
            ruc: apiData.ruc || extraRuc,
            edad: apiData.edad || Number(extraEdad),
            sexo: apiData.sexo || extraSexo,
            tipo: apiData.tipo || sel.tipo || "NATURAL",
          } as T;

          onRegisterSuccess(updatedUser);
        }
      } else {
        swalAlert({
          status: "error",
          message: res.message || "Error al registrar el usuario"
        });
      }
    } catch (e: any) {
      swalAlert({
        status: "warning",
        message: e.message || "Error de red al registrar el usuario"
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-[#1a2030] border border-indigo-500/30 rounded-xl px-5 py-4 mt-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 12 12" fill="none" className="w-4 h-4 text-indigo-400">
            <path d="M1.5 6.5L4.5 9.5L10.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-indigo-400 font-medium mb-1">Objeto seleccionado</p>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            {atributes.map((attr) => (
              <p key={attr} className="text-xs text-slate-400 truncate">
                <span className="text-slate-500">{attr}: </span>
                <span className="text-slate-300">{getValueByKey(selected, attr)}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#2d3748] pt-4">
        <p className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Completar Datos de Registro / Modificar</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
          {/* Correo */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-400">Correo</label>
            <input
              type="email"
              value={extraCorreo}
              onChange={(e) => setExtraCorreo(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="bg-[#21283b] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>

          {/* Edad */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-400">Edad</label>
            <input
              type="number"
              value={extraEdad || ""}
              onChange={(e) => setExtraEdad(Number(e.target.value))}
              placeholder="Edad"
              className="bg-[#21283b] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>

          {/* Numero */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-400">Número</label>
            <input
              type="text"
              value={extraNumero}
              onChange={(e) => setExtraNumero(e.target.value)}
              placeholder="Número de celular"
              className="bg-[#21283b] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>

          {/* Sexo */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-400">Sexo</label>
            <select
              value={extraSexo}
              onChange={(e) => setExtraSexo(e.target.value as "MASCULINO" | "FEMENINO")}
              className="bg-[#21283b] border border-[#2d3748] rounded-lg px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500/60 transition-colors"
            >
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
            </select>
          </div>

          {/* Ruc */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-400">RUC</label>
            <input
              type="text"
              value={extraRuc}
              onChange={(e) => setExtraRuc(e.target.value)}
              placeholder="RUC (opcional)"
              className="bg-[#21283b] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>

          {/* Button */}
          <div>
            <button
              type="button"
              onClick={handleRegister}
              disabled={isRegistering}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md border border-indigo-500/20"
            >
              {isRegistering ? "Registrando..." : "Registrar / Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
