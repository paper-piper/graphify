import { getDegrees } from '../../../graph/algorithms/getDegrees';
import { AdjacencyList } from '../../../graph/types';
import { buildAdjacencyList } from '../../../db/services/utils/buildAdjacencyList';
import { NodeTitle } from '../../../graph/types';
import { resolveToId } from '../../../db/services/utils/resolveToId';
import { resolveToTitle } from '../../../db/services/utils/resolveToTitle';

export async function GetDegreesService(node_title: NodeTitle): Promise<NodeTitle[]> {
    const adj: AdjacencyList = await buildAdjacencyList();
    const [node_id] = await resolveToId(node_title)
    const id_degrees = getDegrees(adj, node_id);
    const title_degrees: NodeTitle[] = await resolveToTitle(...id_degrees)
    return title_degrees
}