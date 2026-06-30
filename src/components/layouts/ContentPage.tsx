interface ContentPageProps {
  children: React.ReactNode;
}

export default function ContentPage({children}: ContentPageProps) {
  return (
    <div className="absolute inset-0 z-50 bg-gray-950">
      <div className="flex-1 bg-gray-950 overflow-auto">
        {children}
      </div>
    </div>
  )
}