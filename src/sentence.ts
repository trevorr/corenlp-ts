import { BasicDependencyRelation, Dependency } from './dependency';
import { Token } from './token';

export type SentimentValue = '0' | '1' | '2' | '3' | '4';
export type Sentiment = 'Verynegative' | 'Negative' | 'Neutral' | 'Positive' | 'Verypositive';

export interface Sentence {
  index: number;
  tokens: Token[];

  basicDependencies?: Dependency<BasicDependencyRelation>[];
  enhancedDependencies?: Dependency[];
  enhancedPlusPlusDependencies?: Dependency[];

  parse?: string;
  binaryParse?: string;

  sentimentValue?: SentimentValue;
  sentiment?: Sentiment;
  sentimentDistribution?: number[];
  sentimentTree?: string;

  openie?: IERelation[];
}

export interface IERelation {
  subject: string;
  subjectSpan: number[];

  relation: string;
  relationSpan: number[];

  object: string;
  objectSpan: number[];
}
