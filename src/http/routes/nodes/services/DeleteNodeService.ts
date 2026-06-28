import { NodeTitle } from '../../../../types';
import { deleteNode } from '../../../../db/services/nodes/deleteNode';
import { titleToId } from '../../../../db/services/resolvers/titleToId';
import { NODE_STATUS, DeleteNodeStatus } from '../status/statuses';

export async function deleteNodeService(node_title: NodeTitle): Promise<DeleteNodeStatus> {
    const [node_id] = await titleToId(node_title);
    if (node_id === null) {
        return NODE_STATUS.NOT_FOUND;
    }
    
    const found = await deleteNode(node_id);
    if (!found) {
        return NODE_STATUS.NOT_FOUND;
    }
    else{
        return NODE_STATUS.DELETED;
    }
}
