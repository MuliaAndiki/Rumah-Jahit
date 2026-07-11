import React from 'react';
import { Home, BookOpen, History, User } from 'lucide-react';

interface AppConfig {
  name: string;
  description: string;
  logo: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    image: string;
  };
  social_media: {
    twitter: {
      url: string;
      icon: string;
    };
    instagram: {
      url: string;
      icon: string;
    };
    linkedin: {
      url: string;
      icon: string;
    };
    youtube: {
      url: string;
      icon: string;
    };
    tiktok: {
      url: string;
      icon: string;
    };
  };
}

export type PropsParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  id: Promise<string>;
};

export const appConfig: AppConfig = {
  name: 'Rumah Jahit Bespoke Tailoring',
  description: 'Pinnacle of Contemporary Quiet Luxury Tailoring & Bespoke Lookbook',
  logo: '/images/logo.png',
  metadata: {
    title: 'Rumah Jahit - Bespoke Tailoring Lookbook',
    description: 'Bespoke tailoring with contemporary Quiet Luxury design.',
    keywords: ['Bespoke Tailor', 'Rumah Jahit', 'Quiet Luxury', 'Kebaya', 'Jas Formal', 'Tailoring'],
    author: 'Rumah Jahit Studio',
    image: '/images/logo.png',
  },
  social_media: {
    twitter: {
      url: 'https://twitter.com/rumahjahit',
      icon: 'hugeicons:new-twitter-rectangle',
    },
    instagram: {
      url: 'https://instagram.com/rumahjahit',
      icon: 'basil:instagram-outline',
    },
    linkedin: {
      url: 'https://linkedin.com/company/rumahjahit',
      icon: 'tabler:brand-linkedin',
    },
    youtube: {
      url: 'https://youtube.com/@rumahjahit',
      icon: 'mingcute:youtube-line',
    },
    tiktok: {
      url: 'https://tiktok.com/@rumahjahit',
      icon: 'hugeicons:tiktok',
    },
  },
};

interface NavigationMenuConfig {
  items: {
    title: string;
    href: string;
    icon?: React.ReactNode;
    description?: string;
    children?: NavigationMenuConfig['items'];
  }[];
}

export const navigationMenuConfig: NavigationMenuConfig = {
  items: [
    {
      title: 'Beranda',
      href: '/',
      description: 'Halaman utama & filosofi bespoke tailoring',
    },
    {
      title: 'Tentang Kami',
      href: '/tentang-kami',
      description: 'Filosofi, warisan, dan standar kualitas atelier',
    },
    {
      title: 'Layanan & Proses',
      href: '/layanan-dan-proses',
      description: 'Spesialisasi layanan dan 4 langkah alur kerja bespoke',
    },
    {
      title: 'Katalog Koleksi',
      href: '/katalog',
      description: 'Grid lookbook portofolio jahitan lengkap',
    },
    {
      title: 'Lokasi & Janji Temu',
      href: '/lokasi-dan-kontak',
      description: 'Informasi alamat studio dan jam operasional fitting',
    },
    {
      title: 'FAQ',
      href: '/faq',
      description: 'Pertanyaan umum seputar layanan jahitan bespoke',
    },
  ],
};

export const SIDEBAR_MENU = [
  { name: 'Ringkasan', url: '/dashboard', icon: Home, subMenu: [] },
  { name: 'Kategori', url: '/categories', icon: BookOpen, subMenu: [] },
  { name: 'Katalog', url: '/catalog', icon: History, subMenu: [] },
];
