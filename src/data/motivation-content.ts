import type { Lang } from '@/i18n';

export const motivationContent: Record<Lang, { intro: string; time: string; complexity: string; neutrality: string; bridge: string }> = {
  en: {
    intro: 'Why do we need a simple international language? Because egalitarian access to communication matters. Today, the languages that open doors (English, Mandarin, Spanish) require years of study and often reflect historical power rather than fairness.',
    time: 'Time: Learn the basics in weeks, not years.',
    complexity: 'Complexity: No conjugation, no gender, minimal grammar.',
    neutrality: 'Neutrality: No single nation or culture owns the standard.',
    bridge: 'A language that many people can learn quickly can serve as a bridge for work, travel, and cooperation, without requiring everyone to master a dominant national language.',
  },
  fr: {
    intro: "Pourquoi une langue internationale simple ? Parce que l'accès égalitaire à la communication compte. Aujourd'hui, les langues qui ouvrent des portes (anglais, mandarin, espagnol) exigent des années d'étude et reflètent souvent le pouvoir historique plutôt que l'équité.",
    time: 'Temps : Apprendre les bases en semaines, pas en années.',
    complexity: 'Complexité : Pas de conjugaison, pas de genre, grammaire minimale.',
    neutrality: 'Neutralité : Aucune nation ou culture ne possède la norme.',
    bridge: "Une langue que beaucoup peuvent apprendre rapidement peut servir de pont pour le travail, les voyages et la coopération, sans exiger que chacun maîtrise une langue nationale dominante.",
  },
  es: {
    intro: '¿Por qué una lengua internacional simple? Porque el acceso igualitario a la comunicación importa. Hoy, las lenguas que abren puertas (inglés, mandarín, español) exigen años de estudio y a menudo reflejan el poder histórico más que la equidad.',
    time: 'Tiempo: Aprender lo básico en semanas, no en años.',
    complexity: 'Complejidad: Sin conjugación, sin género, gramática mínima.',
    neutrality: 'Neutralidad: Ningún país o cultura posee el estándar.',
    bridge: 'Una lengua que muchos puedan aprender rápido puede servir de puente para el trabajo, los viajes y la cooperación, sin exigir que todos dominen una lengua nacional dominante.',
  },
};
