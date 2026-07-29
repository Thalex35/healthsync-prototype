import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MDS Lab Haïti" },
      {
        name: "description",
        content:
          "Contactez MDS Lab à Delmas 31, Port-au-Prince : téléphone, email, horaires et formulaire de demande.",
      },
      { property: "og:title", content: "Contact — MDS Lab Haïti" },
      {
        property: "og:description",
        content: "Téléphone, email, adresse et formulaire de contact du laboratoire MDS Lab.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section className="border-b border-border bg-soft-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Nous sommes à votre écoute</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Une question sur une analyse, un résultat ou une prise en charge ? Notre équipe répond
            7 jours sur 7.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card className="border-border/70 shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-bold">Envoyer un message</h2>
            {sent ? (
              <div className="mt-6 rounded-2xl border border-success/40 bg-success/10 p-6">
                <p className="font-semibold text-success">Message envoyé</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Merci ! Nous vous répondons généralement sous 2 heures ouvrées.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setSent(false)}>
                  Écrire un autre message
                </Button>
              </div>
            ) : (
              <form
                className="mt-6 grid gap-5 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  toast.success("Message envoyé (démonstration)");
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="c-name">Nom complet</Label>
                  <Input id="c-name" required placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-phone">Téléphone</Label>
                  <Input id="c-phone" required placeholder="+509 …" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" type="email" placeholder="vous@exemple.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="c-msg">Votre message</Label>
                  <Textarea id="c-msg" rows={5} required placeholder="Comment pouvons-nous vous aider ?" />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" /> Envoyer
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {[
            { icon: MapPin, t: "Adresse", d: "Delmas 31, Rue Mercier, Port-au-Prince, Haïti" },
            { icon: Phone, t: "Téléphone", d: "+509 3700 0000 · +509 2800 1111" },
            { icon: Mail, t: "Email", d: "contact@mdslabhaiti.com" },
            { icon: Clock, t: "Horaires", d: "Lun–Ven 6h30–18h · Sam–Dim 7h–15h · Urgences 24h/24" },
          ].map((c) => (
            <Card key={c.t} className="border-border/70">
              <CardContent className="flex gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{c.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-0 bg-hero-gradient text-primary-foreground">
            <CardContent className="p-5">
              <MessageSquare className="h-6 w-6" />
              <p className="mt-3 font-semibold">Besoin d'une réponse immédiate ?</p>
              <p className="mt-1 text-sm opacity-90">
                Ouvrez l'assistant en bas à droite : horaires, préparation, résultats.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
