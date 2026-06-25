import { HTTP_STATUS } from '../../../httpStatus';

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

export type EdgeStatus = typeof EDGE_STATUS[keyof typeof EDGE_STATUS];

export const edge_status_to_http_map = new Map<EdgeStatus, number>([
    [EDGE_STATUS.CREATED, HTTP_STATUS.CREATED],
    [EDGE_STATUS.ALREADY_EXISTS, HTTP_STATUS.CONFLICT],
    [EDGE_STATUS.NODE_NOT_FOUND, HTTP_STATUS.NOT_FOUND],
    [EDGE_STATUS.DELETED, HTTP_STATUS.NO_CONTENT],
    [EDGE_STATUS.EDGE_NOT_FOUND, HTTP_STATUS.NOT_FOUND],
]);

export const edge_status_to_body = new Map<EdgeStatus, object>([
    [EDGE_STATUS.ALREADY_EXISTS, { error: 'Edge already exists' }],
    [EDGE_STATUS.NODE_NOT_FOUND, { error: 'Node not found' }],
    [EDGE_STATUS.EDGE_NOT_FOUND, { error: 'Edge not found' }],
]);
