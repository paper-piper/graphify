import { Context } from 'koa';
import { getAllPaths } from '@/algorithms/getAllPaths';
import { AdjacencyList } from '@/algorithms/types';
import { NodeTitle } from '@/types';
import { GraphRepository } from '@/repositories/GraphRepository';
import { NodeRepository } from '@/repositories/NodeRepository';
import { NotFoundError } from '@/http/middlewares/error/http_error';
import { HTTP_STATUS } from '@/http/routes/shared/httpStatus';
import { nestedIdToTitle } from '@/http/routes/shared/utils/nestedIdToTitle';

export async function getAllPathsController(ctx: Context) {
    const { source_node_title, target_node_title } = ctx.state.validated.query;

    const adj: AdjacencyList = await GraphRepository.buildAdjacencyList();
    const [source_node_id, target_node_id] = await NodeRepository.findByTitles(source_node_title, target_node_title);
    if (source_node_id === null || target_node_id === null) {
        throw new NotFoundError("One or more nodes doesn't exist");
    }

    const id_paths = getAllPaths(adj, source_node_id, target_node_id);
    const title_paths: NodeTitle[][] = await nestedIdToTitle(id_paths)

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { paths: title_paths };
}
