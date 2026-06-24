import { NodeTitle } from '../../../types';
import { create_node } from '../../../db/services/nodes/createNode';
import { idToTitle } from '../../../db/services/resolvers/idToTitle';

export async function CreateNodeService(): Promise<NodeTitle> {
    const node_id = await create_node();
    const [node_title] = await idToTitle(node_id);
    return node_title;
}
