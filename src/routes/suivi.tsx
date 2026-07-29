import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  Download,
  FileText,
  FlaskConical,
  Lock,
  Share2,
  TrendingDown,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/suivi")({
  head: () => ({
    meta: [
      { title: "Espace patient & résultats — MDS Lab Haïti" },
      {
        name: "description",
        content:
          "Consultez vos résultats d'analyses, suivez vos rendez-vous et partagez vos comptes rendus avec votre médecin.",
      },
      { property: "og:title", content: "Espace patient & résultats — MDS Lab Haïti" },
      {
        property: "og:description",
        content: "Résultats en ligne, historique et suivi de vos demandes en un seul endroit.",
      },
    ],
  }),
  component: Suivi,
});

const results = [
  {
    name: "Hémogramme complet (NFS)",
    date: "12 juillet 2026",
    status: "Disponible",
    progress: 100,
    detail: "Tous les paramètres dans les valeurs de référence.",
  },
  {
    name: "Bilan lipidique",
    date: "12 juillet 2026",
    status: "Disponible",
    progress: 100,
    detail: "LDL légèrement au-dessus de la cible — contrôle conseillé dans 3 mois.",
  },
  {
    name: "Coproculture",
    date: "26 juillet 2026",
    status: "En cours d'analyse",
    progress: 60,
    detail: "Culture en incubation. Résultat attendu le 29 juillet.",
  },
  {
    name: "Glycémie à jeun",
    date: "26 juillet 2026",
    status: "Échantillon reçu",
    progress: 25,
    detail: "Prélèvement enregistré au laboratoire ce matin.",
  },
];

const appointments = [
  { t: "Prélèvement sanguin", d: "Mardi 4 août 2026 · 07:15", who: "Inf. Widlyne Célestin", state: "Confirmé" },
  { t: "Consultation cardiologie", d: "Jeudi 13 août 2026 · 15:00", who: "Dr. Ronald Pierre", state: "En attente" },
  { t: "Échographie abdominale", d: "Lundi 22 juin 2026 · 09:30", who: "Dr. Sandra Louis", state: "Terminé" },
];

function Suivi() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Espace patient</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Vos résultats, en un clic</h1>
          <p className="mt-5 text-muted-foreground">
            Suivez l'avancement de vos analyses en temps réel, retrouvez l'historique de vos bilans et
            partagez un compte rendu signé avec votre médecin traitant.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Notification SMS dès la validation d'un résultat",
              "Historique complet et comparaison entre bilans",
              "Téléchargement PDF et partage sécurisé",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-border/70 shadow-soft">
          <CardContent className="p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-xl font-bold">Connexion patient</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Démonstration : cliquez simplement sur « Se connecter ».
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoggedIn(true);
                toast.success("Bienvenue dans votre espace patient (démo)");
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="id">Numéro de dossier</Label>
                <Input id="id" defaultValue="MDS-48210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pw">Code d'accès</Label>
                <Input id="pw" type="password" defaultValue="demo1234" />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-hero-gradient font-display font-bold text-primary-foreground">
            MJ
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold sm:text-2xl">Marie-Ange Joseph</h1>
            <p className="text-sm text-muted-foreground">Dossier MDS-48210</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setLoggedIn(false)}>
          Se déconnecter
        </Button>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: FlaskConical, k: "2", v: "analyses en cours" },
          { icon: FileText, k: "14", v: "résultats disponibles" },
          { icon: CalendarClock, k: "2", v: "rendez-vous à venir" },
        ].map((s) => (
          <Card key={s.v} className="border-border/70">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold">{s.k}</p>
                <p className="text-xs text-muted-foreground">{s.v}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="resultats" className="mt-10">
        <TabsList>
          <TabsTrigger value="resultats">Résultats</TabsTrigger>
          <TabsTrigger value="rdv">Rendez-vous</TabsTrigger>
          <TabsTrigger value="tendances">Tendances</TabsTrigger>
        </TabsList>

        <TabsContent value="resultats" className="mt-6 space-y-4">
          {results.map((r) => (
            <Card key={r.name} className="border-border/70">
              <CardContent className="p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.name}</p>
                    <p className="text-sm text-muted-foreground">Prélèvement du {r.date}</p>
                  </div>
                  <Badge variant={r.progress === 100 ? "default" : "secondary"}>{r.status}</Badge>
                </div>
                <Progress value={r.progress} className="mt-4" />
                <p className="mt-3 text-sm text-muted-foreground">{r.detail}</p>
                {r.progress === 100 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.success("PDF téléchargé (démo)")}>
                      <Download className="mr-2 h-4 w-4" /> Télécharger
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.success("Lien de partage copié (démo)")}>
                      <Share2 className="mr-2 h-4 w-4" /> Partager avec mon médecin
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rdv" className="mt-6 space-y-4">
          {appointments.map((a) => (
            <Card key={a.t + a.d} className="border-border/70">
              <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{a.t}</p>
                  <p className="text-sm text-muted-foreground">{a.d}</p>
                  <p className="text-sm text-muted-foreground">{a.who}</p>
                </div>
                <Badge
                  variant={a.state === "Confirmé" ? "default" : a.state === "Terminé" ? "outline" : "secondary"}
                >
                  {a.state}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tendances" className="mt-6">
          <Card className="border-border/70">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <h2 className="font-bold">Évolution du cholestérol LDL (mg/dL)</h2>
              </div>
              <div className="mt-8 flex h-48 items-end gap-4">
                {[
                  { m: "Jan", v: 158 },
                  { m: "Mar", v: 149 },
                  { m: "Mai", v: 141 },
                  { m: "Juil", v: 133 },
                ].map((p) => (
                  <div key={p.m} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">{p.v}</span>
                    <div
                      className="w-full rounded-t-xl bg-hero-gradient"
                      style={{ height: `${(p.v / 170) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{p.m}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-success">
                <TrendingDown className="h-4 w-4" /> Baisse de 16 % sur 6 mois — continuez ainsi.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Prototype de démonstration — données fictives, aucune connexion à un dossier médical réel.
      </p>
    </div>
  );
}
