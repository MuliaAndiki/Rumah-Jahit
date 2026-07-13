export const SIDEBAR_OPEN_WIDTH = 'w-64';
export const SIDEBAR_ADMIN_OPEN_WIDTH = 'w-72';
export const SIDEBAR_ADMIN_CLOSED_WIDTH = 'w-24';
export const SIDEBAR_STUDENT_CLOSED_WIDTH = 'w-14 lg:w-24';

export const SIDEBAR_WIDTH_TRANSITION =
  'transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none will-change-[width]';

export const SIDEBAR_CONTENT_TRANSITION =
  'transition-[opacity,max-width,max-height,padding,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none overflow-hidden';

export function getSidebarAsideClassName(isOpen: boolean, variant: 'admin' | 'student') {
  return isOpen
    ? variant === 'admin'
      ? SIDEBAR_ADMIN_OPEN_WIDTH
      : SIDEBAR_OPEN_WIDTH
    : variant === 'admin'
      ? SIDEBAR_ADMIN_CLOSED_WIDTH
      : SIDEBAR_STUDENT_CLOSED_WIDTH;
}

export function getSidebarLabelVisibility(isOpen: boolean) {
  return isOpen
    ? 'max-w-[12rem] opacity-100 pointer-events-auto'
    : 'max-w-0 opacity-0 pointer-events-none';
}

export function getSidebarSectionVisibility(isOpen: boolean) {
  return isOpen ? 'max-h-8 opacity-100 mb-2' : 'max-h-0 opacity-0 mb-0 pointer-events-none';
}

export function getSidebarDividerVisibility(isOpen: boolean) {
  return isOpen ? 'max-h-px opacity-100 px-5' : 'max-h-0 opacity-0 px-0 pointer-events-none';
}
