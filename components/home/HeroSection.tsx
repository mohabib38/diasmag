import {Link} from '@/i18n/routing';

type HeroSectionProps = {
  title: string;
  subtitle: string;
  description: string;
  ctaStart: string;
  ctaSignup: string;
  slogans: string[];
};

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaStart,
  ctaSignup,
  slogans
}: HeroSectionProps) {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.22),_transparent_30%),linear-gradient(135deg,_#ecfdf5,_#ffffff_50%,_#fffbeb)]">
      <div className="diasmag-container grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-emerald/20 bg-white/80 px-4 py-2 text-sm font-medium text-emerald shadow-sm">
            Maghreb • Europe • Diaspora
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-dark sm:text-5xl lg:text-6xl">
              {title} <span className="text-emerald">{subtitle}</span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/envoyer-argent" className="diasmag-button-primary">
              {ctaStart}
            </Link>
            <button className="diasmag-button-secondary">{ctaSignup}</button>
          </div>
        </div>

        <div className="diasmag-card relative overflow-hidden border-0 bg-dark p-8 text-white shadow-xl shadow-emerald/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.4),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.35),_transparent_30%)]" />
          <div className="relative space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Slogans</p>
            <div className="space-y-4 text-lg font-semibold">
              {slogans.map((slogan) => (
                <div key={slogan} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  {slogan}
                </div>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {label: 'Services', value: '7+'},
                {label: 'Guides', value: '40+'},
                {label: 'Communautés', value: '3 langues'}
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/10 p-4 text-center">
                  <p className="text-2xl font-black text-gold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
