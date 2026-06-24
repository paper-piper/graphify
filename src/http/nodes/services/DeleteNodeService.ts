import { NodeTitle } from '../../../graph/types';
import { delete_node } from '../../../db/services/nodes/deleteNode';
import { titleToId } from '../../../db/services/resolvers/titleToId';

export async function DeleteNodeService(nodeTitle: NodeTitle): Promise<void> {
    const [nodeId] = await titleToId(nodeTitle);
    await delete_node(nodeId);
}
