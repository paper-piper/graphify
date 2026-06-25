import { HTTP_STATUS } from '../../../httpStatus';

export const QUERY_STATUS = {
    OK: 'ok',
    NODE_NOT_FOUND: 'node_not_found',
} as const;

export type QueryStatus = typeof QUERY_STATUS[keyof typeof QUERY_STATUS];

export const query_status_to_http_map = new Map<QueryStatus, number>([
    [QUERY_STATUS.OK, HTTP_STATUS.OK],
    [QUERY_STATUS.NODE_NOT_FOUND, HTTP_STATUS.NOT_FOUND],
]);

export const query_status_to_body = new Map<QueryStatus, object>([
    [QUERY_STATUS.NODE_NOT_FOUND, { error: 'Node not found' }],
]);
