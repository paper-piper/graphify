import { NodeTitle } from '../../../types';
import { create_edge } from '../../../db/services/edges/createEdge';
import { titleToId } from '../../../db/services/resolvers/titleToId';

export async function CreateEdgeService(source_node_title: NodeTitle, target_node_title: NodeTitle): Promise<void> {
    const [source_node_id, target_node_id] = await titleToId(source_node_title, target_node_title);
    await create_edge(source_node_id, target_node_id);
}
