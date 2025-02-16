import * as t from 'io-ts';
import { Request, Response, RequestHandler } from 'express';
import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';
import reporter from 'io-ts-reporters';

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
                error: "Invalid request body",
                details: reporter.report(t.failures(errors))
            }),
            (validBody) => handler({ ...req, body: validBody }, res)
        )
    );
};
