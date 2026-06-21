import { describe, it, expect, vi } from 'vitest';
import { AdjacencyList } from '../graph.types';

vi.mock('../../buildAdjacencyList', () => ({
  buildAdjacencyList: vi.fn().mockResolvedValue(new Map()),
}));

import { getConnectedComponents } from './getConnectedComponents';

function makeAdj(entries: [string, string[]][]): AdjacencyList {
  return new Map(entries.map(([node, neighbors]) => [node, new Set(neighbors)]));
}

describe('getConnectedComponents', () => {
  it('returns a single component when all nodes are connected', () => {
    const adj = makeAdj([
      ['A', ['B', 'C']],
      ['B', ['A', 'C']],
      ['C', ['A', 'B']],
    ]);

    const components = getConnectedComponents(adj);

    expect(components).toHaveLength(1);
    expect(components[0]).toEqual(new Set(['A', 'B', 'C']));
  });

  it('returns two separate components for a disconnected graph', () => {
    const adj = makeAdj([
      ['A', ['B']],
      ['B', ['A']],
      ['C', ['D']],
      ['D', ['C']],
    ]);

    const components = getConnectedComponents(adj);

    expect(components).toHaveLength(2);
    expect(components).toContainEqual(new Set(['A', 'B']));
    expect(components).toContainEqual(new Set(['C', 'D']));
  });
});
