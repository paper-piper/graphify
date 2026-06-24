import { NodeTitle } from '../../../types';
import { delete_node } from '../../../db/services/nodes/deleteNode';
import { titleToId } from '../../../db/services/resolvers/titleToId';

export async function DeleteNodeService(node_title: NodeTitle): Promise<boolean> {
    const [node_id] = await titleToId(node_title);
    if (node_id === null) return false;
    const found: boolean = await delete_node(node_id);
    return found;
}
