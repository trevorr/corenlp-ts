export interface Dependency<DR = EnhancedDependencyRelation> {
  dep: DR;
  governor: number;
  governorGloss: string;
  dependent: number;
  dependentGloss: string;
}

// https://universaldependencies.org/u/dep/index.html
export type BasicDependencyRelation =
  | 'acl' // clausal modifier of noun (adjectival clause)
  | 'acl:relcl' // relative clause modifier
  | 'advcl' // adverbial clause modifier
  | 'advmod' // adverbial modifier
  | 'advmod:emph' // emphasizing word, intensifier
  | 'amod' // adjectival modifier
  | 'appos' // appositional modifier
  | 'aux' // auxiliary
  | 'aux:pass' // passive auxiliary
  | 'case' // case marking
  | 'cc' // coordinating conjunction
  | 'ccomp' // clausal complement
  | 'clf' // classifier
  | 'compound' // compound
  | 'compound:lvc' // light verb construction
  | 'compound:prt' // phrasal verb particle
  | 'compound:redup' // reduplicated compounds
  | 'compound:svc' // serial verb compounds
  | 'conj' // conjunct
  | 'cop' // copula
  | 'csubj' // clausal subject
  | 'csubj:pass' // clausal passive subject
  | 'dep' // unspecified dependency
  | 'det' // determiner
  | 'det:numgov' // pronominal quantifier governing the case of the noun
  | 'det:nummod' // pronominal quantifier agreeing in case with the noun
  | 'det:poss' // possessive determiner
  | 'discourse' // discourse element
  | 'dislocated' // dislocated elements
  | 'expl' // expletive
  | 'expl:impers' // impersonal expletive
  | 'expl:pass' // reflexive pronoun used in reflexive passive
  | 'expl:pv' // reflexive clitic with an inherently reflexive verb
  | 'fixed' // fixed multiword expression
  | 'flat' // flat multiword expression
  | 'flat:foreign' // foreign words
  | 'flat:name' // names
  | 'goeswith' // goes with
  | 'iobj' // indirect object
  | 'list' // list
  | 'mark' // marker
  | 'nmod' // nominal modifier
  | 'nmod:poss' // possessive nominal modifier
  | 'nmod:tmod' // temporal modifier
  | 'nsubj' // nominal subject
  | 'nsubj:pass' // passive nominal subject
  | 'nummod' // numeric modifier
  | 'nummod:gov' // numeric modifier governing the case of the noun
  | 'obj' // object
  | 'obl' // oblique nominal
  | 'obl:agent' // agent modifier
  | 'obl:arg' // oblique argument
  | 'obl:tmod' // temporal modifier
  | 'orphan' // orphan
  | 'parataxis' // parataxis
  | 'punct' // punctuation
  | 'reparandum' // overridden disfluency
  | 'ROOT' // root
  | 'vocative' // vocative
  | 'xcomp'; // open clausal complement

// https://nlp.stanford.edu/pubs/schuster2016enhanced.pdf
export type EnhancedDependencyRelation =
  | BasicDependencyRelation
  | 'det:qmod' // quantificational modifier determiner
  | 'nsubj:xsubj' // controlling subject
  | string; // arbitrary suffix for conjunctions ("conj:and"), modifiers ("nmod:in_front_of"), prepositions ("obl:to"), etc.

export enum DependencyKind {
  Basic = 'basic',
  Enhanced = 'enhanced',
  EnhancedPlusPlus = 'enhancedPlusPlus',
}
