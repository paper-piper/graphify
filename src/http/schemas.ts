import z from "zod";

export const edgeZ = z.object({
    sourceNodeTitle: z.string().min(1),
    targetNodeTitle: z.string().min(1),
});

export const pathsQueryZ = z.object({
    from: z.string().min(1),
    to: z.string().min(1),
});

export const nodeTitleZ = z.object({
    nodeTitle: z.string().min(1),
});