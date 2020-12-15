# corenlp-ts: A Minimalist CoreNLP Client for Typescript

[![npm](https://img.shields.io/npm/v/corenlp-ts)](https://www.npmjs.com/package/corenlp-ts)
[![CircleCI](https://img.shields.io/circleci/build/github/trevorr/corenlp-ts)](https://circleci.com/gh/trevorr/corenlp-ts)

## Installation

```sh
npm install corenlp-ts
```

## Usage

### Typical Usage

```ts
import corenlp-ts from 'corenlp-ts';

function printDepParse(g: DependencyGraph, relation = 'root', depth = 0, visited = new Set<DependencyGraph>()): void {
  console.log(`${'  '.repeat(depth)}${relation}: ${g.token.word} (${g.token.index})`);
  if (!visited.has(g)) {
    visited.add(g);
    for (const dep of g.dependents) {
      printDepParse(dep.dependent, dep.relation, depth + 1, visited);
    }
  }
}

const nlp = new CoreNLP('http://localhost:9000');
const res = await nlp.annotate('She flew to Bali or to Turkey', { annotators: ['depparse'] });
printDepParse(res.sentences[0].toDependencyGraph());
```

```plain
root: flew (2)
  nsubj: She (1)
  nsubj: She (1)
  conj:or: flew (2)
  obl:to: Bali (4)
    case: to (3)
  cc: or (5)
  obl:to: Turkey (7)
    case: to (6)
```

## License

`corenlp-ts` is available under the [ISC license](LICENSE).
