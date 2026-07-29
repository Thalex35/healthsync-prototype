import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, HeartHandshake, Microscope, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import teamImg from "@/assets/team.jpg";
import { specialists } from "@/data/site";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — MDS Lab Haïti" },
      {
        name: "description",
        content:
          "25 ans au service de la santé en Haïti : équipe de biologistes, radiologues et infirmières, démarche qualité et technologies modernes.",
      },
      { property: "og:title", content: "À propos — MDS Lab Haïti" },
      {
        property: "og:description",
        content: "Une équipe médicale expérimentée et un plateau technique moderne à Port-au-Prince.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="border-b border-border bg-soft-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">À propos</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Une pratique médicale parmi les plus anciennes et les plus respectées du pays
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Depuis 25 ans, MDS Lab accompagne les familles haïtiennes, les cliniques et les entreprises
            avec des analyses fiables, des délais courts et une relation humaine avant tout.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <img
          src={teamImg}
          alt="L'équipe médicale de MDS Lab dans le hall du laboratoire"
          loading="lazy"
          width={1400}
          height={1000}
          className="w-full rounded-3xl object-cover shadow-soft"
        />
        <div>
          <h2 className="text-3xl font-extrabold">Notre mission</h2>
          <p className="mt-4 text-muted-foreground">
            Rendre le diagnostic accessible, rapide et compréhensible. Chaque résultat est validé par un
            biologiste, expliqué simplement et disponible en ligne pour être partagé avec votre médecin
            traitant.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Target, t: "Précision", d: "Double contrôle qualité sur chaque série d'analyses." },
              { icon: HeartHandshake, t: "Proximité", d: "Un accueil bienveillant et un accompagnement personnalisé." },
              { icon: Microscope, t: "Technologie", d: "Automates modernes et traçabilité complète des échantillons." },
              { icon: Award, t: "Fiabilité", d: "Participation à des programmes de contrôle externe." },
            ].map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-card p-4">
                <v.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold">Notre équipe</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Des spécialistes disponibles sur rendez-vous, du lundi au dimanche.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialists.map((s) => (
              <Card key={s.id} className="card-hover border-border/70">
                <CardContent className="flex items-center gap-4 p-6">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-hero-gradient font-display text-lg font-bold text-primary-foreground">
                    {s.name.split(" ").slice(-2).map((p) => p[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{s.name}</p>
                    <p className="text-sm text-muted-foreground">{s.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button asChild className="mt-10">
            <Link to="/rendez-vous">Consulter un spécialiste</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
