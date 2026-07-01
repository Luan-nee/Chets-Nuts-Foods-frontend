import { useState } from "react";
import DateTimePicker from "../components/ui/SelectDateTime";
type SelectedDateTime = {
  date: Date;
  hour: number;
  minute: number;
  ampm: "AM" | "PM";
};

export default function Test() {
  const [selectedDateTime, setSelectedDateTime] = useState<SelectedDateTime | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center p-8">
      <div className="flex flex-col gap-6 w-full max-w-sm">

        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Agendar reunión</h1>
          <p className="text-sm text-slate-500 mt-1">
            Selecciona la fecha y hora para tu próxima reunión.
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#1e2535] border border-[#2d3748] rounded-2xl p-5 flex flex-col gap-5">

          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-400">Nombre de la reunión</label>
            <input
              type="text"
              placeholder="Ej. Revisión de diseño"
              className="bg-[#151b28] border border-[#2d3748] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-slate-500 transition-colors"
            />
          </div>

          {/* Participantes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-400">Participantes</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="bg-[#151b28] border border-[#2d3748] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-slate-500 transition-colors"
            />
          </div>

          {/* DateTimePicker */}
          <div className="flex flex-col gap-1.5">
            <DateTimePicker onChange={setSelectedDateTime} />
          </div>

          {/* Submit */}
          <button 
            onClick={() => {
              console.log("Selected DateTime:", selectedDateTime);
            }}
          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors mt-1">
            Agendar reunión
          </button>

        </div>

      </div>
    </div>
  );
}