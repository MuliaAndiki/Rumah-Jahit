'use client';

import {
  createContext,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type SidebarLayoutContextValue = {
  isOpen: boolean;
  toggleSidebar: () => void;
  setIsOpen: (open: boolean) => void;
  isAdmin: boolean;
  sidebarWidth: string;
  sidebarWidthClass: string;
};

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(null);

type SidebarLayoutProviderProps = {
  children: ReactNode;
  isAdmin: boolean;
};

export function SidebarLayoutProvider({ children, isAdmin }: SidebarLayoutProviderProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  const sidebarWidth = isAdmin ? '18rem' : '16rem';
  const sidebarWidthClass = isAdmin ? 'w-72' : 'w-64';

  const value = useMemo<SidebarLayoutContextValue>(
    () => ({
      isOpen,
      toggleSidebar,
      setIsOpen,
      isAdmin,
      sidebarWidth,
      sidebarWidthClass,
    }),
    [isOpen, toggleSidebar, isAdmin, sidebarWidth, sidebarWidthClass]
  );

  return (
    <SidebarLayoutContext.Provider value={value}>
      <div
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden"
        style={{ '--sidebar-width': sidebarWidth } as CSSProperties}
      >
        {children}
      </div>
    </SidebarLayoutContext.Provider>
  );
}

export function useSidebarLayout() {
  const context = useContext(SidebarLayoutContext);

  if (!context) {
    throw new Error('useSidebarLayout must be used within SidebarLayoutProvider.');
  }

  return context;
}
