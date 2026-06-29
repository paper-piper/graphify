import { db } from "@/db/buildDb";
import { AdjacencyList } from "@/algorithms/types";
import { Edge, Node } from "@/types";

export const GraphRepository = {
    async buildAdjacencyList(): Promise<AdjacencyList> {
        const adj: AdjacencyList = new Map();
        const nodes = await db.selectFrom('nodes').selectAll().execute() as Node[];
        const edges = await db.selectFrom('edges').selectAll().execute() as Edge[];

        nodes.forEach(node => adj.set(node.id, new Set()));
        edges.forEach(edge => {
            adj.get(edge.source_node)?.add(edge.target_node);
            adj.get(edge.target_node)?.add(edge.source_node);
        });

        return adj;
    },
};
