import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/suivi", label: "Espace patient" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-hero-gradient text-primary-foreground">
            <Activity className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-extrabold">MDS Lab</span>
            <span className="block truncate text-xs text-muted-foreground">
              Laboratoire médical · Haïti
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href="tel:+50937000000"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-primary xl:inline-flex"
          >
            <Phone className="h-4 w-4" /> +509 3700 0000
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/rendez-vous" search={{ service: undefined }}>
              Prendre rendez-vous
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 py-3 lg:hidden"
        >
          <div className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link
                to="/rendez-vous"
                search={{ service: undefined }}
                onClick={() => setOpen(false)}
              >
                Prendre rendez-vous
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
