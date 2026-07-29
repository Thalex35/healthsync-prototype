import { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { from: "bot" | "user"; text: string };

const quickAnswers: { q: string; a: string }[] = [
  {
    q: "Comment obtenir mes résultats ?",
    a: "Vos résultats sont disponibles dans l'espace patient, rubrique « Suivi ». Vous recevez un SMS dès qu'ils sont prêts (24 à 48h selon l'analyse).",
  },
  {
    q: "Faut-il être à jeun ?",
    a: "Pour un bilan lipidique ou une glycémie à jeun, prévoyez 8 à 12 heures sans manger. L'eau reste autorisée.",
  },
  {
    q: "Quels sont vos horaires ?",
    a: "Nous sommes ouverts 7j/7 : 6h30–18h en semaine, 7h–15h le week-end. Les urgences sont prises en charge 24h/24.",
  },
  {
    q: "Puis-je annuler un rendez-vous ?",
    a: "Oui, depuis l'espace patient ou par téléphone jusqu'à 2 heures avant l'heure prévue, sans frais.",
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Bonjour 👋 Je suis l'assistant MDS Lab. Comment puis-je vous aider ?" },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const match = quickAnswers.find((item) => item.q === text);
    setMessages((m) => [
      ...m,
      { from: "user", text },
      {
        from: "bot",
        text:
          match?.a ??
          "Merci ! Un membre de notre équipe vous répondra sous peu. Pour une réponse immédiate, appelez le +509 3700 0000.",
      },
    ]);
    setInput("");
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {open && (
          <div className="w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
            <div className="flex items-center justify-between bg-hero-gradient px-4 py-3 text-primary-foreground">
              <div>
                <p className="text-sm font-semibold">Assistance MDS Lab</p>
                <p className="text-xs opacity-90">Réponse moyenne : 2 min</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer le chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "flex justify-end" : "flex"}>
                  <p
                    className={
                      m.from === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground"
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-1">
                {quickAnswers.map((item) => (
                  <button
                    key={item.q}
                    onClick={() => send(item.q)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="flex items-center gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message…"
                className="h-9"
              />
              <Button type="submit" size="icon" className="h-9 w-9 shrink-0" aria-label="Envoyer">
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <a
              href="tel:+50937000000"
              className="flex items-center justify-center gap-2 border-t border-border bg-muted/60 py-2.5 text-xs font-semibold text-primary"
            >
              <Phone className="h-3.5 w-3.5" /> Appeler le laboratoire
            </a>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-14 w-14 place-items-center rounded-full bg-hero-gradient text-primary-foreground shadow-lift transition-transform hover:scale-105"
          aria-label="Ouvrir l'assistance"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
