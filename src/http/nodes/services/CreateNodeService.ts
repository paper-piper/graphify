import { NodeTitle } from '../../../graph/types';
import { create_node } from '../../../db/services/nodes/createNode';
import { idToTitle } from '../../../db/services/resolvers/idToTitle';

export async function CreateNodeService(): Promise<NodeTitle> {
    const nodeId = await create_node();
    const [nodeTitle] = await idToTitle(nodeId);
    return nodeTitle;
}
