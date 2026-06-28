import { HTTP_STATUS } from '../../sharedStatus/httpStatus';

export const NODE_STATUS = {
    CREATED: 'created',
    DELETED: 'deleted',
    NOT_FOUND: 'not_found',
} as const;

export type DeleteNodeStatus =
    | typeof NODE_STATUS.DELETED
    | typeof NODE_STATUS.NOT_FOUND;

export type NodeStatus = typeof NODE_STATUS[keyof typeof NODE_STATUS];

export const node_status_to_http_map = new Map<NodeStatus, number>([
    [NODE_STATUS.CREATED, HTTP_STATUS.CREATED],
    [NODE_STATUS.DELETED, HTTP_STATUS.NO_CONTENT],
    [NODE_STATUS.NOT_FOUND, HTTP_STATUS.NOT_FOUND],
]);

export const node_status_to_body = new Map<NodeStatus, object>([
    [NODE_STATUS.CREATED, { message: 'Node created successfully' }],
    [NODE_STATUS.DELETED, { message: 'Node deleted successfully' }],
    [NODE_STATUS.NOT_FOUND, { error: 'Node does not exist' }],
]);
