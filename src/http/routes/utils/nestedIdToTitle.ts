import { NodeRepository } from "@/db/repositories/NodeRepository";
import { NodeId, NodeTitle } from "@/types";

export async function nestedIdToTitle(id_nested_list: NodeId[][]): Promise<NodeTitle[][]>{
    const title_nested_list: NodeTitle[][] = [];
    for (const id_list of id_nested_list) {
        const title_list = await NodeRepository.IdToTitle(...id_list);
        title_nested_list.push(title_list);
    }

    return title_nested_list
}