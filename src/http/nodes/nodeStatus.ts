export const NODE_STATUS = {
    CREATED: 'created',
    DELETED: 'deleted',
    NOT_FOUND: 'not_found',
} as const;

export type DeleteNodeStatus =
    | typeof NODE_STATUS.DELETED
    | typeof NODE_STATUS.NOT_FOUND;
