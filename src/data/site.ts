export type Service = {
  slug: string;
  title: string;
  icon: string;
  description: string;
  points: string[];
  delay: string;
  price: string;
};

export const services: Service[] = [
  {
    slug: "biologie",
    title: "Biologie médicale",
    icon: "TestTube",
    description:
      "Analyses sanguines complètes réalisées sur automates de dernière génération, avec double contrôle qualité.",
    points: ["Hémogramme (NFS)", "Glycémie & HbA1c", "Bilan lipidique", "Fonction rénale et hépatique"],
    delay: "Résultats en 24h",
    price: "À partir de 1 500 HTG",
  },
  {
    slug: "microbiologie",
    title: "Microbiologie & parasitologie",
    icon: "Microscope",
    description:
      "Identification bactérienne, antibiogrammes et recherches parasitaires adaptées au contexte local.",
    points: ["Coproculture", "ECBU", "Antibiogramme", "Recherche de paludisme"],
    delay: "Résultats en 48–72h",
    price: "À partir de 2 000 HTG",
  },
  {
    slug: "imagerie",
    title: "Imagerie médicale",
    icon: "ScanLine",
    description:
      "Échographie et radiologie numérique interprétées par nos médecins radiologues partenaires.",
    points: ["Échographie abdominale", "Échographie obstétricale", "Radiologie numérique", "Doppler"],
    delay: "Compte rendu le jour même",
    price: "À partir de 3 500 HTG",
  },
  {
    slug: "cardiologie",
    title: "Cardiologie",
    icon: "HeartPulse",
    description:
      "Consultations spécialisées et explorations fonctionnelles pour la prévention du risque cardiovasculaire.",
    points: ["ECG de repos", "Holter tensionnel", "Bilan cardiovasculaire", "Suivi hypertension"],
    delay: "Sur rendez-vous",
    price: "À partir de 4 000 HTG",
  },
  {
    slug: "prelevement-domicile",
    title: "Prélèvement à domicile",
    icon: "Home",
    description:
      "Une infirmière se déplace chez vous, avec transport sécurisé des échantillons vers le laboratoire.",
    points: ["Créneaux 6h30–11h", "Personnes âgées & alitées", "Suivi de grossesse", "Entreprises"],
    delay: "Réservation 24h à l'avance",
    price: "Supplément 1 000 HTG",
  },
  {
    slug: "medecine-travail",
    title: "Santé au travail",
    icon: "Building2",
    description:
      "Bilans périodiques et campagnes de dépistage pour les entreprises, ONG et institutions.",
    points: ["Visites d'embauche", "Bilans périodiques", "Campagnes de dépistage", "Rapports agrégés"],
    delay: "Planification sur mesure",
    price: "Sur devis",
  },
];

export const specialists = [
  { id: "dr-jean", name: "Dr. Marlyne Jean", role: "Biologiste médicale", services: ["biologie", "microbiologie"] },
  { id: "dr-pierre", name: "Dr. Ronald Pierre", role: "Cardiologue", services: ["cardiologie"] },
  { id: "dr-louis", name: "Dr. Sandra Louis", role: "Radiologue", services: ["imagerie"] },
  { id: "inf-celestin", name: "Inf. Widlyne Célestin", role: "Infirmière préleveuse", services: ["prelevement-domicile", "biologie"] },
  { id: "dr-augustin", name: "Dr. Frantz Augustin", role: "Médecin du travail", services: ["medecine-travail"] },
];

export const timeSlots = [
  "06:45", "07:15", "07:45", "08:15", "09:00", "09:30",
  "10:15", "11:00", "13:30", "14:15", "15:00", "15:45",
];

export const faqs = [
  {
    q: "Dois-je être à jeun avant mes analyses ?",
    a: "Pour la glycémie, le bilan lipidique et certains dosages hormonaux, un jeûne de 8 à 12 heures est nécessaire. L'eau plate reste autorisée. Le récapitulatif de préparation vous est envoyé par SMS après la prise de rendez-vous.",
  },
  {
    q: "Combien de temps pour recevoir mes résultats ?",
    a: "La plupart des analyses de routine sont disponibles en 24 heures. Les cultures microbiologiques demandent 48 à 72 heures. Vous êtes notifié dès la validation par le biologiste.",
  },
  {
    q: "Puis-je consulter mes résultats en ligne ?",
    a: "Oui. L'espace patient regroupe vos résultats, vos rendez-vous et vos ordonnances. Vous pouvez télécharger un PDF signé électroniquement ou le partager directement avec votre médecin.",
  },
  {
    q: "Acceptez-vous les assurances santé ?",
    a: "Nous travaillons avec les principales assurances locales. Présentez votre carte à l'accueil ; la prise en charge est vérifiée avant le prélèvement.",
  },
  {
    q: "Proposez-vous le prélèvement à domicile ?",
    a: "Oui, du lundi au samedi entre 6h30 et 11h, dans la zone métropolitaine de Port-au-Prince. La réservation se fait 24 heures à l'avance.",
  },
  {
    q: "Comment annuler ou reporter un rendez-vous ?",
    a: "Depuis l'espace patient ou par téléphone, jusqu'à 2 heures avant l'horaire réservé. Aucun frais n'est appliqué.",
  },
];
