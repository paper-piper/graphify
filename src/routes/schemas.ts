import { z } from "zod";

export const edge_z = z.object({
    source_node_id: z.string().min(1),
    target_node_id: z.string().min(1),
});

export const paths_query_z = z.object({
    from: z.string().min(1),
    to: z.string().min(1),
});

export const node_id_z = z.object({
    nodeId: z.string().min(1),
});

export const node_value_z = z.object({
    value: z.string().optional(),
});