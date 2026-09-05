import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  FileText,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Smartphone,
  Star,
  TestTube,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/site";
import heroImg from "@/assets/hero-lab.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MDS Lab Haïti — Analyses médicales & rendez-vous en ligne" },
      {
        name: "description",
        content:
          "Laboratoire d'analyses médicales à Port-au-Prince, ouvert 7j/7 : rendez-vous en ligne, résultats numériques et suivi patient sécurisé.",
      },
      {
        property: "og:title",
        content: "MDS Lab Haïti — Analyses médicales & rendez-vous en ligne",
      },
      {
        property: "og:description",
        content: "Rendez-vous en ligne, résultats numériques et suivi patient sécurisé, 7j/7.",
      },
    ],
  }),
  component: Index,
});

const icons: Record<string, typeof TestTube> = {
  TestTube,
  Microscope,
  ScanLine,
  HeartPulse,
  Home: CalendarCheck,
  Building2: ShieldCheck,
};

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="text-primary-foreground">
            <Badge className="border-0 bg-white/15 text-primary-foreground hover:bg-white/20">
              Ouvert 7 jours sur 7
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Votre santé, analysée avec précision.
            </h1>
            <p className="mt-5 max-w-xl text-base opacity-90 sm:text-lg">
              MDS Lab combine des technologies de laboratoire de pointe et une expérience patient
              entièrement numérique : rendez-vous en ligne, rappels automatiques et résultats
              accessibles en un clic.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/rendez-vous" search={{ service: undefined }}>
                  Prendre rendez-vous <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link to="/suivi">Accéder à mes résultats</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-6">
              {[
                { k: "25 ans", v: "d'expérience" },
                { k: "120+", v: "analyses proposées" },
                { k: "24h", v: "délai moyen" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-display text-2xl font-extrabold">{s.k}</dt>
                  <dd className="text-xs opacity-80">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImg}
              alt="Technicien de laboratoire MDS Lab utilisant un automate d'analyse"
              width={1600}
              height={1100}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-4 hidden w-64 rounded-2xl border border-border bg-card p-4 shadow-lift sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success/15 text-success">
                  <FileText className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Résultats disponibles</p>
                  <p className="text-xs text-muted-foreground">Bilan sanguin · aujourd'hui</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Des professionnels qualifiés",
              text: "Biologistes, radiologues et infirmières diplômés, encadrés par une démarche qualité stricte.",
            },
            {
              icon: Clock,
              title: "Ouvert 7j/7",
              text: "Des créneaux dès 6h30 et un service d'urgence disponible 24h/24 pour vos analyses prioritaires.",
            },
            {
              icon: Smartphone,
              title: "100 % numérique",
              text: "Rendez-vous, rappels SMS, résultats et partage avec votre médecin depuis votre téléphone.",
            },
          ].map((v) => (
            <Card key={v.title} className="card-hover border-border/70">
              <CardContent className="p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
                  <v.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-lg font-bold">{v.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Nos spécialités
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Un plateau technique complet
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/services">Voir tous les services</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => {
              const Icon = icons[s.icon] ?? TestTube;
              return (
                <Card key={s.slug} className="card-hover h-full border-border/70">
                  <CardContent className="flex h-full flex-col p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                      <Badge variant="secondary">{s.delay}</Badge>
                      <span className="text-muted-foreground">{s.price}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          Votre parcours en 4 étapes
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Une expérience pensée pour réduire l'attente et vous garder informé à chaque étape.
        </p>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            {
              t: "Réservez en ligne",
              d: "Choisissez votre analyse, votre spécialiste et votre créneau en 60 secondes.",
            },
            {
              t: "Préparez-vous",
              d: "Vous recevez les consignes (jeûne, documents) par SMS et email.",
            },
            {
              t: "Venez au laboratoire",
              d: "Votre dossier est déjà prêt : prélèvement rapide, sans file d'attente.",
            },
            {
              t: "Consultez vos résultats",
              d: "Notification dès validation, PDF signé et partage avec votre médecin.",
            },
          ].map((step, i) => (
            <li
              key={step.t}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-hero-gradient font-display text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold">{step.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Témoignages */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ils nous font confiance</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "Nadège S.",
                t: "Rendez-vous pris le soir, prélèvement le lendemain à 7h. Résultats reçus avant midi.",
              },
              {
                n: "Jean-Robert P.",
                t: "Le suivi en ligne me permet de comparer mes bilans d'une année à l'autre. Très clair.",
              },
              {
                n: "Clinique Bel-Air",
                t: "Nos patients sont orientés en quelques clics et nous recevons les comptes rendus directement.",
              },
            ].map((r) => (
              <Card key={r.n} className="border-border/70">
                <CardContent className="p-6">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">« {r.t} »</p>
                  <p className="mt-4 text-sm font-semibold">{r.n}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-8 rounded-3xl bg-hero-gradient p-8 text-primary-foreground sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <h2 className="text-3xl font-extrabold">Prêt à réserver votre analyse ?</h2>
            <p className="mt-3 max-w-xl opacity-90">
              Réservation en ligne 24h/24, confirmation immédiate et rappel automatique la veille.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/rendez-vous" search={{ service: undefined }}>
              Prendre rendez-vous <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
