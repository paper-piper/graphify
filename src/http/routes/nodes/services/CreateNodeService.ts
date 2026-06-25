import { NodeTitle } from '../../../../types';
import { createNode } from '../../../../db/services/nodes/createNode';
import { idToTitle } from '../../../../db/services/resolvers/idToTitle';

export async function CreateNodeService(): Promise<NodeTitle> {
    const node_id = await createNode();
    const [node_title] = await idToTitle(node_id);
    return node_title;
}
