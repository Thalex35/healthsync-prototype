import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  HeartPulse,
  Home,
  Microscope,
  ScanLine,
  TestTube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & spécialités — MDS Lab Haïti" },
      {
        name: "description",
        content:
          "Biologie médicale, microbiologie, imagerie, cardiologie, prélèvement à domicile et santé au travail à Port-au-Prince.",
      },
      { property: "og:title", content: "Services & spécialités — MDS Lab Haïti" },
      {
        property: "og:description",
        content: "Découvrez nos analyses, délais et tarifs indicatifs, puis réservez en ligne.",
      },
    ],
  }),
  component: Services,
});

const icons: Record<string, typeof TestTube> = {
  TestTube,
  Microscope,
  ScanLine,
  HeartPulse,
  Home,
  Building2,
};

function Services() {
  return (
    <div>
      <section className="border-b border-border bg-soft-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Nos services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Un plateau technique complet, des délais maîtrisés
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Plus de 120 analyses réalisées sur place, avec des tarifs indicatifs transparents et une
            réservation en ligne pour chaque prestation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon] ?? TestTube;
            return (
              <Card key={s.slug} className="card-hover flex h-full flex-col border-border/70">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <Badge variant="secondary">{s.delay}</Badge>
                  </div>
                  <h2 className="mt-5 text-lg font-bold">{s.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="text-sm font-semibold">{s.price}</span>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/rendez-vous" search={{ service: s.slug }}>
                        Réserver
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
