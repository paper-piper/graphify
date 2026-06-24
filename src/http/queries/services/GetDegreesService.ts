import { getDegrees } from '../../../graph/algorithms/getDegrees';
import { AdjacencyList } from '../../../graph/types';
import { buildAdjacencyList } from '../../../db/services/queries/buildAdjacencyList';
import { NodeTitle } from '../../../types';
import { titleToId } from '../../../db/services/resolvers/titleToId';
import { idToTitle } from '../../../db/services/resolvers/idToTitle';

export async function GetDegreesService(node_title: NodeTitle): Promise<NodeTitle[]> {
    const adj: AdjacencyList = await buildAdjacencyList();
    const [node_id] = await titleToId(node_title)
    const id_degrees = getDegrees(adj, node_id);
    const title_degrees: NodeTitle[] = await idToTitle(...id_degrees)
    return title_degrees
}