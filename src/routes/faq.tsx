import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions fréquentes — MDS Lab Haïti" },
      {
        name: "description",
        content:
          "Jeûne, délais de résultats, assurances, prélèvement à domicile : les réponses aux questions les plus posées à MDS Lab.",
      },
      { property: "og:title", content: "Questions fréquentes — MDS Lab Haïti" },
      {
        property: "og:description",
        content: "Toutes les réponses sur la préparation, les délais et le suivi de vos analyses.",
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [query, setQuery] = useState("");
  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Questions fréquentes</h1>
      <p className="mt-4 text-muted-foreground">
        Recherchez une réponse, ou contactez-nous si votre question n'est pas traitée.
      </p>

      <div className="relative mt-8">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher : jeûne, résultats, assurance…"
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Aucun résultat pour « {query} ». Posez-nous directement la question.
        </p>
      ) : (
        <Accordion type="single" collapsible className="mt-8">
          {filtered.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div className="mt-12 rounded-3xl bg-surface p-8 text-center">
        <h2 className="text-xl font-bold">Vous ne trouvez pas votre réponse ?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Notre équipe vous répond 7j/7, par téléphone ou via le formulaire de contact.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/contact">Nous contacter</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/rendez-vous">Prendre rendez-vous</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
