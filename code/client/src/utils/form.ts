import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';
import reporter from 'io-ts-reporters';

export const validateForm = <A, O>(
  codec: t.Type<A, O>,
  data: unknown,
  onSuccess: (validData: A) => void,
  onError: (errors: string[]) => void
) => {
  pipe(
    codec.decode(data),
    fold(
      (errors) => onError(reporter.report(t.failures(errors))),
      onSuccess
    )
  );
};
