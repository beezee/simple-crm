import * as t from 'io-ts';
import { NumberFromString } from 'io-ts-types';

export const UserCreateCodec = t.type({
    firstName: t.string,
    lastName: t.string,
    age: t.union([NumberFromString, t.number]),
    phoneNumber: t.string
});

export const UserUpdateCodec = t.partial({
    firstName: t.string,
    lastName: t.string,
    age: t.union([NumberFromString, t.number]),
    phoneNumber: t.string
});

export const NoteCreateCodec = t.type({
    content: t.string
});
