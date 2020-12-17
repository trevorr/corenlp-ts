# corenlp-ts: A Minimalist CoreNLP Client for Typescript

[![npm](https://img.shields.io/npm/v/corenlp-ts)](https://www.npmjs.com/package/corenlp-ts)
[![CircleCI](https://img.shields.io/circleci/build/github/trevorr/corenlp-ts)](https://circleci.com/gh/trevorr/corenlp-ts)

[CoreNLP](https://stanfordnlp.github.io/CoreNLP) may be "your one stop shop for
natural language processing in Java", but you can easily use it from Javascript
and Typescript by running it in [server mode](https://stanfordnlp.github.io/CoreNLP/corenlp-server.html).
This library provides a thin, type-safe wrapper around [cross-fetch](https://github.com/lquixada/cross-fetch)
for accessing the CoreNLP HTTP API from Node.js or a browser.

## Installation

```sh
npm install corenlp-ts
```

## Usage

### Example Usage

```ts
import { CoreNLP, DependencyGraph } from 'corenlp-ts';

const { CORENLP_URL = 'http://localhost:9000' } = process.env;

function printDepParse(g: DependencyGraph, relation = 'root', depth = 0, visited = new Set<DependencyGraph>()): void {
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
```

### Example Output

```plain
root/VBD: flew [fly] (2)
  nsubj/PRP: She [she] (1)
  nsubj/PRP: She [she] (1)
  conj:or/VBD: flew [fly] (2)
  obl:to/NNP: Bali (4)
    case/IN: to (3)
  cc/CC: or (5)
  obl:to/NNP: Turkey (7)
    case/IN: to (6)
```

## Running CoreNLP

The easiest way to run the [CoreNLP server](https://stanfordnlp.github.io/CoreNLP/corenlp-server.html) is using Docker.
I recommend [my own minimalist image based on OpenJDK 8 and Alpine Linux](https://github.com/trevorr/corenlp-jre8-alpine).

```sh
docker run -m 4g --publish 9000:9000 --detach --name corenlp scurrilous/corenlp-jre8-alpine:latest
```

## License

`corenlp-ts` is available under the [ISC license](LICENSE).
