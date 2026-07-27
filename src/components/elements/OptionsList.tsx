import { useState } from "react";
import { Check } from "lucide-react";

type Option = {
  label: string;
  value: string | number;
}

interface OptionListProps {
  options: Option[];
  onSelect: (value: string | number) => void;
  children: React.ReactNode;
  valueSelected?: string | number | null;
}

export default function OptionList({ 
  options, 
  onSelect,
  children,
  valueSelected = null
}: OptionListProps) {
  const [optionSelected, setOptionSelected] = useState<Option | null>(() => {
    if (valueSelected !== null) {
      const selectedOption = options.find(option => option.value === valueSelected);
      return selectedOption || null;
    }
    return null;
  });
  const [openList, isOpenList] = useState<boolean>(false);

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => isOpenList(!openList)}
        className="focus:outline-none"
      >
        { children }
      </button>
      { openList && (
        <div className="absolute top-[calc(100%+4px)] left-0 bg-[#252d3d] border border-[#2d3748] rounded-xl overflow-hidden z-20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setOptionSelected(option);
                onSelect(option.value);
                isOpenList(false)
              }}
              className={[
                "w-full text-left px-3.5 py-2 text-sm transition-colors whitespace-nowrap flex items-center gap-2",
                optionSelected?.value === option.value
                  ? "bg-indigo-500/20 text-indigo-300 font-medium"
                  : "text-slate-300 hover:bg-[#2f3a52]",
              ].join(" ")}
            >
              {optionSelected?.value === option.value && (
                <Check className="w-4 h-4 text-indigo-400" />
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}