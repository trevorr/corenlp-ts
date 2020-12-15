export interface Token {
  index: number;
  word: string;
  originalText: string;
  lemma?: string; // if 'lemma' in pipeline
  characterOffsetBegin: number;
  characterOffsetEnd: number;
  pos?: PartOfSpeech; // if 'pos' in pipeline
  before: string;
  after: string;
}

// Mostly https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html
export type PartOfSpeech =
  | 'CC' // Coordinating conjunction (and, but, or)
  | 'CD' // Cardinal number
  | 'DT' // Determiner (a(n), the, every, no, either, neither)
  | 'EX' // Existential there
  | 'FW' // Foreign word
  | 'IN' // Preposition or subordinating conjunction
  | 'HYPH' // Hyphen
  | 'JJ' // Adjective (good)
  | 'JJR' // Adjective, comparative (better)
  | 'JJS' // Adjective, superlative (best)
  | 'LS' // List item marker
  | 'MD' // Modal
  | 'NN' // Noun, singular or mass
  | 'NNS' // Noun, plural
  | 'NNP' // Proper noun, singular
  | 'NNPS' // Proper noun, plural
  | 'PDT' // Predeterminer
  | 'POS' // Possessive ending
  | 'PRP' // Personal pronoun
  | 'PRP$' // Possessive pronoun
  | 'RB' // Adverb
  | 'RBR' // Adverb, comparative
  | 'RBS' // Adverb, superlative
  | 'RP' // Particle
  | 'SYM' // Symbol
  | 'TO' // to
  | 'UH' // Interjection
  | 'VB' // Verb, base form
  | 'VBD' // Verb, past tense
  | 'VBG' // Verb, gerund or present participle
  | 'VBN' // Verb, past participle
  | 'VBP' // Verb, non-3rd person singular present
  | 'VBZ' // Verb, 3rd person singular present
  | 'WDT' // Wh-determiner
  | 'WP' // Wh-pronoun
  | 'WP$' // Possessive wh-pronoun
  | 'WRB' // Wh-adverb
  | '-LRB-' // Contextual separator, left parenthesis: '(', '{', '['
  | '-RRB-' // Contextual separator, right parenthesis: ')', '}', ']'
  | '``' // Start quote
  | "''" // End quote
  | ',' // Punctuation mark, comma
  | '.' // Punctuation mark, sentence close: '.', '?', '!'
  | ':'; // Punctuation mark, (semi-)colon or dash: ':', ';', '--'
