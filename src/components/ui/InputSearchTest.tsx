export default function InputSearchTest() {
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
      )}
    </div>
  );
}