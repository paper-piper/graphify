import { getConnectedComponents } from '../../../graph/algorithms/getConnectedComponents';
import { AdjacencyList, NodeId, NodeTitle } from '../../../graph/types';
import { buildAdjacencyList } from '../../../graph/buildAdjacencyList';
import { resolveToTitle } from '../../../db/services/helpers/resolveToTitle';

export async function parseAndGetComponents(): Promise<NodeTitle[][]>{
    const adj: AdjacencyList = await buildAdjacencyList();
    const id_components: NodeId[][] = getConnectedComponents(adj);
    const title_components: NodeTitle[][] = []
    for (const id_component of id_components){
        const title_component = await resolveToTitle(...id_component)
        title_components.push(title_component)
    }
    return title_components
}