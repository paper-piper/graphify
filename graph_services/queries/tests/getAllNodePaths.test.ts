import { describe, it, expect, vi } from 'vitest';
import { AdjacencyList, NodeId } from '../../graph.types';

vi.mock('../../buildAdjacencyList', () => ({
  buildAdjacencyList: vi.fn().mockResolvedValue(new Map()),
}));

import { getAllNodePaths } from '../getAllNodePaths';

function makeAdj(entries: [string, string[]][]): AdjacencyList {
  return new Map(entries.map(([node, neighbors]) => [node, new Set(neighbors)]));
}

describe('getAllNodePaths', () => {
  it('returns all paths when multiple routes exist between source and target', () => {
    const adj = makeAdj([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['D']],
      ['D', []],
    ]);

    const paths = getAllNodePaths(adj, 'A' as NodeId, 'D' as NodeId);

    expect(paths).toHaveLength(2);
    expect(paths).toContainEqual(['A', 'B', 'D']);
    expect(paths).toContainEqual(['A', 'C', 'D']);
  });

  it('returns empty array when no directed path exists from source to target', () => {
    const adj = makeAdj([
      ['A', ['B']],
      ['B', []],
      ['C', ['D']],
      ['D', []],
    ]);

    const paths = getAllNodePaths(adj, 'B' as NodeId, 'A' as NodeId);

    expect(paths).toHaveLength(0);
  });
});
