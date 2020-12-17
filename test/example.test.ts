import { CoreNLP, DependencyGraph } from '..';

describe('example', async function () {
  it('works', async function () {
    // import { CoreNLP, DependencyGraph } from 'corenlp-ts';

    const { CORENLP_URL = 'http://localhost:9000' } = process.env;

    function printDepParse(
      g: DependencyGraph,
      relation = 'root',
      depth = 0,
      visited = new Set<DependencyGraph>()
    ): void {
      let word = g.token.word;
      if (g.token.lemma && g.token.lemma !== word) {
        word += ` [${g.token.lemma}]`;
      }
      console.log(`${'  '.repeat(depth)}${relation}/${g.token.pos}: ${word} (${g.token.index})`);
      if (!visited.has(g)) {
        visited.add(g);
        for (const dep of g.dependents) {
          printDepParse(dep.dependent, dep.relation, depth + 1, visited);
        }
      }
    }

    (async function name() {
      const nlp = new CoreNLP(CORENLP_URL, { annotators: ['lemma', 'depparse'] });
      const res = await nlp.annotate('She flew to Bali or to Turkey');
      res.sentences.forEach((s) => printDepParse(s.toDependencyGraph()));
    })();
  });
});
