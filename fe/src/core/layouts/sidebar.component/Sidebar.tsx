'use client';

import { ChevronLeft, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { SIDEBAR_MENU } from '@/configs/app.config';
import {
  getSidebarAsideClassName,
  getSidebarDividerVisibility,
  getSidebarLabelVisibility,
  getSidebarSectionVisibility,
  SIDEBAR_CONTENT_TRANSITION,
  SIDEBAR_WIDTH_TRANSITION,
} from '@/core/layouts/sidebar.layout';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { PickResponeGetMe } from '@/types/res/auth.respone';
import { cn } from '@/utils/classname';

import { SidebarExpandable } from './SidebarExpandable';
interface SidebarProps {
  isOpen: boolean;

  onLogout: () => void;
  isPending: boolean;
  getme: PickResponeGetMe;
  isLoading: boolean;
}

export function Sidebar({ isOpen, isPending, onLogout, getme, isLoading }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const ns = useAppNameSpace();

  const onToggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName) ? prev.filter((m) => m !== menuName) : [...prev, menuName]
    );
  };

  const isActiveMenu = (url: string) => pathname?.startsWith(url);

  return (
    <>
      <aside
        className={cn(
          'sticky top-16 lg:top-20 self-start left-0 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-linear-to-b from-background via-background/50 to-background/5 border-r border-border z-40 hidden md:flex flex-col overflow-hidden',
          SIDEBAR_WIDTH_TRANSITION,
          getSidebarAsideClassName(isOpen, 'student'),
          !isOpen && 'items-center'
        )}
      >
        <div className="w-full h-full flex flex-col py-4 gap-4 lg:gap-5 overflow-hidden">
          <Link
            href="/student/profile"
            className={cn(
              ' lg:px-5 cursor-pointer transition-colors  ',
              !isOpen && 'px-2 lg:px-2 flex justify-center'
            )}
          >
            {/* <CurrentCard respone={getme} isOpen={isOpen} isLoading={isLoading} /> */}
          </Link>

          <div className="flex flex-col gap-2 w-full flex-1 overflow-hidden">
            <p
              className={cn(
                'text-muted-foreground font-medium text-xs shrink-0 px-5 whitespace-nowrap',
                SIDEBAR_CONTENT_TRANSITION,
                getSidebarSectionVisibility(isOpen)
              )}
            >
              MENU
            </p>
            <div className="flex-1 overflow-y-auto px-3 lg:px-5 thinnest-scrollbar">
              <ul className="flex flex-col gap-2 w-full">
                {SIDEBAR_MENU.map((item) => {
                  const isActive = isActiveMenu(item.url);
                  const isMenuOpen = openMenus.includes(item.name);
                  const hasSubMenu = item.subMenu.length > 0;
                  const IconComponent = item.icon;

                  return (
                    <li key={item.name} className="text-sm w-full">
                      {hasSubMenu ? (
                        <button
                          className={cn(
                            'flex items-center w-full gap-3 p-4 rounded-lg duration-200 transition-colors',
                            !isActive && 'hover:bg-muted',
                            !isOpen && 'justify-center'
                          )}
                          onClick={() => onToggleMenu(item.name)}
                          title={!isOpen ? item.name : undefined}
                        >
                          <IconComponent className="w-5 h-5 shrink-0 text-muted-foreground transition-transform" />
                          <div
                            className={cn(
                              'flex items-center justify-between flex-1 whitespace-nowrap',
                              SIDEBAR_CONTENT_TRANSITION,
                              getSidebarLabelVisibility(isOpen)
                            )}
                          >
                            <span className="text-foreground">{item.name}</span>
                            <ChevronLeft
                              className={cn(
                                'ml-auto w-4 h-4 transition-transform duration-200 text-muted-foreground',
                                isMenuOpen ? '-rotate-90' : 'rotate-180'
                              )}
                            />
                          </div>
                        </button>
                      ) : (
                        // tutup
                        <Link
                          href={item.url}
                          className={cn(
                            'flex items-center w-full gap-3 p-3 rounded-lg duration-200 transition-colors',
                            isActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-foreground hover:bg-muted',
                            !isOpen && 'justify-center'
                          )}
                          title={!isOpen ? item.name : undefined}
                        >
                          <IconComponent
                            className={cn(
                              'w-5 h-5 shrink-0 transition-colors font-extrabold',
                              isActive ? 'text-background' : 'text-muted-foreground'
                            )}
                          />
                          <SidebarExpandable
                            isOpen={isOpen}
                            as="span"
                            className={cn(
                              'font-extrabold',
                              isActive ? 'text-background' : 'text-foreground'
                            )}
                          >
                            {item.name}
                          </SidebarExpandable>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className={cn(
              'w-full hidden lg:block',
              SIDEBAR_CONTENT_TRANSITION,
              getSidebarDividerVisibility(isOpen)
            )}
          >
            <div className="w-full h-px bg-border" />
          </div>
          <div className="flex flex-col gap-2 pb-5">
            <p
              className={cn(
                'text-muted-foreground font-medium text-xs shrink-0 px-5 whitespace-nowrap',
                SIDEBAR_CONTENT_TRANSITION,
                getSidebarSectionVisibility(isOpen)
              )}
            >
              LAINNYA
            </p>
            <div className="px-3 lg:px-5 flex flex-col gap-1.5 w-full">
              <button
                disabled={isPending}
                onClick={() =>
                  ns.alert.confirm({
                    title: 'Keluar',
                    deskripsi: 'Apakah Anda yakin ingin keluar?',
                    icon: 'warning',
                    onConfirm: () => onLogout(),
                  })
                }
                className={cn(
                  'flex w-full gap-3 p-3 rounded-lg hover:bg-destructive/5 text-destructive border-2 border-destructive  duration-200 text-sm items-center transition-colors',
                  !isOpen && 'justify-center'
                )}
                title={!isOpen ? 'Keluar' : undefined}
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <SidebarExpandable isOpen={isOpen} as="span">
                  Keluar
                </SidebarExpandable>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background  border-t border-border z-50 flex justify-around items-center px-2 py-2 pb-safe shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
        {SIDEBAR_MENU.map((item) => {
          const isActive = isActiveMenu(item.url);
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                'flex flex-col items-center justify-center w-full py-1 px-1 transition-colors duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <IconComponent
                className={cn(
                  'mb-1 w-5 h-5 transition-transform duration-200',
                  isActive && 'scale-110'
                )}
              />
              <span
                className={cn(
                  'text-[10px] truncate w-full text-center transition-all duration-200',
                  isActive ? 'font-semibold' : 'font-medium'
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
