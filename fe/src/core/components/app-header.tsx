'use client';

import { navigationMenuConfig } from '@/configs/app.config';
import { cn } from '@/utils/classname';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import ThemeToggle from './theme-toggle';

export default function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md px-6 py-4 transition-all duration-300 border-b',
        isScrolled ? 'border-border/80 shadow-xs' : 'border-transparent'
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 overflow-hidden flex items-center justify-center bg-primary text-primary-foreground font-black text-lg tracking-widest">
              RJ
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-normal tracking-wide text-foreground group-hover:opacity-80 transition-opacity">
                RUMAH JAHIT
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-sans">
                Bespoke Studio
              </span>
            </div>
          </Link>

          {/* Desktop Editorial Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-6">
            {navigationMenuConfig?.items?.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="font-serif text-base xl:text-lg text-foreground/80 hover:text-foreground hover:underline underline-offset-8 transition-all py-1 whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="https://wa.me/6281122334455"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary text-primary-foreground font-serif text-base hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Icon icon="mdi:whatsapp" className="text-lg" />
            <span>Konsultasi</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground hover:bg-muted/30 transition-colors"
            aria-label="Toggle Menu"
          >
            <Icon icon={mobileMenuOpen ? 'mdi:close' : 'mdi:menu'} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-4 pb-6 px-4 space-y-4 border-t border-border/60 mt-4 animate-enter bg-background">
          <div className="flex flex-col space-y-3">
            {navigationMenuConfig?.items?.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-xl text-foreground py-2 border-b border-border/40"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <Link
            href="https://wa.me/6281122334455"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-primary text-primary-foreground font-serif text-center block transition-colors mt-4"
          >
            Konsultasi WhatsApp
          </Link>
        </div>
      )}
    </nav>
  );
}
