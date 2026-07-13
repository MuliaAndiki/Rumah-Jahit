'use client';

import { cn } from '@/utils/classname';
import {
  SIDEBAR_CONTENT_TRANSITION,
  getSidebarLabelVisibility,
  getSidebarSectionVisibility,
} from '@/core/layouts/sidebar.layout';

type SidebarExpandableVariant = 'label' | 'section';

interface SidebarExpandableProps {
  isOpen: boolean;
  variant?: SidebarExpandableVariant;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'span' | 'p';
}

export function SidebarExpandable({
  isOpen,
  variant = 'label',
  className,
  children,
  as: Component = 'div',
}: SidebarExpandableProps) {
  const visibility =
    variant === 'section' ? getSidebarSectionVisibility(isOpen) : getSidebarLabelVisibility(isOpen);

  return (
    <Component
      className={cn(
        'shrink-0 whitespace-nowrap',
        SIDEBAR_CONTENT_TRANSITION,
        visibility,
        className
      )}
    >
      {children}
    </Component>
  );
}
