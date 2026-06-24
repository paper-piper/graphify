import { NodeTitle } from '../../../types';
import { delete_node } from '../../../db/services/nodes/deleteNode';
import { titleToId } from '../../../db/services/resolvers/titleToId';

export async function DeleteNodeService(node_title: NodeTitle): Promise<void> {
    const [node_id] = await titleToId(node_title);
    await delete_node(node_id);
}
