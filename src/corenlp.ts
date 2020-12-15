import fetch from 'cross-fetch';
import { AnnotatedSentence, AnnotationResponse, isSentenceResponse, SentenceResponse, TokenResponse } from './response';

export type Annotator =
  | 'tokenize'
  | 'cleanxml'
  | 'docdate'
  | 'ssplit'
  | 'pos'
  | 'lemma'
  | 'ner'
  | 'entitymentions'
  | 'regexner'
  | 'tokensregex'
  | 'parse'
  | 'depparse'
  | 'coref'
  | 'dcoref'
  | 'relation'
  | 'natlog'
  | 'openie'
  | 'entitylink'
  | 'kbp'
  | 'quote'
  | 'quote.attribution'
  | 'sentiment'
  | 'truecase'
  | 'udfeats';

export interface CoreNLPProperties {
  annotators?: Annotator[];
}

interface CoreNLPRawProperties {
  annotators?: string;
  outputFormat?: 'json' | 'xml' | 'text' | 'serialized';
  serializer?: string;
}

export class CoreNLP {
  private readonly defaultRawProps: CoreNLPRawProperties;

  constructor(private readonly serverUrl: string, defaultProps?: CoreNLPProperties) {
    this.defaultRawProps = { outputFormat: 'json', ...this._cookProps(defaultProps) };
  }

  public async annotate(text: string, props?: CoreNLPProperties): Promise<AnnotationResponse> {
    const rawProps = props ? { ...this.defaultRawProps, ...this._cookProps(props) } : this.defaultRawProps;
    const response = await this._annotate(text, rawProps);
    const sentences = isSentenceResponse(response) ? response.sentences : [{ index: 0, tokens: response.tokens }];
    return new AnnotationResponse(sentences.map((s) => new AnnotatedSentence(s)));
  }

  private async _annotate(text: string, rawProps: CoreNLPRawProperties): Promise<SentenceResponse | TokenResponse> {
    const url = new URL(this.serverUrl);
    url.searchParams.append('properties', JSON.stringify(rawProps));
    const response = await fetch(url.toString(), { method: 'POST', body: text });
    return response.json();
  }

  private _cookProps(props?: CoreNLPProperties): CoreNLPRawProperties {
    const rawProps: CoreNLPRawProperties = {};
    if (props?.annotators) {
      rawProps.annotators = props.annotators.join();
    }
    return rawProps;
  }
}
