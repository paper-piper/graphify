import { describe, it, expect, vi } from 'vitest';
import { AdjacencyList } from '../graph.types';

vi.mock('../../buildAdjacencyList', () => ({
  buildAdjacencyList: vi.fn().mockResolvedValue(new Map()),
}));

import { hasCycle } from './hasCycle';

function makeAdj(entries: [string, string[]][]): AdjacencyList {
  return new Map(entries.map(([node, neighbors]) => [node, new Set(neighbors)]));
}

describe('hasCycle', () => {
  it('returns true when the graph contains a cycle', () => {
    const adj = makeAdj([
      ['A', ['B']],
      ['B', ['C']],
      ['C', ['A']],
    ]);

    expect(hasCycle(adj)).toBe(true);
  });

  it('returns false for a directed acyclic graph', () => {
    const adj = makeAdj([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['D']],
      ['D', []],
    ]);

    expect(hasCycle(adj)).toBe(false);
  });
});
