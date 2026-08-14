interface ContentPageProps {
  children: React.ReactNode;
}

export default function ContentPage({children}: ContentPageProps) {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
}