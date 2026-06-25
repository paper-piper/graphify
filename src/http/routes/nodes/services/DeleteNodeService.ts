import { NodeTitle } from '../../../../types';
import { delete_node } from '../../../../db/services/nodes/deleteNode';
import { titleToId } from '../../../../db/services/resolvers/titleToId';
import { NODE_STATUS, DeleteNodeStatus } from '../status/statuses';

export async function DeleteNodeService(node_title: NodeTitle): Promise<DeleteNodeStatus> {
    const [node_id] = await titleToId(node_title);
    if (node_id === null) {
        return NODE_STATUS.NOT_FOUND;
    }
    const found = await delete_node(node_id);
    return found ? NODE_STATUS.DELETED : NODE_STATUS.NOT_FOUND;
}
