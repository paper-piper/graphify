import { NodeTitle } from '../../../graph/types';
import { create_node } from '../../../db/services/createNode';
import { resolveToTitle } from '../../../db/services/utils/resolveToTitle';

export async function CreateNodeService(): Promise<NodeTitle> {
    const nodeId = await create_node();
    const [nodeTitle] = await resolveToTitle(nodeId);
    return nodeTitle;
}
