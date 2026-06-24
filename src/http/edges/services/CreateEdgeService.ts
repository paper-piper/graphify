import { NodeTitle } from '../../../graph/types';
import { create_edge } from '../../../db/services/edges/createEdge';
import { titleToId } from '../../../db/services/resolvers/titleToId';

export async function CreateEdgeService(sourceNodeTitle: NodeTitle, targetNodeTitle: NodeTitle): Promise<void> {
    const [sourceNodeId, targetNodeId] = await titleToId(sourceNodeTitle, targetNodeTitle);
    await create_edge(sourceNodeId, targetNodeId);
}
