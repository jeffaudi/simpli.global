import type { Lang } from '@/i18n';
import { getLocaleContent, type LocaleContent } from '@/i18n';

export type MotivationContent = {
  intro: string;
  positioningQuote: string;
  notSimplifiedEnglish: string;
  time: string;
  complexity: string;
  neutrality: string;
  pronunciation: string;
  bridge: string;
  strategicHeading: string;
  strategicIntro: string;
  strategicGrammar: string;
  strategicLearning: string;
  strategicFamiliarity: string;
  scalabilityHeading: string;
  scalabilityIntro: string;
  scalabilityGrammar: string;
  scalabilityRules: string;
  scalabilityCommunity: string;
  scalabilityRisk?: string;
};

export const motivationContent: LocaleContent<MotivationContent> = {
  en: {
    intro: 'Simpli is a simple international language—why does it matter? Egalitarian access to communication matters. Today, the languages that open doors (English, Mandarin, Spanish) require years of study and often reflect historical power rather than fairness.',
    positioningQuote:
      'Simpli is a next-generation auxiliary language combining English vocabulary with Indonesian-style grammar to achieve maximum simplicity without sacrificing expressiveness.',
    notSimplifiedEnglish:
      'Simpli is not “simplified English.” Simpli does not aim to replace English. You can still learn English and enjoy English literature and books while using Simpli as an auxiliary bridge language.',
    time: 'Time: Learn the basics in weeks, not years.',
    complexity: 'Complexity: No conjugation, no gender, minimal grammar.',
    neutrality: 'Neutrality: This standard is for everyone to read and speak.',
    pronunciation: 'Pronunciation: Phonetic spelling helps non-native speakers be more easily understood by both native and non-native listeners.',
    bridge: 'A language that many people can learn quickly can serve as a bridge for work, travel, and cooperation, without requiring everyone to master a complex historical national language.',
    strategicHeading: 'Strategic positioning',
    strategicIntro: 'Where Simpli wins clearly:',
    strategicGrammar: 'Grammar simplicity: best in class.',
    strategicLearning: 'Learning speed: basics can be acquired quickly.',
    strategicFamiliarity: 'Potential global familiarity: English-rooted vocabulary supports recognition.',
    scalabilityHeading: 'Scalability notes',
    scalabilityIntro: 'Simpli has strong potential to become a real language if:',
    scalabilityGrammar: 'the grammar is complete, not only minimal,',
    scalabilityRules: 'the rules remain closed and stable,',
    scalabilityCommunity: 'the community can extend vocabulary coherently.',
    scalabilityRisk:
      'Key risk: if spelling diverges too far from English, Simpli loses a major advantage for adoption.',
  },
  fr: {
    intro: "Simpli est une langue internationale simple—pourquoi c'est important ? L'accès égalitaire à la communication compte. Aujourd'hui, les langues qui ouvrent des portes (anglais, mandarin, espagnol) exigent des années d'étude et reflètent souvent le pouvoir historique plutôt que l'équité.",
    positioningQuote:
      "Simpli est une langue auxiliaire de nouvelle generation qui combine un vocabulaire de type anglais et une grammaire de type indonesien pour atteindre une simplicite maximale sans sacrifier l'expressivite.",
    notSimplifiedEnglish:
      "Simpli n'est pas un « anglais simplifie ». Simpli ne vise pas a remplacer l'anglais. Vous pouvez continuer d'apprendre l'anglais et profiter de la litterature et des livres en anglais, tout en utilisant Simpli comme langue auxiliaire de pont.",
    time: 'Temps : Apprendre les bases en semaines, pas en années.',
    complexity: 'Complexité : Pas de conjugaison, pas de genre, grammaire minimale.',
    neutrality: 'Neutralité : Cette norme est faite pour que chacun puisse lire et parler.',
    pronunciation: 'Prononciation : L’orthographe phonétique aide les non-natifs à être mieux compris par les natifs comme par les autres locuteurs.',
    bridge: "Une langue que beaucoup peuvent apprendre rapidement peut servir de pont pour le travail, les voyages et la coopération, sans exiger que chacun maîtrise une langue nationale complexe et historique.",
    strategicHeading: 'Positionnement strategique',
    strategicIntro: 'Les points ou Simpli se distingue clairement :',
    strategicGrammar: 'Simplicite grammaticale : meilleur niveau de sa categorie.',
    strategicLearning: "Vitesse d'apprentissage : les bases peuvent etre acquises rapidement.",
    strategicFamiliarity: 'Familiarite globale potentielle : un vocabulaire a racines anglaises favorise la reconnaissance.',
    scalabilityHeading: 'Notes sur la scalabilite',
    scalabilityIntro: 'Simpli a un fort potentiel pour devenir une vraie langue si :',
    scalabilityGrammar: 'la grammaire est complete, pas seulement minimale,',
    scalabilityRules: 'les regles restent fermees et stables,',
    scalabilityCommunity: 'la communaute peut etendre le vocabulaire de maniere coherente.',
    scalabilityRisk:
      "Risque cle : si l'orthographe s'eloigne trop de l'anglais, Simpli perd un avantage majeur pour l'adoption.",
  },
  es: {
    intro: 'Simpli es una lengua internacional simple—¿por qué importa? El acceso igualitario a la comunicación importa. Hoy, las lenguas que abren puertas (inglés, mandarín, español) exigen años de estudio y a menudo reflejan el poder histórico más que la equidad.',
    positioningQuote:
      'Simpli es una lengua auxiliar de nueva generación que combina vocabulario de tipo inglés y gramática de tipo indonesio para lograr la máxima simplicidad sin sacrificar la expresividad.',
    notSimplifiedEnglish:
      'Simpli no es un «inglés simplificado». Simpli no pretende reemplazar el inglés. Puedes seguir aprendiendo inglés y disfrutar de la literatura y los libros en inglés mientras usas Simpli como lengua auxiliar puente.',
    time: 'Tiempo: Aprender lo básico en semanas, no en años.',
    complexity: 'Complejidad: Sin conjugación, sin género, gramática mínima.',
    neutrality: 'Neutralidad: Este estándar es para que todos puedan leer y hablar.',
    pronunciation: 'Pronunciación: La ortografía fonética ayuda a los no nativos a ser comprendidos con más facilidad por hablantes nativos y no nativos.',
    bridge: 'Una lengua que muchos puedan aprender rápido puede servir de puente para el trabajo, los viajes y la cooperación, sin exigir que todos dominen una lengua nacional compleja e histórica.',
    strategicHeading: 'Posicionamiento estratégico',
    strategicIntro: 'Donde Simpli destaca claramente:',
    strategicGrammar: 'Simplicidad gramatical: la mejor de su categoría.',
    strategicLearning: 'Velocidad de aprendizaje: lo básico se puede adquirir rápidamente.',
    strategicFamiliarity: 'Familiaridad global potencial: el vocabulario de raíces inglesas favorece el reconocimiento.',
    scalabilityHeading: 'Notas sobre escalabilidad',
    scalabilityIntro: 'Simpli tiene un gran potencial para convertirse en una lengua real si:',
    scalabilityGrammar: 'la gramática está completa, no solo es mínima,',
    scalabilityRules: 'las reglas permanecen cerradas y estables,',
    scalabilityCommunity: 'la comunidad puede ampliar el vocabulario de forma coherente.',
    scalabilityRisk:
      'Riesgo clave: si la ortografía se aleja demasiado del inglés, Simpli pierde una ventaja importante para su adopción.',
  },
};

export function getMotivationContent(lang: Lang): MotivationContent {
  return getLocaleContent(motivationContent, lang);
}
