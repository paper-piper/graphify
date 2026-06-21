import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('./services/createNode', () => ({
  create_node: vi.fn(),
}));
vi.mock('./services/deleteNode', () => ({
  delete_node: vi.fn(),
}));
vi.mock('./services/createEdge', () => ({
  create_edge: vi.fn(),
}));
vi.mock('./services/deleteEdge', () => ({
  delete_edge: vi.fn(),
}));
vi.mock('./graph/buildAdjacencyList', () => ({
  buildAdjacencyList: vi.fn(),
}));

import app from './app';
import { create_node } from './services/createNode';
import { delete_node } from './services/deleteNode';
import { create_edge } from './services/createEdge';
import { delete_edge } from './services/deleteEdge';
import { buildAdjacencyList } from './graph/buildAdjacencyList';
import { NoResultError } from 'kysely';

const mockCreateNode = vi.mocked(create_node);
const mockDeleteNode = vi.mocked(delete_node);
const mockCreateEdge = vi.mocked(create_edge);
const mockDeleteEdge = vi.mocked(delete_edge);
const mockBuildAdjacencyList = vi.mocked(buildAdjacencyList);

beforeEach(() => {
  vi.resetAllMocks();
});

// ─── Nodes ────────────────────────────────────────────────────────────────────

describe('POST /nodes', () => {
  it('returns 201 with the new node id', async () => {
    mockCreateNode.mockResolvedValue('node-1');

    const res = await request(app).post('/nodes').send({ value: 'Alpha' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 'node-1' });
  });

  it('returns 500 when creation fails', async () => {
    mockCreateNode.mockRejectedValue(new Error('db error'));

    const res = await request(app).post('/nodes').send({ value: 'Alpha' });

    expect(res.status).toBe(500);
  });
});

describe('DELETE /nodes/:nodeId', () => {
  it('returns 200 when the node is deleted', async () => {
    mockDeleteNode.mockResolvedValue();

    const res = await request(app).delete('/nodes/node-1');

    expect(res.status).toBe(200);
  });

  it('returns 404 when the node does not exist', async () => {
    mockDeleteNode.mockRejectedValue(new NoResultError());

    const res = await request(app).delete('/nodes/missing');

    expect(res.status).toBe(404);
  });

  it('returns 500 on unexpected errors', async () => {
    mockDeleteNode.mockRejectedValue(new Error('db error'));

    const res = await request(app).delete('/nodes/node-1');

    expect(res.status).toBe(500);
  });
});

// ─── Edges ────────────────────────────────────────────────────────────────────

describe('POST /edges', () => {
  it('returns 201 when the edge is created', async () => {
    mockCreateEdge.mockResolvedValue();

    const res = await request(app)
      .post('/edges')
      .send({ source_node_id: 'node-1', target_node_id: 'node-2' });

    expect(res.status).toBe(201);
  });

  it('returns 500 when creation fails', async () => {
    mockCreateEdge.mockRejectedValue(new Error('db error'));

    const res = await request(app)
      .post('/edges')
      .send({ source_node_id: 'node-1', target_node_id: 'node-2' });

    expect(res.status).toBe(500);
  });
});

describe('DELETE /edges/:sourceId/:targetId', () => {
  it('returns 200 when the edge is deleted', async () => {
    mockDeleteEdge.mockResolvedValue();

    const res = await request(app).delete('/edges/node-1/node-2');

    expect(res.status).toBe(200);
  });

  it('returns 404 when the edge does not exist', async () => {
    mockDeleteEdge.mockRejectedValue(new NoResultError());

    const res = await request(app).delete('/edges/node-1/missing');

    expect(res.status).toBe(404);
  });

  it('returns 500 on unexpected errors', async () => {
    mockDeleteEdge.mockRejectedValue(new Error('db error'));

    const res = await request(app).delete('/edges/node-1/node-2');

    expect(res.status).toBe(500);
  });
});

// ─── Queries ──────────────────────────────────────────────────────────────────

function makeAdj(entries: [string, string[]][]): Map<string, Set<string>> {
  return new Map(entries.map(([node, neighbors]) => [node, new Set(neighbors)]));
}

describe('GET /queries/cycles', () => {
  it('returns has_cycle true when the graph has a cycle', async () => {
    mockBuildAdjacencyList.mockResolvedValue(makeAdj([
      ['A', ['B', 'C']],
      ['B', ['A', 'C']],
      ['C', ['A', 'B']],
    ]));

    const res = await request(app).get('/queries/cycles');

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ has_cycle: true });
  });

  it('returns has_cycle false for an acyclic graph', async () => {
    mockBuildAdjacencyList.mockResolvedValue(makeAdj([
      ['A', ['B']],
      ['B', ['C']],
      ['C', []],
    ]));

    const res = await request(app).get('/queries/cycles');

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ has_cycle: false });
  });
});

describe('GET /queries/paths', () => {
  it('returns all paths between two connected nodes', async () => {
    mockBuildAdjacencyList.mockResolvedValue(makeAdj([
      ['A', ['B', 'C']],
      ['B', ['D']],
      ['C', ['D']],
      ['D', []],
    ]));

    const res = await request(app).get('/queries/paths?from=A&to=D');

    expect(res.status).toBe(200);
    expect(res.body.paths).toHaveLength(2);
  });

  it('returns 400 when from or to params are missing', async () => {
    const res = await request(app).get('/queries/paths?from=A');

    expect(res.status).toBe(400);
  });
});

describe('GET /queries/components', () => {
  it('returns each disconnected subgraph as its own component', async () => {
    mockBuildAdjacencyList.mockResolvedValue(makeAdj([
      ['A', ['B']],
      ['B', []],
      ['C', ['D']],
      ['D', []],
    ]));

    const res = await request(app).get('/queries/components');

    expect(res.status).toBe(200);
    expect(res.body.components).toHaveLength(2);
  });
});

describe('GET /queries/degrees/:nodeId', () => {
  it('returns the neighbors of the given node', async () => {
    mockBuildAdjacencyList.mockResolvedValue(makeAdj([
      ['A', ['B', 'C']],
      ['B', []],
      ['C', []],
    ]));

    const res = await request(app).get('/queries/degrees/A');

    expect(res.status).toBe(200);
    expect(res.body.node).toBe('A');
    expect(res.body.neighbors).toEqual(expect.arrayContaining(['B', 'C']));
  });
});
