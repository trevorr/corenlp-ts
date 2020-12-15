import { Dependency, DependencyKind, EnhancedDependencyRelation } from './dependency';
import { Sentence } from './sentence';
import { Token } from './token';

export interface DependencyGraph {
  token: Token;
  dependents: DependencyGraphRelation[];
}

export interface DependencyGraphRelation {
  relation: EnhancedDependencyRelation;
  dependent: DependencyGraph;
}

export function sentenceToDependencyGraph(sentence: Sentence, kind: DependencyKind): DependencyGraph {
  const prop = `${kind}Dependencies`;
  const deps: Dependency[] | undefined = (sentence as any)[prop];
  if (!deps) {
    throw new Error(`${prop} not found in sentence annotations`);
  }

  const tokenNodes = new Map<number, DependencyGraph>();
  function getTokenNode(index: number): DependencyGraph {
    let node = tokenNodes.get(index);
    if (!node) {
      const token = sentence.tokens[index - 1];
      tokenNodes.set(index, (node = { token, dependents: [] }));
    }
    return node;
  }

  let root: DependencyGraph | undefined;
  for (const dep of deps) {
    if (dep.governor === 0) {
      if (root) {
        throw new Error(`Found multiple root tokens: ${root.token.index} and ${dep.dependent}`);
      }
      root = getTokenNode(dep.dependent);
    } else {
      const node = getTokenNode(dep.governor);
      node.dependents.push({ relation: dep.dep, dependent: getTokenNode(dep.dependent) });
    }
  }
  if (!root) {
    throw new Error('No root found in dependency graph');
  }
  return root;
}
