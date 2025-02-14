import * as t from 'io-ts';
import { Request, Response, RequestHandler } from 'express';
import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';

// Enhanced request with typed body
export type TypedRequest<T> = Omit<Request, 'body'> & { body: T };

// Handler with typed request
export type TypedRequestHandler<T> = (req: TypedRequest<T>, res: Response) => Promise<void>;

// Enhance route handler with codec validation
export const withBody = <C extends t.Mixed>(codec: C) => (
    handler: TypedRequestHandler<t.TypeOf<C>>
): RequestHandler => async (req, res) => {
    return pipe(
        codec.decode(req.body),
        fold(
            (errors) => res.status(400).json({ 
                error: 'Invalid request body',
                details: errors.map(e => ({
                    path: e.context.map(c => c.key).join('.'),
                    message: e.message
                }))
            }),
            (validBody) => handler({ ...req, body: validBody }, res)
        )
    );
};
