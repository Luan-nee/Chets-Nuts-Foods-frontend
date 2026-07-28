import { useState, useRef, useEffect, useCallback } from "react";
import { useUsuariosContext } from "../../context/usuariosContext";
import SelectedUserForm from "./SelectedUserForm";

// ── Types ──────────────────────────────────────────────────────────────────

interface InputSearchProps<T> {
  titulo: string;
  atributes: string[];
  setObjetSelected: (object: T) => void;
  objets: T[];
  placeholder?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getValueByKey<T>(obj: T, key: string): string {
  const value = (obj as Record<string, unknown>)[key];
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleDateString();
  if (value === "null" || value === "undefined") return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString();
  }
  return String(value);
}

// ── Component ──────────────────────────────────────────────────────────────

export default function InputSearch<T>({
  atributes,
  titulo,
  setObjetSelected,
  objets,
  placeholder = "Buscar...",
}: InputSearchProps<T>) {
  const { getBasicDataByDNI } = useUsuariosContext();
  const [query, setQuery] = useState("");
  const [selectedAtribute, setSelectedAtribute] = useState<string>(atributes[0] ?? "");
  const [results, setResults] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [atributeDropdownOpen, setAtributeDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selected, setSelected] = useState<T | null>(null);

  // States for DNI Query (Reniec fallback)
  const [dniLoading, setDniLoading] = useState(false);
  const [dniResult, setDniResult] = useState<any | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setAtributeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter results when query or attribute changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = objets.filter((obj) =>
      getValueByKey(obj, selectedAtribute).toLowerCase().includes(lower)
    );
    setResults(filtered);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, [query, selectedAtribute, objets]);

  // Reniec fallback query when no matches and query length is exactly 8 digits
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length === 8 && /^\d+$/.test(trimmed) && results.length === 0) {
      const fetchDni = async () => {
        try {
          setDniLoading(true);
          const res = await getBasicDataByDNI(trimmed);
          if (res.status && res.data) {
            setDniResult(res.data);
            setIsOpen(true);
          } else {
            setDniResult(null);
          }
        } catch (e) {
          setDniResult(null);
        } finally {
          setDniLoading(false);
        }
      };

      const timer = setTimeout(fetchDni, 450);
      return () => clearTimeout(timer);
    } else {
      setDniResult(null);
    }
  }, [query, results]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const handleSelect = useCallback(
    (obj: T) => {
      setSelected(obj);
      setObjetSelected(obj);
      setQuery(getValueByKey(obj, selectedAtribute));
      setIsOpen(false);
      setResults([]);
    },
    [setObjetSelected, selectedAtribute]
  );


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    if (results.length === 0 && dniResult) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSelect(createMockUserFromDni(dniResult));
      }
      return;
    }
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelected(null);
    setResults([]);
    setDniResult(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleAtributeSelect = (attr: string) => {
    setSelectedAtribute(attr);
    setAtributeDropdownOpen(false);
    setQuery("");
    setSelected(null);
    setResults([]);
    setDniResult(null);
    inputRef.current?.focus();
  };

  const createMockUserFromDni = (dniData: any): T => {
    const nombresFull = `${dniData.nombres || ""} ${dniData.apellido_paterno || dniData.apellidopaterno || ""} ${dniData.apellido_materno || dniData.apellidomaterno || ""}`.trim();
    return {
      iduser: dniData.iduser || 0,
      dni: dniData.dni || dniData.dniuser || "",
      dniuser: dniData.dni || dniData.dniuser || "",
      nombres: nombresFull,
      nombre: dniData.nombres || dniData.nombre || "",
      apellidopaterno: dniData.apellido_paterno || dniData.apellidopaterno || "",
      apellidomaterno: dniData.apellido_materno || dniData.apellidomaterno || "",
      correo: dniData.correo || dniData.corre || "",
      corre: dniData.correo || dniData.corre || "",
      numero: dniData.numero || dniData.telefono || "",
      telefono: dniData.numero || dniData.telefono || "",
      ruc: dniData.ruc || dniData.rucuser || "",
      rucuser: dniData.ruc || dniData.rucuser || "",
      edad: dniData.edad || 0,
      sexo: dniData.sexo === "FEMENINO" ? "FEMENINO" : "MASCULINO",
      tipo: dniData.tipo || "NATURAL",
    } as unknown as T;
  };

  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-indigo-400 font-semibold">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const secondaryAtributes = atributes.filter((a) => a !== selectedAtribute);

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={wrapRef}>
      {/* Label */}
      <p className="text-sm font-medium text-slate-400">{titulo}</p>

      {/* Input row */}
      <div
        className={[
          "flex items-center bg-[#1e2535] border rounded-lg transition-colors overflow-visible",
          isOpen || atributeDropdownOpen
            ? "border-indigo-500/60"
            : "border-[#2d3748] hover:border-slate-500",
        ].join(" ")}
      >
        {/* Attribute selector */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              setAtributeDropdownOpen((o) => !o);
              setIsOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-[#252d3d] hover:bg-[#2f3a52] rounded-l-[7px] border-r border-[#2d3748] text-sm font-medium text-slate-300 transition-colors whitespace-nowrap"
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 text-slate-500">
              <rect x="1" y="2" width="12" height="2.5" rx="1" fill="currentColor" />
              <rect x="1" y="6" width="8" height="2.5" rx="1" fill="currentColor" />
              <rect x="1" y="10" width="5" height="2.5" rx="1" fill="currentColor" />
            </svg>
            <span className="max-w-[90px] truncate">{selectedAtribute}</span>
            <svg
              viewBox="0 0 10 10"
              fill="none"
              className={`w-2.5 h-2.5 text-slate-500 transition-transform duration-150 ${atributeDropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Attribute dropdown */}
          {atributeDropdownOpen && (
            <div className="absolute top-[calc(100%+4px)] left-0 bg-[#252d3d] border border-[#2d3748] rounded-xl overflow-hidden z-20 min-w-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              {atributes.map((attr) => (
                <button
                  key={attr}
                  type="button"
                  onClick={() => handleAtributeSelect(attr)}
                  className={[
                    "w-full text-left px-3.5 py-2 text-sm transition-colors whitespace-nowrap flex items-center gap-2",
                    attr === selectedAtribute
                      ? "bg-indigo-500/20 text-indigo-300 font-medium"
                      : "text-slate-300 hover:bg-[#2f3a52]",
                  ].join(" ")}
                >
                  {attr === selectedAtribute && (
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 flex-shrink-0">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span className={attr === selectedAtribute ? "" : "pl-[14px]"}>{attr}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search icon */}
        <div className="pl-3 flex-shrink-0">
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 text-slate-500">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length > 0 || dniResult) setIsOpen(true); }}
          placeholder={`${placeholder} por ${selectedAtribute}`}
          className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-600 py-2.5 px-2.5 min-w-0"
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="pr-3 text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
            aria-label="Limpiar búsqueda"
          >
            <svg viewBox="0 0 10 10" fill="none" className="w-3.5 h-3.5">
              <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && (
        <div className="bg-[#1e2535] border border-[#2d3748] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-10">
          {dniLoading ? (
            <div className="flex items-center justify-center gap-2.5 py-6 px-4">
              <svg className="animate-spin h-5 w-5 text-indigo-500 animate-pulse" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-sm text-slate-400">Buscando DNI en Reniec...</p>
            </div>
          ) : results.length === 0 && dniResult ? (
            <>
              <div className="px-3.5 py-2 border-b border-[#2d3748] flex items-center justify-between">
                <p className="text-xs text-indigo-400 font-semibold">
                  Dato encontrado vía DNI (Reniec)
                </p>
                <p className="text-xs text-slate-600">Enter para seleccionar</p>
              </div>
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelect(createMockUserFromDni(dniResult))}
                    className="w-full text-left px-3.5 py-3 flex items-start gap-3 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
                      <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5 text-indigo-400">
                        <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M1.5 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-200 truncate font-semibold">
                        {dniResult.nombres} {dniResult.apellido_paterno} {dniResult.apellido_materno}
                      </p>
                      <p className="text-xs text-indigo-400 mt-0.5">DNI: {dniResult.dni} (Haz clic para seleccionar)</p>
                    </div>
                  </button>
                </li>
              </ul>
            </>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-6 px-4 text-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-slate-600">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M17 17L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-slate-500">Sin resultados para <span className="text-slate-300">"{query}"</span></p>
            </div>
          ) : (
            <>
              <div className="px-3.5 py-2 border-b border-[#2d3748] flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
                </p>
                <p className="text-xs text-slate-600">↑ ↓ navegar · Enter seleccionar</p>
              </div>
              <ul ref={listRef} className="max-h-56 overflow-y-auto">
                {results.map((obj, idx) => {
                  const primary = getValueByKey(obj, selectedAtribute);
                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => handleSelect(obj)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={[
                          "w-full text-left px-3.5 py-2.5 flex items-start gap-3 transition-colors",
                          highlightedIndex === idx
                            ? "bg-indigo-500/10"
                            : "hover:bg-[#252d3d]",
                        ].join(" ")}
                      >
                        {/* Icon */}
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5 text-indigo-400">
                            <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M1.5 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Primary field (highlighted) */}
                          <p className="text-sm text-slate-200 truncate">
                            {highlightMatch(primary)}
                          </p>
                          {/* Secondary fields */}
                          <div className="flex flex-wrap gap-x-3 mt-0.5">
                            {secondaryAtributes.slice(0, 2).map((attr) => (
                              <p key={attr} className="text-xs text-slate-500 truncate">
                                <span className="text-slate-600">{attr}: </span>
                                {getValueByKey(obj, attr)}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Enter hint */}
                        {highlightedIndex === idx && (
                          <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                            Enter
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Selected result card & extra registration form */}
      {selected && (
        <SelectedUserForm
          selected={selected}
          atributes={atributes}
          onRegisterSuccess={(updatedUser) => {
            setSelected(updatedUser);
            setObjetSelected(updatedUser);
          }}
        />
      )}
    </div>
  );
}
