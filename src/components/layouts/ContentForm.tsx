interface ContentPageProps {
  children: React.ReactNode;
}

export default function ContentForm({
  children
}: ContentPageProps) {
  return (
    <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl p-8 mx-8 my-6 shadow-lg space-y-6">
      {children}
    </div>
  );
}