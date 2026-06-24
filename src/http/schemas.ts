import z from "zod";

export const edge_z = z.object({
    source_node_title: z.coerce.number().min(1),
    target_node_title: z.coerce.number().min(1),
});

export const paths_query_z = z.object({
    source_node_title: z.coerce.number().min(1),
    target_node_title: z.coerce.number().min(1),
});

export const node_title_z = z.object({
    node_title: z.coerce.number().int().min(1),
});