import Link from "next/link";
import { Icon } from "@iconify/react";
import { appConfig } from "@/configs/app.config";

export default function AppFooter() {
  return (
    <footer className="w-full bg-background border-t border-border/80 pt-16 pb-12 text-foreground">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-border/60 pb-12">
        {/* Brand & Philosophy */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground font-black text-lg flex items-center justify-center tracking-widest">
              RJ
            </div>
            <span className="font-serif text-xl tracking-wide font-normal">
              RUMAH JAHIT
            </span>
          </div>
          <p className="font-serif text-sm text-muted-foreground leading-relaxed">
            Rumah Jahit Bespoke Tailoring menghadirkan keindahan rancangan busana dengan standar ketepatan ukuran, kualitas bahan pilihan, dan sentuhan Quiet Luxury untuk setiap momen berharga Anda.
          </p>
        </div>

        {/* Boutique Address */}
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-normal tracking-wide text-foreground uppercase">
            Alamat Butik & Studio
          </h4>
          <p className="font-serif text-sm text-muted-foreground leading-relaxed">
            Jl. Senopati Dalam No. 88, Kebayoran Baru<br />
            Jakarta Selatan, 12190<br />
            Indonesia
          </p>
          <p className="font-serif text-xs text-muted-foreground pt-1">
            <strong>Jam Operasional:</strong><br />
            Senin - Sabtu: 10.00 - 19.00 WIB<br />
            Minggu & Hari Libur: Dengan Perjanjian
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-normal tracking-wide text-foreground uppercase">
            Navigasi Cepat
          </h4>
          <ul className="space-y-2 font-serif text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
                Beranda &amp; Lookbook
              </Link>
            </li>
            <li>
              <Link href="/tentang-kami" className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
                Tentang Kami &amp; Warisan
              </Link>
            </li>
            <li>
              <Link href="/layanan-dan-proses" className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
                Layanan &amp; Alur Kerja
              </Link>
            </li>
            <li>
              <Link href="/katalog" className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
                Katalog Koleksi Lengkap
              </Link>
            </li>
            <li>
              <Link href="/lokasi-dan-kontak" className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
                Lokasi &amp; Janji Temu
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-foreground hover:underline underline-offset-4 transition-colors">
                Pertanyaan Umum (FAQ)
              </Link>
            </li>
            <li className="pt-2 border-t border-border/40">
              <Link href="/login" className="text-xs uppercase tracking-wider text-muted-foreground/60 hover:text-foreground transition-colors">
                &bull; Panel Admin Studio
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-normal tracking-wide text-foreground uppercase">
            Kontak & Sosial Media
          </h4>
          <div className="space-y-2 font-serif text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Icon icon="mdi:phone-outline" className="text-lg text-foreground" />
              <span>+62 811-2233-4455</span>
            </p>
            <p className="flex items-center gap-2">
              <Icon icon="mdi:email-outline" className="text-lg text-foreground" />
              <span>studio@rumahjahit.com</span>
            </p>
          </div>
          <div className="flex items-center gap-4 pt-2">
            {Object.entries(appConfig.social_media).map(([key, value]) => (
              <Link
                key={key}
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border/80 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label={key}
              >
                <Icon icon={value.icon} className="text-xl" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-serif text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Rumah Jahit Bespoke Tailoring Studio. All Rights Reserved.</p>
        <p className="mt-2 sm:mt-0 uppercase tracking-widest font-sans text-[10px]">
          Crafted with Precision & Quiet Luxury
        </p>
      </div>
    </footer>
  );
}
