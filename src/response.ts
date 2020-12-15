import { BasicDependencyRelation, Dependency, DependencyKind } from './dependency';
import { DependencyGraph, sentenceToDependencyGraph } from './dependencyGraph';
import { IERelation, Sentence, Sentiment, SentimentValue } from './sentence';
import { Token } from './token';

export class AnnotationResponse {
  public readonly sentences: AnnotatedSentence[];

  public constructor(sentences: AnnotatedSentence[]) {
    this.sentences = sentences;
  }
}

export class AnnotatedSentence implements Readonly<Sentence> {
  public readonly index: number;
  public readonly tokens: Token[];

  public readonly basicDependencies?: Dependency<BasicDependencyRelation>[];
  public readonly enhancedDependencies?: Dependency[];
  public readonly enhancedPlusPlusDependencies?: Dependency[];

  public readonly parse?: string;
  public readonly binaryParse?: string;

  public readonly sentimentValue?: SentimentValue;
  public readonly sentiment?: Sentiment;
  public readonly sentimentDistribution?: number[];
  public readonly sentimentTree?: string;

  public readonly openie?: IERelation[];

  public constructor(sentence: Sentence) {
    this.index = sentence.index;
    this.tokens = sentence.tokens;
    Object.assign(this, sentence);
  }

  public toDependencyGraph(kind = DependencyKind.EnhancedPlusPlus): DependencyGraph {
    return sentenceToDependencyGraph(this, kind);
  }
}

export interface SentenceResponse {
  sentences: Sentence[];
}

export interface TokenResponse {
  tokens: Token[];
}

export function isSentenceResponse(response: SentenceResponse | TokenResponse): response is SentenceResponse {
  return 'sentences' in response;
}
