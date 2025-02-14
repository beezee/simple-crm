import { UserCreateCodec, UserUpdateCodec, NoteCreateCodec } from './codecs';
import * as t from 'io-ts';

export type UserCreateData = t.TypeOf<typeof UserCreateCodec>;
export type UserUpdateData = t.TypeOf<typeof UserUpdateCodec>;
export type NoteCreateData = t.TypeOf<typeof NoteCreateCodec>;
