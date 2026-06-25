# Graphify

A REST API for storing and querying an undirected graph. Nodes and edges are persisted in PostgreSQL. The API exposes graph algorithms — cycle detection, path finding, connected components, and neighbor lookup — over HTTP.

## Stack

- **Runtime**: Node.js + TypeScript
- **HTTP**: Koa + @koa/router
- **Database**: PostgreSQL via Kysely
- **Validation**: Zod

## Setup

### 1. Environment variables

Create a `.env` file at the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DATABASE=graphify
DB_USER=postgres
DB_PASSWORD=yourpassword
SERVER_HOST=localhost
SERVER_PORT=3000
```

### 2. Run migrations

```bash
sh scripts/apply_migrations.sh
```

This runs all `.sql` files in `src/db/migrations/` in order. To also seed with sample data, include `9.0.0_seed.sql` (it is run automatically as part of the sequence).

### 3. Start the server

```bash
npm run dev
```

## API

### Nodes

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/nodes` | Create a new node. Returns its auto-assigned `title` (integer). |
| `DELETE` | `/nodes/:node_title` | Delete a node by title. Cascades to connected edges. |

### Edges

Edges are undirected. The graph treats `(A→B)` and `(B→A)` as the same connection.

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/edges` | Create an edge. Body: `{ source_node_title, target_node_title }` |
| `DELETE` | `/edges/:source_node_title/:target_node_title` | Delete an edge by its two node titles. |

### Queries

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/queries/cycles` | Returns `{ cycle_found: boolean }` |
| `GET` | `/queries/paths?source_node_title=&target_node_title=` | Returns all simple paths between two nodes. |
| `GET` | `/queries/components` | Returns all connected components as arrays of node titles. |
| `GET` | `/queries/degrees/:node_title` | Returns the direct neighbors of a node. |

## Project structure

```
src/
├── db/
│   ├── migrations/       # SQL migration files (run in filename order)
│   ├── services/
│   │   ├── edges/        # createEdge, deleteEdge
│   │   ├── nodes/        # createNode, deleteNode
│   │   ├── queries/      # buildAdjacencyList
│   │   └── resolvers/    # titleToId, idToTitle
│   ├── buildDb.ts        # Kysely instance
│   └── schema.ts         # Table type definitions
├── env/
│   ├── load_env.ts       # Validates and loads .env
│   └── schema.ts         # Zod schema for env vars
├── graph/
│   ├── algorithms/       # getAllPaths, hasCycle, getDegrees, getConnectedComponents
│   └── types.ts          # AdjacencyList type
├── http/
│   ├── routes/
│   │   ├── edges/        # Route handlers + services + status maps
│   │   ├── nodes/        # Route handlers + services + status maps
│   │   ├── queries/      # Route handlers + services + status maps
│   │   ├── sharedStatus/ # HTTP status codes, shared error handler
│   │   └── validation/   # Zod schemas + validateRequest helper
│   ├── app.ts            # Koa app setup
│   └── server.ts         # Entry point
└── types.ts              # NodeId, NodeTitle, Node, Edge
```

## How nodes work

Nodes have two identifiers:

- **`id`** — a UUID generated internally, used as the primary key in the database.
- **`title`** — an auto-incrementing integer, exposed through the API as the user-facing identifier.

All API endpoints accept and return `title`. The resolvers (`titleToId`, `idToTitle`) translate between the two as needed.

## Running tests

```bash
npm test
```
