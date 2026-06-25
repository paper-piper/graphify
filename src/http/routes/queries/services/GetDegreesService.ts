import { getDegrees } from '../../../../graph/algorithms/getDegrees';
import { AdjacencyList } from '../../../../graph/types';
import { buildAdjacencyList } from '../../../../db/services/queries/buildAdjacencyList';
import { NodeTitle } from '../../../../types';
import { titleToId } from '../../../../db/services/resolvers/titleToId';
import { idToTitle } from '../../../../db/services/resolvers/idToTitle';
import { QUERY_STATUS, QueryStatus } from '../status/statuses';

export async function GetDegreesService(node_title: NodeTitle): Promise<[NodeTitle[], QueryStatus]> {
    const adj: AdjacencyList = await buildAdjacencyList();
    const [node_id] = await titleToId(node_title);
    if (node_id === null) {
        return [[], QUERY_STATUS.NODE_NOT_FOUND];
    }

    const id_degrees = getDegrees(adj, node_id);
    const title_degrees: NodeTitle[] = await idToTitle(...id_degrees);
    return [title_degrees, QUERY_STATUS.OK];
}
