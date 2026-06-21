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
      ['A', ['B', 'C']],
      ['B', ['A', 'C']],
      ['C', ['A', 'B']],
    ]);

    expect(hasCycle(adj)).toBe(true);
  });

  it('returns false for a tree (no cycles)', () => {
    const adj = makeAdj([
      ['A', ['B', 'C']],
      ['B', ['A', 'D']],
      ['C', ['A']],
      ['D', ['B']],
    ]);

    expect(hasCycle(adj)).toBe(false);
  });
});

// TODO: understand everything