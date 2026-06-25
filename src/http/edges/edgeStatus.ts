export const EDGE_STATUS = {
    CREATED: 'created',
    ALREADY_EXISTS: 'already_exists',
    NODE_NOT_FOUND: 'node_not_found',
    DELETED: 'deleted',
    EDGE_NOT_FOUND: 'edge_not_found',
} as const;

export type CreateEdgeStatus =
    | typeof EDGE_STATUS.CREATED
    | typeof EDGE_STATUS.ALREADY_EXISTS
    | typeof EDGE_STATUS.NODE_NOT_FOUND;

export type DeleteEdgeStatus =
    | typeof EDGE_STATUS.DELETED
    | typeof EDGE_STATUS.EDGE_NOT_FOUND
    | typeof EDGE_STATUS.NODE_NOT_FOUND;
