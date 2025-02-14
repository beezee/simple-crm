import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';
import { ValidationError } from './error';

export const validateForm = <A, O>(
  codec: t.Type<A, O>,
  data: unknown,
  onSuccess: (validData: A) => void,
  onError: (error: ValidationError) => void
) => {
  pipe(
    codec.decode(data),
    fold(
      (errors) => onError({
        error: 'Invalid form data',
        details: errors.map(e => ({
          path: e.context.map(c => c.key).join('.'),
          message: e.message
        }))
      }),
      onSuccess
    )
  );
};
