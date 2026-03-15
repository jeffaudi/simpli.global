import type { Lang } from '@/i18n';

export const motivationContent: Record<Lang, { intro: string; time: string; complexity: string; neutrality: string; pronunciation: string; bridge: string }> = {
  en: {
    intro: 'Why do we need a simple international language? Because egalitarian access to communication matters. Today, the languages that open doors (English, Mandarin, Spanish) require years of study and often reflect historical power rather than fairness.',
    time: 'Time: Learn the basics in weeks, not years.',
    complexity: 'Complexity: No conjugation, no gender, minimal grammar.',
    neutrality: 'Neutrality: This standard is for everyone to read and speak.',
    pronunciation: 'Pronunciation: Phonetic spelling helps non-native speakers be more easily understood by both native and non-native listeners.',
    bridge: 'A language that many people can learn quickly can serve as a bridge for work, travel, and cooperation, without requiring everyone to master a complex historical national language.',
  },
  fr: {
    intro: "Pourquoi une langue internationale simple ? Parce que l'accès égalitaire à la communication compte. Aujourd'hui, les langues qui ouvrent des portes (anglais, mandarin, espagnol) exigent des années d'étude et reflètent souvent le pouvoir historique plutôt que l'équité.",
    time: 'Temps : Apprendre les bases en semaines, pas en années.',
    complexity: 'Complexité : Pas de conjugaison, pas de genre, grammaire minimale.',
    neutrality: 'Neutralité : Cette norme est faite pour que chacun puisse lire et parler.',
    pronunciation: 'Prononciation : L’orthographe phonétique aide les non-natifs à être mieux compris par les natifs comme par les autres locuteurs.',
    bridge: "Une langue que beaucoup peuvent apprendre rapidement peut servir de pont pour le travail, les voyages et la coopération, sans exiger que chacun maîtrise une langue nationale complexe et historique.",
  },
  es: {
    intro: '¿Por qué una lengua internacional simple? Porque el acceso igualitario a la comunicación importa. Hoy, las lenguas que abren puertas (inglés, mandarín, español) exigen años de estudio y a menudo reflejan el poder histórico más que la equidad.',
    time: 'Tiempo: Aprender lo básico en semanas, no en años.',
    complexity: 'Complejidad: Sin conjugación, sin género, gramática mínima.',
    neutrality: 'Neutralidad: Este estándar es para que todos puedan leer y hablar.',
    pronunciation: 'Pronunciación: La ortografía fonética ayuda a los no nativos a ser comprendidos con más facilidad por hablantes nativos y no nativos.',
    bridge: 'Una lengua que muchos puedan aprender rápido puede servir de puente para el trabajo, los viajes y la cooperación, sin exigir que todos dominen una lengua nacional compleja e histórica.',
  },
};
