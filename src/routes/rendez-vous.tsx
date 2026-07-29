import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Info,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { services, specialists, timeSlots } from "@/data/site";

export const Route = createFileRoute("/rendez-vous")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Prendre rendez-vous en ligne — MDS Lab Haïti" },
      {
        name: "description",
        content:
          "Réservez votre analyse ou consultation en 4 étapes : service, spécialiste, créneau et confirmation immédiate.",
      },
      { property: "og:title", content: "Prendre rendez-vous en ligne — MDS Lab Haïti" },
      {
        property: "og:description",
        content: "Réservation 24h/24, confirmation immédiate et rappel automatique la veille.",
      },
    ],
  }),
  component: Booking,
});

const steps = ["Service", "Spécialiste", "Date & heure", "Vos informations"];

function nextDays(count: number) {
  const out: Date[] = [];
  const d = new Date();
  for (let i = 1; out.length < count; i++) {
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    out.push(day);
  }
  return out;
}

const fmtDay = new Intl.DateTimeFormat("fr-FR", { weekday: "short" });
const fmtDate = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" });
const fmtLong = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function Booking() {
  const { service: presetService } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | undefined>(presetService);
  const [specialist, setSpecialist] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    notes: "",
    fasting: false,
    home: false,
  });
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => nextDays(8), []);
  const availableSpecialists = specialists.filter((s) => !service || s.services.includes(service));
  const chosenService = services.find((s) => s.slug === service);
  const chosenSpecialist = specialists.find((s) => s.id === specialist);

  const canContinue =
    (step === 0 && !!service) ||
    (step === 1 && !!specialist) ||
    (step === 2 && !!date && !!time) ||
    (step === 3 && form.name.trim() !== "" && form.phone.trim() !== "" && form.reason.trim() !== "");

  const reference = useMemo(
    () => "MDS-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    [],
  );

  if (confirmed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Card className="border-border/70 text-center shadow-soft">
          <CardContent className="p-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold">Demande envoyée !</h1>
            <p className="mt-3 text-muted-foreground">
              Votre rendez-vous est pré-réservé. Vous recevrez une confirmation par SMS au{" "}
              <span className="font-medium text-foreground">{form.phone}</span> sous 15 minutes.
            </p>

            <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-muted/40 p-6 text-left text-sm">
              <Row label="Référence" value={reference} />
              <Row label="Service" value={chosenService?.title ?? "—"} />
              <Row label="Spécialiste" value={chosenSpecialist?.name ?? "—"} />
              <Row label="Date" value={date ? fmtLong.format(date) : "—"} />
              <Row label="Heure" value={time ?? "—"} />
              <Row label="Patient" value={form.name} />
              {form.fasting && <Row label="Préparation" value="Venir à jeun (8 à 12 heures)" />}
              {form.home && <Row label="Option" value="Prélèvement à domicile demandé" />}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setConfirmed(false);
                  setStep(0);
                }}
              >
                Nouvelle demande
              </Button>
              <Button onClick={() => toast.success("Rendez-vous ajouté à votre espace patient")}>
                Ajouter à mon espace patient
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Prototype de démonstration — aucune donnée n'est réellement enregistrée.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Prendre rendez-vous</h1>
      <p className="mt-3 text-muted-foreground">
        4 étapes, moins d'une minute. Confirmation immédiate et rappel automatique la veille.
      </p>

      {/* Stepper */}
      <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
              i === step
                ? "border-primary bg-primary/10 text-primary"
                : i < step
                  ? "border-success/40 bg-success/10 text-success"
                  : "border-border text-muted-foreground"
            }`}
          >
            <span className="font-semibold">{i + 1}.</span> {s}
          </li>
        ))}
      </ol>

      <Card className="mt-8 border-border/70 shadow-soft">
        <CardContent className="p-6 sm:p-8">
          {step === 0 && (
            <div>
              <SectionTitle icon={Stethoscope} title="Quel service souhaitez-vous ?" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => {
                      setService(s.slug);
                      setSpecialist(undefined);
                    }}
                    className={`rounded-2xl border p-4 text-left transition-colors ${
                      service === s.slug
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold">{s.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.delay} · {s.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <SectionTitle icon={UserRound} title="Choisissez votre spécialiste" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {availableSpecialists.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSpecialist(s.id)}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                      specialist === s.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-hero-gradient font-display font-bold text-primary-foreground">
                      {s.name.split(" ").slice(-2).map((p) => p[0]).join("")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{s.name}</span>
                      <span className="block text-sm text-muted-foreground">{s.role}</span>
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => setSpecialist("indifferent")}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    specialist === "indifferent"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">Peu importe</p>
                  <p className="mt-1 text-sm text-muted-foreground">Le premier praticien disponible</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <SectionTitle icon={CalendarDays} title="Sélectionnez une date" />
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {days.map((d) => {
                  const active = date?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setDate(d)}
                      className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                        active ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="block text-xs uppercase text-muted-foreground">
                        {fmtDay.format(d)}
                      </span>
                      <span className="mt-1 block text-sm font-semibold">{fmtDate.format(d)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <SectionTitle icon={Clock} title="Créneaux disponibles" />
                {!date ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Choisissez d'abord une date pour voir les horaires.
                  </p>
                ) : (
                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                    {timeSlots.map((t, i) => {
                      const taken = (date.getDate() + i) % 5 === 0;
                      return (
                        <button
                          key={t}
                          disabled={taken}
                          onClick={() => setTime(t)}
                          className={`rounded-xl border py-2.5 text-sm transition-colors ${
                            taken
                              ? "cursor-not-allowed border-dashed border-border text-muted-foreground/50 line-through"
                              : time === t
                                ? "border-primary bg-primary/10 font-semibold text-primary"
                                : "border-border hover:border-primary/50"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <SectionTitle icon={UserRound} title="Vos informations" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Nom complet *">
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex. Marie-Ange Joseph"
                  />
                </Field>
                <Field id="phone" label="Téléphone *">
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+509 …"
                  />
                </Field>
                <Field id="email" label="Email">
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="vous@exemple.com"
                  />
                </Field>
                <Field id="reason" label="Motif de consultation *">
                  <Input
                    id="reason"
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    placeholder="Ex. Contrôle de routine, fatigue…"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="notes" label="Informations utiles avant le rendez-vous">
                    <Textarea
                      id="notes"
                      rows={4}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Traitements en cours, allergies, ordonnance du médecin, antécédents…"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-border bg-muted/40 p-4">
                <label className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={form.fasting}
                    onCheckedChange={(v) => setForm({ ...form, fasting: v === true })}
                  />
                  <span>Je serai à jeun (requis pour glycémie et bilan lipidique)</span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={form.home}
                    onCheckedChange={(v) => setForm({ ...form, home: v === true })}
                  />
                  <span>Je souhaite un prélèvement à domicile (supplément 1 000 HTG)</span>
                </label>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-primary/5 p-4 text-sm text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Vos informations ne sont pas enregistrées : il s'agit d'une démonstration.
              </div>
            </div>
          )}

          {/* Récapitulatif */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {chosenService && <Badge variant="secondary">{chosenService.title}</Badge>}
            {chosenSpecialist && <Badge variant="secondary">{chosenSpecialist.name}</Badge>}
            {specialist === "indifferent" && <Badge variant="secondary">Praticien indifférent</Badge>}
            {date && <Badge variant="secondary">{fmtLong.format(date)}</Badge>}
            {time && <Badge variant="secondary">{time}</Badge>}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-6">
            <Button
              variant="ghost"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Button>
            {step < 3 ? (
              <Button disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
                Continuer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                disabled={!canContinue}
                onClick={() => {
                  setConfirmed(true);
                  toast.success("Demande de rendez-vous envoyée");
                }}
              >
                Confirmer la demande
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof Clock; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
