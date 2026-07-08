import { useState, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type AMPM = "AM" | "PM";
type Tab = "date" | "time";

interface SelectedDateTime {
  date: Date;
  hour: number;
  minute: number;
  ampm: AMPM;
}

// ── Constants ──────────────────────────────────────────────────────────────

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAY_NAMES = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

// ── Helpers ────────────────────────────────────────────────────────────────

const pad = (n: number) => String(n).padStart(2, "0");

const formatTrigger = (dt: SelectedDateTime) =>
  `${dt.date.getDate()} ${MONTHS[dt.date.getMonth()].slice(0, 3)}. · ${pad(dt.hour)}:${pad(dt.minute)} ${dt.ampm}`;

// const formatResultDate = (date: Date) => {
//   const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
//   return `${days[date.getDay()]}, ${date.getDate()} de ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
// };

// ── Sub-components ─────────────────────────────────────────────────────────

interface CalendarPanelProps {
  viewDate: Date;
  selectedDate: Date | null;
  onSelectDay: (date: Date) => void;
  onChangeMonth: (dir: -1 | 1) => void;
}

function CalendarPanel({ viewDate, selectedDate, onSelectDay, onChangeMonth }: CalendarPanelProps) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const isToday = (d: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

  const isSelected = (d: number) =>
    selectedDate?.getFullYear() === year &&
    selectedDate?.getMonth() === month &&
    selectedDate?.getDate() === d;

  const trailing = (firstWeekday + daysInMonth) % 7;

  return (
    <div className="p-3.5">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onChangeMonth(-1)}
          aria-label="Mes anterior"
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2d3748] bg-transparent text-slate-400 hover:bg-[#252d3d] transition-colors"
        >
          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-sm font-medium text-slate-200">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={() => onChangeMonth(1)}
          aria-label="Mes siguiente"
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2d3748] bg-transparent text-slate-400 hover:bg-[#252d3d] transition-colors"
        >
          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {/* Header */}
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-[11px] font-medium text-slate-500 py-1">
            {d}
          </div>
        ))}

        {/* Prev month trailing days */}
        {Array.from({ length: firstWeekday }, (_, i) => (
          <div key={`prev-${i}`} className="h-8 flex items-center justify-center text-[13px] text-slate-600 mx-auto w-8">
            {prevMonthDays - firstWeekday + 1 + i}
          </div>
        ))}

        {/* Current month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1;
          const selected = isSelected(d);
          const todayDay = isToday(d);

          return (
            <button
              key={d}
              onClick={() => onSelectDay(new Date(year, month, d))}
              className={[
                "h-8 w-8 mx-auto flex items-center justify-center rounded-lg text-[13px] transition-colors",
                selected
                  ? "bg-indigo-500 text-white font-medium"
                  : todayDay
                  ? "text-indigo-400 font-medium hover:bg-[#252d3d]"
                  : "text-slate-300 hover:bg-[#252d3d]",
              ].join(" ")}
            >
              {d}
            </button>
          );
        })}

        {/* Next month leading days */}
        {trailing > 0 &&
          Array.from({ length: 7 - trailing }, (_, i) => (
            <div key={`next-${i}`} className="h-8 flex items-center justify-center text-[13px] text-slate-600 mx-auto w-8">
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────

interface TimePanelProps {
  hour: number;
  minute: number;
  ampm: AMPM;
  onChangeHour: (dir: 1 | -1) => void;
  onChangeMinute: (dir: 1 | -1) => void;
  onChangeAMPM: (val: AMPM) => void;
}

function TimePanel({ hour, minute, ampm, onChangeHour, onChangeMinute, onChangeAMPM }: TimePanelProps) {
  const ChevronBtn = ({ onClick, up, label }: { onClick: () => void; up: boolean; label: string }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center p-1 rounded-lg text-slate-400 hover:bg-[#252d3d] hover:text-slate-200 transition-colors"
    >
      <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
        {up
          ? <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        }
      </svg>
    </button>
  );

  return (
    <div className="p-3.5">
      <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-3">Hora</p>

      <div className="flex items-center gap-2 mb-3">
        {/* Hours */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <ChevronBtn onClick={() => onChangeHour(1)} up label="Aumentar hora" />
          <div className="text-[22px] font-medium text-slate-100 min-w-[44px] text-center bg-[#252d3d] rounded-lg py-1.5 border border-[#2d3748]">
            {pad(hour)}
          </div>
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">hora</p>
          <ChevronBtn onClick={() => onChangeHour(-1)} up={false} label="Disminuir hora" />
        </div>

        <span className="text-xl font-medium text-slate-500 pb-1">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <ChevronBtn onClick={() => onChangeMinute(1)} up label="Aumentar minutos" />
          <div className="text-[22px] font-medium text-slate-100 min-w-[44px] text-center bg-[#252d3d] rounded-lg py-1.5 border border-[#2d3748]">
            {pad(minute)}
          </div>
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">min</p>
          <ChevronBtn onClick={() => onChangeMinute(-1)} up={false} label="Disminuir minutos" />
        </div>
      </div>

      {/* AM / PM */}
      <div className="flex gap-1.5">
        {(["AM", "PM"] as AMPM[]).map((val) => (
          <button
            key={val}
            onClick={() => onChangeAMPM(val)}
            className={[
              "flex-1 py-1.5 text-sm font-medium rounded-lg border transition-all",
              ampm === val
                ? "bg-indigo-500 border-indigo-500 text-white"
                : "bg-transparent border-[#2d3748] text-slate-400 hover:bg-[#252d3d] hover:text-slate-200",
            ].join(" ")}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

interface DateTimePickerProps {
  onChange: (value: SelectedDateTime | null) => void;
}

export default function DateTimePicker({ onChange }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("date");
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState<AMPM>("AM");
  const [applied, setApplied] = useState<SelectedDateTime | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleChangeMonth = (dir: -1 | 1) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  };

  const handleChangeHour = (dir: 1 | -1) => {
    setHour((h) => ((h - 1 + dir + 12) % 12) + 1);
  };

  const handleChangeMinute = (dir: 1 | -1) => {
    setMinute((m) => (m + dir * 5 + 60) % 60);
  };

  const handleClear = () => {
    onChange(null);
    setSelectedDate(null);
    setHour(12);
    setMinute(0);
    setAmpm("AM");
    setApplied(null);
    setOpen(false);
  };

  const handleApply = () => {
    if (!selectedDate) { setOpen(false); return; }
    setApplied({ date: selectedDate, hour, minute, ampm });
    onChange({ date: selectedDate, hour, minute, ampm });
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 w-80 p-4" ref={wrapRef}>
      {/* Label */}
      <p className="text-sm font-medium text-slate-400">Fecha y hora</p>

      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#1e2535] border border-[#2d3748] rounded-lg hover:border-slate-500 transition-colors w-full text-left"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-slate-500 flex-shrink-0">
          <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 1.5V4M11 1.5V4M2 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className={`flex-1 text-sm ${applied ? "text-slate-200" : "text-slate-500"}`}>
          {applied ? formatTrigger(applied) : "Selecciona fecha y hora"}
        </span>
        <svg
          viewBox="0 0 10 10"
          fill="none"
          className={`w-2.5 h-2.5 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Popover */}
      {open && (
        <div className="bg-[#1e2535] border border-[#2d3748] rounded-xl overflow-hidden -mt-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {/* Tabs */}
          <div className="flex border-b border-[#2d3748]">
            {(["date", "time"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#252d3d]",
                ].join(" ")}
              >
                {tab === "date" ? (
                  <>
                    <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
                      <rect x="1" y="2" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M4 1V3M10 1V3M1 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Fecha
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M7 4.5V7l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Hora
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Panel */}
          {activeTab === "date" ? (
            <CalendarPanel
              viewDate={viewDate}
              selectedDate={selectedDate}
              onSelectDay={setSelectedDate}
              onChangeMonth={handleChangeMonth}
            />
          ) : (
            <TimePanel
              hour={hour}
              minute={minute}
              ampm={ampm}
              onChangeHour={handleChangeHour}
              onChangeMinute={handleChangeMinute}
              onChangeAMPM={setAmpm}
            />
          )}

          {/* Footer */}
          <div className="flex gap-2 px-3.5 py-2.5 border-t border-[#2d3748]">
            <button
              onClick={handleClear}
              className="flex-1 py-1.5 text-sm text-slate-400 border border-[#2d3748] rounded-lg hover:bg-[#252d3d] hover:text-slate-200 transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-1.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Result card */}
      {/* <div className="flex items-center gap-3 bg-[#1a2030] border border-[#2d3748] rounded-xl px-4 py-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-indigo-400">
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 1.5V4M11 1.5V4M2 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M5 10h2M9 10h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          {applied ? (
            <>
              <p className="text-sm font-medium text-slate-200 capitalize">{formatResultDate(applied.date)}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {pad(applied.hour)}:{pad(applied.minute)} {applied.ampm}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">Sin fecha seleccionada</p>
          )}
        </div>
      </div> */}
    </div>
  );
}