import { Link } from "@tanstack/react-router";
import { Activity, Clock, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-hero-gradient text-primary-foreground">
              <Activity className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">MDS Lab</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Laboratoire d'analyses médicales et centre de soins, ouvert 7 jours sur 7 pour vous
            accompagner avec des technologies de pointe.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/rendez-vous" className="hover:text-foreground">Prendre rendez-vous</Link></li>
            <li><Link to="/suivi" className="hover:text-foreground">Résultats en ligne</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Delmas 31, Port-au-Prince, Haïti</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> +509 3700 0000</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> contact@mdslabhaiti.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Horaires</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Lun – Ven : 6h30 – 18h00</li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Sam – Dim : 7h00 – 15h00</li>
            <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Urgences : 24h/24</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        Prototype de démonstration — © {new Date().getFullYear()} MDS Lab Haïti. Les données affichées
        sont fictives.
      </div>
    </footer>
  );
}
