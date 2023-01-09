// PC Indicates PageContext

const concept2 = {
  id: "http://w3id.org/c2",
  prefLabel: {
    de: "Konzept 2",
    en: "Concept 2",
  },
  broader: [
    {
      id: "http://w3id.org/c1",
    },
  ],
  inScheme: "http://w3id.org/",
}

export const topConcept = {
  id: "http://w3id.org/c1",
  type: "Concept",
  hub: "https://test.skohub.io/hub",
  prefLabel: {
    de: "Konzept 1",
    en: "Concept 1",
  },
  altLabel: {
    de: ["Alt-Label-1", "Alt-Label-2"],
  },
  hiddenLabel: {
    de: ["Hidden-Label-1", "Hidden-Label-2"],
  },
  definition: {
    de: "Meine Definition",
  },
  example: {
    de: "Ein Beispiel",
  },
  scopeNote: {
    de: "Meine Scope Note",
  },
  note: {
    de: "Meine Note",
  },
  notation: ["1"],
  narrower: [concept2],
  related: [
    {
      id: "relatedId",
      prefLabel: {
        de: "Related Concept",
      },
    },
  ],
  narrowMatch: [{ id: "narrowMatchId" }],
  broadMatch: [{ id: "broadMatchId" }],
  exactMatch: [{ id: "exactMatchId" }],
  closeMatch: [{ id: "closeMatchId" }],
  relatedMatch: [{ id: "relatedMatchId" }],
  inScheme: {
    id: "http://w3id.org/",
    type: "ConceptScheme",
    title: {
      de: "Test Vokabular",
    },
  },
  topConceptOf: null,
}

export const ConceptPC = {
  node: topConcept,
  language: "de",
  collections: [
    {
      id: "my-id",
      prefLabel: { de: "Collection PrefLabel" },
    },
  ],
}

export const ConceptScheme = {
  id: "http://w3id.org/",
  type: "ConceptScheme",
  title: {
    de: "Test Vokabular",
    en: "Test Vocabulary",
  },
  hasTopConcept: [topConcept],
}

export const ConceptSchemePC = {
  node: ConceptScheme,
  language: "de",
}

export const collection = {
  id: "http://w3id.org/collection",
  type: "Collection",
  prefLabel: {
    de: "Test-Collection",
  },
  definition: null,
  member: [
    topConcept,
    {
      id: "http://w3id.org/member2",
      prefLabel: {
        de: "Test Mitglied 2",
      },
    },
  ],
}

export const CollectionPC = {
  node: collection,
  language: "de",
}
