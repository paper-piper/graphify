import { idToTitle } from "../../../../db/services/resolvers/idToTitle";
import { NodeId, NodeTitle } from "../../../../types";

export async function nestedIdToTitle(id_nested_list: NodeId[][]): Promise<NodeTitle[][]>{
    const title_nested_list: NodeTitle[][] = [];
    for (const id_list of id_nested_list) {
        const title_list = await idToTitle(...id_list);
        title_nested_list.push(title_list);
    }

    return title_nested_list
}