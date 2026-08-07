import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(children);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isTransitioning, setIsTransitioning] = useState<'idle' | 'exiting' | 'entering'>('idle');

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setIsTransitioning('exiting');
      
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setCurrentPath(location.pathname);
        setIsTransitioning('entering');
      }, 180); // 180ms exit animation
      
      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children, currentPath]);

  useEffect(() => {
    if (isTransitioning === 'entering') {
      const timer = setTimeout(() => {
        setIsTransitioning('idle');
      }, 250); // 250ms entry animation
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const transitionClass = isTransitioning === 'exiting'
    ? 'page-transition-exiting'
    : isTransitioning === 'entering'
    ? 'page-transition-entering'
    : '';

  return (
    <div className="flex max-md:flex-col h-screen bg-gray-950 text-gray-100">
      <NavBar /> 
      <div className="flex-1 overflow-auto">
        <div className={`page-transition ${transitionClass}`}>
          {displayChildren}
        </div>
      </div>
    </div>
  );
}
