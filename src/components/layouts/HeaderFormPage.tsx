import { ArrowLeft } from 'lucide-react';

interface HeaderFormPageProps {
  setShowForm: (p: boolean) => void;
  title: string;
  description: string;
}

export default function HeaderFormPage({ setShowForm, title, description }: HeaderFormPageProps) {
  return (
    <div className="flex items-center gap-5 border bg-gray-900 border-gray-800 px-6 py-5 mb-8 shadow-sm">
      <button
        onClick={() => setShowForm(false)}
        className="p-2.5 hover:text-white bg-blue-800/60 hover:bg-blue-800 border border-blue-500 hover:border-blue-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        aria-label="Volver"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <div className="flex-1 space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>
    </div>
  );
}