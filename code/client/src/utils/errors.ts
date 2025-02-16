import { AxiosError } from 'axios';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

type ServerError = { error?: string; details?: string[] };

export const handleServerError = (error: unknown): string[] =>
    pipe(
        O.fromNullable(error),
        O.chain(err => O.fromNullable((err as AxiosError<ServerError>).response?.data)),
        O.map(data => data.details ?? (data.error ? [data.error] : [])),
        O.getOrElse(() => ["An unexpected error occurred"])
    );