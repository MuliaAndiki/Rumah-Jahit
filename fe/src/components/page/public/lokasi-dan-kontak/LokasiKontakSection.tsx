import { Icon } from "@iconify/react";
import Link from "next/link";
import * as React from "react";

const LokasiKontakSection: React.FC = () => {
  const mapUrl = "https://www.google.com/maps/@4.6384208,96.8452741,144m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D";
  const embedMapUrl = "https://maps.google.com/maps?q=4.6384208,96.8452741&hl=id&z=17&output=embed";

  return (
    <div className="w-full bg-background text-foreground overflow-hidden pt-20">
      {/* Header */}
      <section className="relative py-24 px-6 border-b border-border/80 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10" />
        <div className="relative max-w-4xl mx-auto space-y-6 z-10">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Atelier Location &amp; Appointments
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-foreground leading-tight">
            Lokasi Studio &amp; <br />
            <span className="italic text-muted-foreground">Janji Temu Fitting</span>
          </h1>
          <p className="font-serif text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Untuk menjaga kenyamanan dan kualitas pelayanan personal, sesi pengukuran dan fitting di studio kami diutamakan melalui janji temu (by appointment).
          </p>
        </div>
      </section>

      {/* Section 1: Informasi Alamat & Peta Interaktif */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-border/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground block">
                Atelier Address
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground leading-tight">
                Rumah Jahit Khusus Wanita Studio
              </h2>
              <div className="font-serif text-lg text-muted-foreground leading-relaxed space-y-2">
                <p className="font-bold text-foreground">Takengon, Aceh Tengah</p>
                <p>Nanggroe Aceh Darussalam, Indonesia</p>
                <p className="font-mono text-sm pt-1 text-primary flex items-center gap-2">
                  <Icon icon="mdi:phone" className="text-base shrink-0" />
                  <span>+62 852-9498-8446</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/60">
              <h3 className="font-serif text-base font-semibold uppercase tracking-wider text-foreground">
                Fasilitas Studio &amp; Fitting:
              </h3>
              <ul className="space-y-2.5 font-serif text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Icon icon="mdi:car-parking" className="text-xl text-foreground shrink-0" />
                  <span>Area Parkir Luas &amp; Nyaman untuk Tamu</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="mdi:coffee-outline" className="text-xl text-foreground shrink-0" />
                  <span>Ruang Konsultasi Santai &amp; Kopi Khas Gayo</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="mdi:ruler-square" className="text-xl text-foreground shrink-0" />
                  <span>Private Fitting Room dengan Pencahayaan Optimal</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-serif text-base hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Icon icon="mdi:google-maps" className="text-xl" />
                <span>Buka di Google Maps</span>
              </Link>
            </div>
          </div>

          {/* Interactive Map Embed Box */}
          <div className="lg:col-span-7">
            <div className="aspect-16/10 w-full bg-muted border border-border/80 overflow-hidden relative rounded-2xl shadow-lg group">
              <iframe
                title="Rumah Jahit Khusus Wanita Studio Map"
                src={embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute bottom-4 right-4 z-10">
                <Link
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-background/90 backdrop-blur-md border border-border/80 text-foreground font-serif text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 shadow-md rounded-xl font-bold"
                >
                  <Icon icon="mdi:navigation-variant" className="text-base" />
                  <span>Petunjuk Arah &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Jam Operasional & Jadwal Kunjungan */}
      <section className="py-24 px-6 bg-muted/20 border-b border-border/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Opening Hours
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              Jam Operasional &amp; <br /> Jadwal Kunjungan
            </h2>
            <p className="font-serif text-base sm:text-lg text-muted-foreground leading-relaxed">
              Sesi pengukuran pertama biasanya memakan waktu 45-60 menit. Kami menyarankan Anda melakukan reservasi minimal 1-2 hari sebelumnya agar Master Cutter dapat meluangkan waktu khusus untuk diskusi mendalam dengan Anda.
            </p>
          </div>

          <div className="lg:col-span-6 border border-border/80 bg-background p-8 sm:p-10 space-y-6 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-4 font-serif text-lg">
              <span className="text-foreground font-normal">Senin &ndash; Sabtu</span>
              <span className="font-mono font-semibold text-foreground">09:00 &ndash; 18:00 WIB</span>
            </div>

            <div className="flex items-center justify-between font-serif text-lg text-amber-600 dark:text-amber-400">
              <span className="font-normal">Minggu &amp; Hari Libur Nasional</span>
              <span className="font-sans text-xs uppercase tracking-widest border border-amber-600/40 px-3 py-1 rounded-md font-semibold">
                By Appointment Only
              </span>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center gap-3 text-muted-foreground font-serif text-xs italic">
              <Icon icon="mdi:information-outline" className="text-base text-primary shrink-0" />
              <span>*Untuk konsultasi atau janji temu mendesak di luar jam kerja, silakan hubungi tim kami via WhatsApp.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Jalur Komunikasi Langsung */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Direct Communication
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl sm:text-5xl font-normal text-foreground">
            Jalur Komunikasi Langsung
          </h2>
          <p className="font-serif text-base text-muted-foreground leading-relaxed">
            Pilih saluran komunikasi yang paling nyaman bagi Anda untuk terhubung langsung dengan tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            href="https://wa.me/6285294988446"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-border/80 rounded-2xl bg-card space-y-4 hover:border-primary/80 hover:shadow-lg transition-all group block text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              <Icon icon="mdi:whatsapp" />
            </div>
            <h3 className="font-serif text-xl font-normal text-foreground">WhatsApp Studio</h3>
            <p className="font-mono text-base font-bold text-foreground">+62 852-9498-8446</p>
            <span className="inline-block text-xs font-sans font-bold uppercase tracking-widest text-primary group-hover:underline pt-2">
              Chat Langsung &rarr;
            </span>
          </Link>

          <Link
            href="tel:+6285294988446"
            className="p-8 border border-border/80 rounded-2xl bg-card space-y-4 hover:border-primary/80 hover:shadow-lg transition-all group block text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              <Icon icon="mdi:phone-outline" />
            </div>
            <h3 className="font-serif text-xl font-normal text-foreground">Direct Telepon</h3>
            <p className="font-mono text-base font-bold text-foreground">+62 852-9498-8446</p>
            <span className="inline-block text-xs font-sans font-bold uppercase tracking-widest text-primary group-hover:underline pt-2">
              Hubungi Sekarang &rarr;
            </span>
          </Link>

          <Link
            href="https://instagram.com/rumahjahit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-border/80 rounded-2xl bg-card space-y-4 hover:border-primary/80 hover:shadow-lg transition-all group block text-center sm:col-span-2 lg:col-span-1"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-pink-500/10 text-pink-600 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              <Icon icon="mdi:instagram" />
            </div>
            <h3 className="font-serif text-xl font-normal text-foreground">Instagram Lookbook</h3>
            <p className="font-mono text-base font-bold text-foreground">@rumahjahit</p>
            <span className="inline-block text-xs font-sans font-bold uppercase tracking-widest text-primary group-hover:underline pt-2">
              Lihat Portofolio &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LokasiKontakSection;
