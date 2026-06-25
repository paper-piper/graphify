import { getConnectedComponents } from '../../../../graph/algorithms/getConnectedComponents';
import { AdjacencyList } from '../../../../graph/types';
import { NodeId, NodeTitle } from '../../../../types';
import { buildAdjacencyList } from '../../../../db/services/queries/buildAdjacencyList';
import { idToTitle } from '../../../../db/services/resolvers/idToTitle';

export async function GetComponentsService(): Promise<NodeTitle[][]>{
    const adj: AdjacencyList = await buildAdjacencyList();
    const id_components: NodeId[][] = getConnectedComponents(adj);
    const title_components: NodeTitle[][] = [];
    for (const id_component of id_components){
        const title_component = await idToTitle(...id_component);
        title_components.push(title_component);
    }
    return title_components;
}
