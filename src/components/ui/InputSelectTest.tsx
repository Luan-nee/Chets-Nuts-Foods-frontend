import { useState, useRef, useEffect, } from 'react';

// Interfaz para definir la estructura de cada opción
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
];

export default function InputSelectTest() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<Person>(people[0]);
  
  // Tipamos la referencia como un elemento de HTMLDivElement
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para manejar la selección
  const handleSelect = (person: Person): void => {
    setSelectedPerson(person);
    setIsOpen(false);
  };

  return (
    <div className="p-10 bg-[#0F111A] min-h-screen font-sans">
      <div className="w-full max-w-sm mx-auto" ref={dropdownRef}>
        <div className="relative">
          {/* Botón Principal */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={`w-full p-3 pl-4 pr-10 text-left bg-transparent text-white border border-[#2D3340] rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 
                transition ease-in-out duration-150 text-[15px]
                ${isOpen ? 'border-slate-500' : ''}`}
          >
            <span className="block truncate">{selectedPerson.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg 
                className="w-5 h-5 text-gray-500" 
                viewBox="0 0 20 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 13l3 3 3-3" />
                <path d="M7 7l3-3 3 3" />
              </svg>
            </span>
          </button>

          {/* Menú Dropdown */}
          {isOpen && (
            <ul
              className="absolute z-10 w-full mt-1.5 bg-[#171A24] border border-[#2D3340] rounded-lg shadow-lg max-h-[310px] overflow-auto focus:outline-none scrollbar-thin scrollbar-thumb-gray-600"
              role="listbox"
            >
              {people.map((person) => (
                <li
                  key={person.id}
                  onClick={() => handleSelect(person)}
                  className={`group relative py-3 pl-11 pr-4 text-[15px] text-white cursor-pointer select-none 
                    hover:bg-slate-700/50 transition-colors duration-150
                    ${selectedPerson.id === person.id ? 'font-medium bg-slate-800/30' : 'font-normal'}`}
                  role="option"
                  aria-selected={selectedPerson.id === person.id}
                >
                  {/* Checkmark Icon */}
                  {selectedPerson.id === person.id && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg 
                        className="w-5 h-5 text-indigo-400" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                  )}
                  <span className="block truncate">{person.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}