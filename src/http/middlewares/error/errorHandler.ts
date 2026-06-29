import { Context, Next } from "koa";
import { HTTP_STATUS } from "../../routes/shared/httpStatus";
import { HttpError } from "./http_error";

export async function handleErrors(ctx: Context, next: Next): Promise<void>{
    try{
        await next()
    }
    catch (err){
        if (err instanceof HttpError) {
            ctx.status = err.status;
            let errorBody: unknown;
            try { errorBody = JSON.parse(err.message); } catch { errorBody = err.message; }
            ctx.body = { error: errorBody };
        } else {
            ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            ctx.body = { error: "Internal Server Error" };
            console.log(err);
        }
    }
}