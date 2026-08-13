// Este componente es el contenedor principal de todo el contenido
// que hay dentro de cada Page.

interface ContentPageMainProps {
  children: React.ReactNode;
}

export default function ContentPageMain({children}: ContentPageMainProps) {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  );
}