interface ContentPageFloatingProps {
  children: React.ReactNode;
}

export default function ContentPageFloating({ children }: ContentPageFloatingProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg border border-[#1f2937] w-full max-w-3xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}