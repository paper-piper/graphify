import z from "zod";

export const edgeZ = z.object({
    source_node_title: z.number().min(1),
    target_node_title: z.number().min(1),
});

export const pathsQueryZ = z.object({
    source_node_title: z.number().min(1),
    target_node_title: z.number().min(1),
});

export const nodeTitleZ = z.object({
    node_title: z.number().min(1),
});