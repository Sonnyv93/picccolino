import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-cream/10 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="glass-text font-display text-3xl">
              Piccolino <span className="glass-text-olive italic">Italian Kitchen</span>
            </p>
            <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.28em] text-brass">
              Serving the shore 35+ years
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              {site.address.street}, {site.address.city}, {site.address.state}{" "}
              {site.address.zip}
            </p>
            <a href={site.phoneHref} className="mt-2 inline-block text-sm text-stone transition-colors hover:text-cream">
              {site.phone}
            </a>
            <div className="mt-6">
              <a
                href={site.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brass px-6 py-3 font-sans text-xs uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-cream"
              >
                Order Online
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Hours</p>
            {site.hours.map((h) => (
              <p key={h.days + h.label} className="text-sm text-stone">
                {h.label}: {h.days}, {h.time}
              </p>
            ))}
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brass">
              Reservations by phone from {site.reservations.callFrom} daily.
            </p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-stone">
              {site.reservations.lunch}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Follow</p>
            <div className="flex flex-col gap-2">
              {site.socials
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-stone transition-colors hover:text-brass"
                  >
                    {s.name}
                  </a>
                ))}
            </div>

            <p className="eyebrow mb-4 mt-8">Also on</p>
            <div className="flex flex-col gap-2">
              {site.delivery.map((d) => (
                <a
                  key={d.name}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone transition-colors hover:text-brass"
                >
                  {d.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-stone/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="italic">Fatto con amore al mare.</p>
        </div>
      </div>
    </footer>
  );
}
