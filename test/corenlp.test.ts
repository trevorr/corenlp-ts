import { expect } from 'chai';
import { AnnotationResponse, CoreNLP } from '../src';

const { CORENLP_URL = 'http://localhost:9000' } = process.env;

describe('CoreNLP', async function () {
  this.timeout(30000);
  it('uses constructor props', async function () {
    const nlp = new CoreNLP(CORENLP_URL, { annotators: ['tokenize'] });
    const res = await nlp.annotate('I am me');
    expect(res).instanceOf(AnnotationResponse);
    expect(res.sentences).to.have.length(1);
    expect(res.sentences[0].tokens.map((t) => t.word).join()).to.eql('I,am,me');
  });
  it('uses annotate props', async function () {
    const nlp = new CoreNLP(CORENLP_URL);
    const res = await nlp.annotate('She flew to Bali or to Turkey', { annotators: ['depparse'] });
    expect(res.sentences).to.have.length(1);
    expect(res.sentences[0].enhancedPlusPlusDependencies).to.have.length(9);
  });
  it('builds a dependency graph', async function () {
    const nlp = new CoreNLP(CORENLP_URL, { annotators: ['depparse'] });
    const res = await nlp.annotate('She flew to Bali or to Turkey');
    const graph = res.sentences[0].toDependencyGraph();
    expect(graph.token.word).to.equal('flew');
  });
});
