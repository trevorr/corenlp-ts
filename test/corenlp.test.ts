import { expect } from 'chai';
import { AnnotatedSentence, AnnotationResponse, CoreNLP, Dependency, DependencyKind } from '../src';

describe('corenlp', async function () {
  this.timeout(30000);
  it('uses constructor props', async function () {
    const nlp = new CoreNLP('http://localhost:9000', { annotators: ['tokenize'] });
    const res = await nlp.annotate('I am me');
    expect(res).instanceOf(AnnotationResponse);
    expect(res.sentences).to.have.length(1);
    expect(res.sentences[0].tokens.map((t) => t.word).join()).to.eql('I,am,me');
  });
  it('uses annotate props', async function () {
    const nlp = new CoreNLP('http://localhost:9000');
    const res = await nlp.annotate('She flew to Bali or to Turkey', { annotators: ['depparse'] });
    expect(res.sentences).to.have.length(1);
    expect(res.sentences[0].enhancedPlusPlusDependencies).to.have.length(9);
  });
  it('builds a dependency graph', async function () {
    const nlp = new CoreNLP('http://localhost:9000', { annotators: ['depparse'] });
    const res = await nlp.annotate('She flew to Bali or to Turkey');
    const graph = res.sentences[0].toDependencyGraph();
    expect(graph.token.word).to.equal('flew');
  });
  it('requires dependencies for dependency graph', function () {
    expect(() => new AnnotatedSentence({ index: 0, tokens: [] }).toDependencyGraph(DependencyKind.Basic)).to.throw(
      Error
    );
  });
  it('checks for missing root token', function () {
    expect(() =>
      new AnnotatedSentence({ index: 0, tokens: [], enhancedPlusPlusDependencies: [] }).toDependencyGraph()
    ).to.throw(Error);
  });
  it('checks for multiple root tokens', function () {
    const rootDep: Dependency = { dep: 'ROOT', governor: 0, governorGloss: 'ROOT', dependent: 1, dependentGloss: 'x' };
    expect(() =>
      new AnnotatedSentence({
        index: 0,
        tokens: [],
        enhancedPlusPlusDependencies: [rootDep, rootDep],
      }).toDependencyGraph()
    ).to.throw(Error);
  });
});
