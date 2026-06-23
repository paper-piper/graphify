import { NodeTitle } from '../../../graph/types';
import { delete_node } from '../../../db/services/deleteNode';
import { resolveToId } from '../../../db/services/utils/resolveToId';

export async function DeleteNodeService(nodeTitle: NodeTitle): Promise<void> {
    const [nodeId] = await resolveToId(nodeTitle);
    await delete_node(nodeId);
}
