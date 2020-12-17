import { expect } from 'chai';
import { AnnotatedSentence, Dependency, DependencyKind } from '../src';

describe('dependencyGraph', async function () {
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
